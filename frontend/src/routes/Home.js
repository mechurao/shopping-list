import {useNavigate} from "react-router-dom";
import styles from "../styles/login.module.css";
import Strings from "../values/Strings";
import SubmitButton from "../components/UI/SubmitButton";
import PageControl from "../utils/PageControl";

function Home() {
    const navigate = useNavigate();

    PageControl.setTitle(Strings.home);

    const loginAction = (e) => {
        e.preventDefault();
        navigate("/login");

    }

    const registerAction = (e) => {
        e.preventDefault();
        navigate("/register");
    }


    return (
        <>
            <div className={styles.wrapper}>
                <h2>{Strings.home}</h2>
                <SubmitButton onClick={loginAction} label={Strings.login} />
                <SubmitButton onClick={registerAction} label={Strings.register} />

            </div>
        </>
    );
}
export default Home;
