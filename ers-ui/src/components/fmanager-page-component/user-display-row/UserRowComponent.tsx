import React from 'react'

import { User } from '../../../model/user'

interface IReimbursementDisplayRowProps{
    user: User
}

export const UserDisplayRowComponent: React.FC<IReimbursementDisplayRowProps> = (props) => {
    return (
        <tr>
            <td>{props.user.userId}</td>
            <td>{props.user.username}</td>
            <td>{props.user.firstName}</td>
            <td>{props.user.lastName}</td>
            <td>{props.user.email}</td>
            <td>{props.user.role.role}</td>
        </tr>
    )
}