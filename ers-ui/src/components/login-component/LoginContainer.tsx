
import { connect } from "react-redux";
import { LoginComponent } from "./LoginComponent";
import { IState } from "../../reducer";
import {msLogin} from "../../acction-mappers/login-action-mappers";

const mapStateToProps = (state: IState) => {
    //this function returns, what we want from state as an pbject
    return {
        user: state.login.user
    }
}

const mapDispatchToProps = {
    msLogin
}

//export the new container component that wraps up our original component
//if we dont use the container component, we don't get any redux
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)