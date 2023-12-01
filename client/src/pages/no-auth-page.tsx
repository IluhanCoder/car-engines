import { Link } from "react-router-dom"

const NoAuthPage = () => {
    return <div className="h-screen flex justify-center">
        <div className="flex flex-col">
            <div>Для того, щоб користуватися системою, необхідно <Link to="/login">авторизуватися</Link> або <Link to="/register">зареєструватися</Link></div>
        </div>
    </div>
}

export default NoAuthPage;