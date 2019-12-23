import { IState } from "../../reducer"
import { connect } from "react-redux"
import { FmanagerPageComponent } from "./FmanagerPageComponent"



const mapStateToProps = (state: IState) => {
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps)(FmanagerPageComponent)