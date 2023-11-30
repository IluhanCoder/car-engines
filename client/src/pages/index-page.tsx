import userService from "../services/user-service"
import userStore from "../stores/userStore"
import { observer } from "mobx-react-lite"
import buttonStyle from "../styles/button-style"

const IndexPage = () => {
    return <div>
        <div>
            { userStore.user === undefined && <div>loading</div> || <>
                {userStore.user && <div>welcome, {userStore.user.name} <button type="button" onClick={() => userService.logout()}>logout</button></div> || <div>login, bitch</div>}</>
            }
        </div>
    </div>
}

export default observer(IndexPage);