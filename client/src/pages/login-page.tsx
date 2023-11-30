import { useState } from "react";
import userService from "../services/user-service";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const submitHandler = async () => {
        try {
            if(email.length == 0 || password.length == 0) throw new Error("всі поля мають бути заповнені");
            const response = await userService.login({email, password});
            if(response.status == "success") navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    return <div>
        <form>
            <div>
                <label>Електрона пошта</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Пароль</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
                <button type="button" onClick={submitHandler}>увійти</button>
            </div>
        </form>
    </div>
};

export default LoginPage;