import { useState } from "react";
import { largeLabelStyle } from "../styles/label-style";
import inputStyle from "../styles/input-style";
import buttonStyle from "../styles/button-style";
import linkStyle from "../styles/link-syle";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/user-service";
import { LoginCredentials } from "../types/user-types";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const submitHandler = async () => {
        try {
            if(email.length == 0 || password.length == 0) return toast.error("усі поля мають бути заповнені");
            const credentials: LoginCredentials = {email, password}
            await userService.register(credentials);
            navigate("/projects");
        } catch (error: any) {
            const message = error?.response?.data.message;
            if(message) toast.error(message);
            else throw error;
        }
    }

    return <div className="flex justify-center h-screen">
            <div className="flex flex-col pt-52">
            <form className="rounded border shadow-lg p-4 flex flex-col gap-4">
                <div className={"text-center " + largeLabelStyle}>створення облікового запису</div>
                <div className="flex justify-between">
                    <div>
                        <label>Електрона пошта</label>
                    </div>
                    <div>
                        <input className={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <label>Пароль</label>
                    </div>
                    <div>
                        <input className={inputStyle}  type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className={buttonStyle} type="button" onClick={submitHandler}>створити</button>
                </div>
            </form>
            <div className="flex justify-center mt-4">
                <Link to="/login" className={linkStyle}>увійти з існуючого облівого запису</Link>
            </div>
            </div>      
        </div>
}

export default RegisterPage;