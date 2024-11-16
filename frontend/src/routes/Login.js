import {useCallback, useEffect,useState} from "react";
import styles from "../styles/login.module.css";
import {useLocation, useNavigate} from "react-router-dom";

import Strings from "../values/Strings";
import APIService from "../helpers/APIService";
import LoadingWheel from "../components/LoadingWheel";
import TextField from "../components/TextField";
import PageControl from "../utils/PageControl";
import SubmitButton from "../components/UI/SubmitButton";
import {StatusCodes} from "http-status-codes";
const emailValidator = require("react-email-validator");

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const location = useLocation();

    PageControl.setTitle(Strings.login);

    const navigate = useNavigate();

    const inputValid = useCallback(() => {
        if (email.trim() === "" || password.trim() === "") {
            return false;
        }
        return emailValidator.validate(email);
    }, [email, password]);

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

    useEffect(() => {
        void sessionCheck();

    }, [sessionCheck]);

    useEffect(() => {
        setSubmitDisabled((!inputValid()));
    }, [inputValid]);


    const submitAction = async (e) => {
        e.preventDefault();
        setLoading(true);

        let user = {
            email: email,
            password: password,
        }

        let res = await APIService.login(user);
        setLoading(false);
        const status = res.status;

        if(status !== StatusCodes.OK){
            alert(`Login failed : ${status}`);
            return;
        }
        navigate("/overview", {replace: true});
    }
    return (
        <>
            <LoadingWheel active={loading}/>
            <div className={styles.wrapper}>
                <h2>{Strings.login}</h2>
                <TextField inputType={'email'} value={email} onChange={setEmail} placeholder={Strings.email}/><br/>
                <TextField inputType={'password'} value={password} onChange={setPassword} placeholder={Strings.password}/><br/>
                <SubmitButton onClick={submitAction} disabled={submitDisabled}/>
            </div>
        </>
    );
}

export default Login;
