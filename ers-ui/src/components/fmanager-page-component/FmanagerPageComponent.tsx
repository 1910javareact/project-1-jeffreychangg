import React, { SyntheticEvent } from "react"

import { Table, FormGroup, Label, Input, Button } from "reactstrap"
import { User } from "../../model/user"

import { Reimbursement } from "../../model/reimbursement"

import {getAllReimbursements, getReimbursementsByStatusId, getUserById} from "../../remote/esr-user-cleint/ers-user"

import { ReimbursementDisplayRowComponent } from "../user-page-component/reimbursement-display-row/ReimbursementRowComponent"
import FmanagerNavBarComponent from "../navbar-component/FmanagerNavbarComponent"
import { UserDisplayRowComponent } from "./user-display-row/UserRowComponent"
import { getAllUsers } from "../../remote/esr-user-cleint/ers-user"
import { Role } from "../../model/role"


interface IFmanagerPageComponentProps {
    user: User,
    reimbursement: Reimbursement
}

interface IFmanagerPageState{
    allReimbursements: Reimbursement[],
    allNewReimbursements: Reimbursement[],
    allUsers:User[],
    allNewUser:User,
    statusId: number,
    userId: number
}



export class FmanagerPageComponent extends React.Component<IFmanagerPageComponentProps, IFmanagerPageState> {
    constructor(props: any) {
        super(props)
        this.state = {
            allReimbursements: [],
            allNewReimbursements: [],
            allUsers: [],
            allNewUser: new User(0,'','','','','',new Role(0,'')),
            statusId: 0,
            userId: 0
        }
    }
////////////////////////////////////////////////////////// find reimbursement by status
    updateStatusId = (e:any)=>{
        this.setState({
            ...this.state,
            statusId: e.target.value
        })
    }

    submitSearch = async (e:SyntheticEvent) => {
        e.preventDefault()
        try {
            let r = await getReimbursementsByStatusId(this.state.statusId)
            if (r.status === 200){
                this.setState({
                    ...this.state,
                    allNewReimbursements: r.body
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
///////////////////////////////////////////////////////////////////// get user by id
    updateUserId = (e:any)=>{
        this.setState({
            ...this.state,
            userId: e.target.value
        })
    }

    submitId = async (e:SyntheticEvent) => {
        e.preventDefault()
        try {
            let r = await getUserById(this.state.userId)
            if (r.status === 200){
                this.setState({
                    ...this.state,
                    allNewUser: r.body
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

/////////////////////////////////////////////////////////////////////////////////
    async componentDidMount() {
        try {
            let r = await getAllReimbursements(this.props.user.userId)
            if (r.status === 200){
                this.setState({
                    ...this.state,
                    allReimbursements: r.body
                })
            }
        } catch (e) {
            console.log(e);
        }
        try {
            let u = await getAllUsers()
            if (u.status === 200){
                this.setState({
                    ...this.state,
                    allUsers: u.body
                })
            }
        } catch (e) {
            console.log(e);
        }
        try {
            let u = await getReimbursementsByStatusId(this.props.reimbursement.status)
            if (u.status === 200){
                this.setState({
                    ...this.state,
                    allUsers: u.body
                })
            }
        } catch (e) {
            console.log(e);
        }
        try {
            let u = await getUserById(this.props.user.userId)
            console.log(u.body);
            
            if (u.status === 200){
                this.setState({
                    ...this.state,
                    allNewUser: u.body
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
        let frows = this.state.allUsers.map((e) => {
            return <UserDisplayRowComponent user={e} key={'user'+e.userId} />
        })
        let rsrows = this.state.allNewReimbursements.map((e) => {
            return <ReimbursementDisplayRowComponent reimbursement={e} key={'reimbursement ' + e.reimbursementId} />
        })
        return (
            <div>
                
                    <FmanagerNavBarComponent />
                
                <Table bordered color='danger'>
                    <thead>
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
                    </thead>
                </Table>
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
                    <Table bordered color='danger'>
                        <thead>
                            <tr>
                                <td>UserId</td>
                                <td>Username</td>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Email</td>
                                <td>Role</td>
                            </tr>
                        </thead>
                        <tbody>
                            {frows}
                        </tbody>
                    </Table>
                    <br></br>
                    <form onSubmit={this.submitSearch}>
                    <FormGroup>
                        <Label for="status id">Find Reimbursement by Status ID</Label>
                        <Input onChange={this.updateStatusId} type="text" name="username" id="exampleId" placeholder="Enter a status id" />
                    </FormGroup>
                    <Button color='blue'>Search</Button>
                    </form>
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
                            {rsrows}
                        </tbody>
                    </Table>
                    <br></br>

                    <form onSubmit={this.submitId}>
                    <FormGroup>
                        <Label for="status id">Find User by ID</Label>
                        <Input onChange={this.updateUserId} type="text" name="username" id="exampleId" placeholder="Enter a user id" />
                    </FormGroup>
                    <Button color='blue'>Search</Button>
                    </form>
                    <Table bordered color='danger'>
                    <thead>
                    <tr>
                        <td>UserId</td>
                        <td>{this.state.allNewUser.userId}</td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td>{this.state.allNewUser.username}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{this.state.allNewUser.firstName} {this.state.allNewUser.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{this.state.allNewUser.email}</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>{this.state.allNewUser.role.role}</td>
                    </tr>
                    </thead>
                </Table>
                
            </div>
        )
    }
}