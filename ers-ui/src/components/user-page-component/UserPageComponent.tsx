import React, { SyntheticEvent } from "react"

import { Table, Form, FormGroup, Label, Input, Button } from "reactstrap"
import { User } from "../../model/user"
import { msUserClient } from "../../remote/esr-user-cleint/ers-user-client"
import { Reimbursement } from "../../model/reimbursement"
import { ReimbursementDisplayRowComponent } from "./reimbursement-display-row/ReimbursementRowComponent"
import NavBarComponent from "../navbar-component/NavbarComponent"
import { submitReimbursement } from "../../remote/esr-user-cleint/ers-user"

interface IUserPageComponentProps {
    user: User
}

interface IUserPageState{
    allReimbursements: Reimbursement[],
    amount: number,
    dateSubmitted: number,
    description: string,
    status: number
    type: number
}

export class UserPageComponent extends React.Component<IUserPageComponentProps, IUserPageState> {
    constructor(props: any) {
        super(props)
        this.state = {
            allReimbursements: [],
            amount: 0,
            dateSubmitted: 0,
            description: '',
            status: 1,
            type: 0
        }
    }
//////////////////////////////////////////////////
    updateAmount = (e: any) => {
        this.setState({
            ...this.state,
            amount: e.target.value
        })
    }
//////////////////////////////////////////////////
updateDateSubmitted= (e: any) => {
    this.setState({
        ...this.state,
        amount: e.target.value
    })
}
//////////////////////////////////////////////////
    updateDescription = (e: any) => {
        this.setState({
            ...this.state,
            description: e.target.value
        })
    }
//////////////////////////////////////////////////
    updateType = (e: any) => {
        this.setState({
            ...this.state,
            type: e.target.value
        })
    }
////////////////////////////////////////////////////

submitReimbursement = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
        let s = await submitReimbursement (this.state.amount, this.state.dateSubmitted, this.state.description,this.state.type)
        if (s.status === 201) {
            this.setState({
                ...this.state,
              
            })
        } else {
            this.setState({
                ...this.state,
            
            })
        }
    } catch (e) {
        console.log(e);
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

    <p>This is your user info</p>
                <Table bordered color='blue'>
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
                <p>These are your submitted reimbursements</p>
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

                    <Form onSubmit={this.submitReimbursement}>



                        <FormGroup>
                            <Label for="Amount">Amount</Label>
                            <Input onChange={this.updateAmount} type="text" name="Amount" id="exampleAmount" placeholder="enter an amount" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Date">DateSubmitted</Label>
                            <Input onChange={this.updateDateSubmitted} type="text" name="DateSubmitted" id="exampleAmount" placeholder="enter an date" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Description">Description</Label>
                            <Input onChange={this.updateDescription} type="text" name="Description" id="exampleDescription" placeholder="enter a Description" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Type</Label>
                            <Input onChange={this.updateType} type="select" name="select" id="exampleSelect" >
                                <option value="1" >Lodging</option>
                                <option value="2">Travel</option>
                                <option value="3">Food </option>
                                <option value="4">Other</option>

                            </Input>
                        </FormGroup>

                        <Button>Submit</Button>
                    </Form>
            </div>
        )
    }
}