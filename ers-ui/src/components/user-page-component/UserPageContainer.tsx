import { IState } from "../../reducer"
import { connect } from "react-redux"
import { UserPageComponent } from "./UserPageComponent"

const mapStateToProps = (state: IState) => {
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps)(UserPageComponent)