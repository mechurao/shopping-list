import {useCallback, useEffect, useState} from "react";

import Strings from "../values/Strings";
import {useNavigate} from "react-router-dom";
import APIService from "../helpers/APIService";
import LoadingWheel from "../components/LoadingWheel";
import styles from "../styles/login.module.css";
import TextField from "../components/TextField";
import PageControl from "../utils/PageControl";
import SubmitButton from "../components/UI/SubmitButton";
import {res} from "react-email-validator";
import {StatusCodes} from "http-status-codes";
const emailValidator = require("react-email-validator");



function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    PageControl.setTitle(Strings.register);

    const navigate = useNavigate();

    const inputValid = useCallback(() => {
        if (username.trim() === ""||email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "" || password !== confirmPassword) {
            return false;
        }
        return emailValidator.validate(email);
    }, [username,email, password, confirmPassword]);

    const sessionCheck = useCallback(async () => {
        let res = await APIService.checkSession();
        if (res === true) {
            // TODO redirect to overview

            /*       const queryParams = new URLSearchParams(location.search);
      *      const redirectUrl = queryParams.get('redirect_url');

                if (redirectUrl) {
                    navigate(redirectUrl, { replace: true });
                } else {
                    navigate("/dashboard", { replace: true });
                }*/
        }
    }, [navigate]);



    const submitAction = async (e) => {
        e.preventDefault();
        let submit = await APIService.register({
           username: username,
           email: email,
           password: password,
        });

        const status = submit.status;
        if(status !== StatusCodes.OK){
            alert(`Register failed : ${status}`);
            return;
        }
        alert(status);

        navigate('/overview', {replace: true})
    }

    useEffect(() => {
        setSubmitDisabled((!inputValid()));
    }, [inputValid]);


    return (
        <>
            <LoadingWheel active={loading}/>
            <div className={styles.wrapper}>
                <div id={styles.form_wrapper}>
                    <h2>{Strings.register}</h2>
                    <TextField inputType={'text'} value={username} onChange={setUsername}
                               placeholder={Strings.username}/><br/>
                    <TextField inputType={'email'} value={email} onChange={setEmail} placeholder={Strings.email}/><br/>
                    <TextField inputType={'password'} value={password} onChange={setPassword}
                               placeholder={Strings.password}/><br/>
                    <TextField inputType={'password'} value={confirmPassword} onChange={setConfirmPassword}
                               placeholder={Strings.password_confirmation}/><br/>
                    <SubmitButton onClick={submitAction} disabled={submitDisabled}/>
                </div>


            </div>
        </>
    );


}

export default Register;
