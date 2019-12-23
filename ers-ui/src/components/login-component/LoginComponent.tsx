import React from 'react'
import {SyntheticEvent} from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {User} from '../../model/user'
import { Link } from 'react-router-dom'


interface ILoginComponentProps{
    user: User
    msLogin:(u:string, p:string)=>void
}

export class LoginComponent extends React.Component<ILoginComponentProps, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            username:'',
            password:''
        }
    }

    updateUsername = (e:any)=>{
        this.setState({
            ...this.state,
            username: e.target.value
        })
    }

    updatePassword = (e:any)=>{
        this.setState({
            ...this.state,
            password: e.target.value
        })
    }

    submitlogin = async (e:SyntheticEvent) => {
        e.preventDefault()        
        this.props.msLogin(this.state.username, this.state.password)
    }
    render(){
        return(
            <div>
                <Form onSubmit={this.submitlogin}>
                    <FormGroup>
                        <Label for="exampleUsername">Username</Label>
                        <Input value={this.state.username} onChange={this.updateUsername} type="text" name="username" id="exampleId" placeholder="Your username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input value={this.state.password} onChange={this.updatePassword} type="password" name="password" id="examplePassword" placeholder="Your password"/>
                    </FormGroup>
                    <Button color='blue'>Log in</Button>
                </Form>
                <p>Hello! {this.props.user.firstName} {this.props.user.lastName}</p>
                <Link to="/user">User </Link>
                <Link to="/admin">Admin </Link>
                <Link to="/fmanager">Fmanager </Link>
                
            </div>
        )
    }
}