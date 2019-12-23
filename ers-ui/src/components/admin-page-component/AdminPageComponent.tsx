import React, { SyntheticEvent } from "react"

import { Table, Form, FormGroup, Label, Input, Button } from "reactstrap"
import { User } from "../../model/user"
import { msUserClient } from "../../remote/esr-user-cleint/ers-user-client"
import { Reimbursement } from "../../model/reimbursement"
import AdminNavBarComponent from "../navbar-component/AdminNavbarComponent"
import { ReimbursementDisplayRowComponent } from "../user-page-component/reimbursement-display-row/ReimbursementRowComponent"
import { Role } from "../../model/role"
import { updateUser } from "../../remote/esr-user-cleint/ers-user"


interface IAdminPageComponentProps {
    user: User
}

interface IAdminPageState {
    allReimbursements: Reimbursement[],
    userid: number
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string,
    role: any,
}

export class AdminPageComponent extends React.Component<IAdminPageComponentProps, IAdminPageState> {
    constructor(props: any) {
        super(props)
        this.state = {
            allReimbursements: [],
            userid: 0,
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            role: new Role(0,'')
        }
    }

////////////////////////////////
updateUserId = (e:any)=>{
    this.setState({
        ...this.state,
        userid: e.target.value
    })
}

/////////////////////////////////////////////
updateusername = (e:any)=>{
    this.setState({
        ...this.state,
        username: e.target.value
    })
}

/////////////////////////////////////////////
updatepassword = (e:any)=>{
    this.setState({
        ...this.state,
        password: e.target.value
    })
}

/////////////////////////////////////////////
updatefirstname = (e:any)=>{
    this.setState({
        ...this.state,
        firstname: e.target.value
    })
}

/////////////////////////////////////////////
updatelastname = (e:any)=>{
    this.setState({
        ...this.state,
        lastname: e.target.value
    })
}

/////////////////////////////////////////////
updateemail = (e:any)=>{
    this.setState({
        ...this.state,
        email: e.target.value
    })
}

/////////////////////////////////////////////
updaterole = (e:any)=>{
    this.setState({
        ...this.state,
        role: new Role(e.target.value, '')
    })
}

/////////////////////////////////////////////

submitId = async (e:SyntheticEvent) => {
    e.preventDefault()
    try {
        console.log(this.state.userid);
        
        await updateUser(this.state.userid, this.state.username,this.state.password,this.state.firstname,this.state.lastname,this.state.email,this.state.role)
       
    } catch (e) {
        console.log(e);
    }
}
////////////////////////////////////////////
    getAllReimbursements = async (userId: number) => {
        try {
            let response = await msUserClient.get('/reimbursements/author/' + userId)
            if (response.status === 200) {
                return {
                    status: response.status,
                    body: response.data
                }
            } else {
                return {
                    status: response.status,
                    body: undefined
                }
            }
        } catch (e) {
            console.log(e);
            throw new Error('Something Went Wrong')
        }
    }

    async componentDidMount() {
        try {
            let r = await this.getAllReimbursements(this.props.user.userId)
            if (r.status === 200) {
                this.setState({
                    ...this.state,
                    allReimbursements: r.body
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let rows = this.state.allReimbursements.map((e) => {
            return <ReimbursementDisplayRowComponent reimbursement={e} key={'reimbursement ' + e.reimbursementId} />
        })
        return (
            <div>
                <nav>
                    <AdminNavBarComponent />
                </nav>
                <Table bordered color='danger'>
                    <tr>
                        <td>UserId</td>
                        <td>{this.props.user.userId}</td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td>{this.props.user.username}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{this.props.user.firstName} {this.props.user.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{this.props.user.email}</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>{this.props.user.role.role}</td>
                    </tr>
                    <p>This is your reimbursement</p>
                </Table >
                <Table bordered color='danger'>
                    <thead>
                        <tr>
                            <td>reimbursementId</td>
                            <td>author</td>
                            <td>amount</td>
                            <td>dateSubmitted</td>
                            <td>dateResolved</td>
                            <td>description</td>
                            <td>status</td>
                            <td>type</td>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
                <br></br>
                <Form onSubmit={this.submitId}>

                    <FormGroup>
                        <Label for="exampleSelect">User ID</Label>
                        <Input onChange={this.updateUserId} type="select" name="select" id="exampleSelect" >
                            <option value="1" >1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>

                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input onChange={this.updateusername} type="text" name="Username" id="exampleUsername" placeholder="enter a new username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">password</Label>
                        <Input onChange={this.updatepassword} type="text" name="password" id="examplepassword" placeholder="enter a new password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">first Name</Label>
                        <Input onChange={this.updatefirstname} type="text" name="first Name" id="examplefirst Name" placeholder="enter a new first name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Last Name</Label>
                        <Input onChange={this.updatelastname} type="text" name="Last Name" id="exampleLast Name" placeholder="enter a new last name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input onChange={this.updateemail} type="text" name="Email" id="exampleEmail" placeholder="enter a new email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Role</Label>
                        <Input onChange={this.updaterole} type="select" name="select" id="exampleSelect">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Input>
                    </FormGroup>
                    <Button>Update</Button>
                </Form>

            </div>
        )
    }
}