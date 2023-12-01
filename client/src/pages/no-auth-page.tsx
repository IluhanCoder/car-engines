import { Link } from "react-router-dom"
import linkStyle from "../styles/link-syle";

const NoAuthPage = () => {
    return <div className="h-screen flex justify-center">
        <div className="flex flex-col pt-56">
            <div>Для того, щоб користуватися системою, необхідно <Link to="/login" className={linkStyle}>авторизуватися</Link> або <Link to="/register" className={linkStyle}>зареєструватися</Link></div>
        </div>
    </div>
}

export default NoAuthPage;