import userService from "../services/user-service"
import userStore from "../stores/userStore"
import { observer } from "mobx-react-lite"

const IndexPage = () => {
    return <div>
        { userStore.user === undefined && <div>loading</div> || <>
            {userStore.user && <div>welcome, {userStore.user.name} <button type="button" onClick={() => userService.logout()}>logout</button></div> || <div>login, bitch</div>}</>
        }
    </div>
}

export default observer(IndexPage);