import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import styles from "../styles/base.module.css";
import APIService from "../helpers/APIService";
import PageControl from "../utils/PageControl";

function Base({content, title, navbar}) {
    const navigate = useNavigate();

    const [sessionValid, setSessionValid] = useState(false);
    const location = useLocation();

    const sessionCheck = useCallback( async () => {
        let res = await APIService.checkSession();

        if(res === false){
            setSessionValid(false);
            navigate("/", {replace: true});
        }else{
            setSessionValid(true);
        }
    }, [navigate, location]);

    useEffect(() => {
        void sessionCheck();
        PageControl.scrollTop();
    }, [sessionCheck]);

    useEffect(() => {
        if(title){
            PageControl.setTitle(title);
        }
    }, [title]);

    return (
        sessionValid ?
            <div id={styles.baseContent}>
                <div id={styles.baseTitle}>
                    {title ? <h1>{title}</h1> : null}
                    {navbar ? navbar : null}
                </div>
                <div id={styles.contentWrapper}>
                    {content}
                </div>
            </div>
            : null
    );
}
export default Base;