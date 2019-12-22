import React from "react"
import { NavBarComponent } from "../navbar-component/NavbarComponent"
import { Table } from "reactstrap"
import { User } from "../../model/user"
import { msUserClient } from "../../remote/esr-user-cleint/ers-user-client"
import { Reimbursement } from "../../model/reimbursement"
import { ReimbursementDisplayRowComponent } from "./reimbursement-display-row/ReimbursementRowComponent"

interface IUserPageComponentProps {
    user: User
}

interface IUserPageState{
    allReimbursements: Reimbursement[]
}

export class UserPageComponent extends React.Component<IUserPageComponentProps, IUserPageState> {
    constructor(props: any) {
        super(props)
        this.state = {
            allReimbursements: []
        }
    }

    getAllReimbursements = async (userId: number) => {
        try {
            let response = await msUserClient.get('/reimbursements/author/' + userId)
            if(response.status === 200){
                return{
                    status:response.status,
                    body:response.data
                }
            }else{
                return {
                    status:response.status,
                    body:undefined
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
            if (r.status === 200){
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
                    <NavBarComponent />
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
            </div>
        )
    }
}