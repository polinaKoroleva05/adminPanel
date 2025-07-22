import { getUserQueryMiddleware } from '@/app/taskStore';
import {Button, Table} from '@mantine/core';
import type {UserInterface} from '@shared/model/types';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router';

export default function UsersTable({users}: {users: UserInterface[]}) {
    const navigate = useNavigate()
    const {deleteUserMutation} = getUserQueryMiddleware();
    console.log(users);
    function onEdit(id: string) {
        navigate(`/user/edit/${id}/mantine`)
    }
    function onDelete(id: string) {
        deleteUserMutation(id)
    }
    const rows = users.map((user) => (
        <Table.Tr key={user.id}>
            <Table.Td>{user.id}</Table.Td>
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>{user.surName}</Table.Td>
            <Table.Td>{user.fullName}</Table.Td>
            <Table.Td>
                {user.birthDate ? user.birthDate : 'Not specified'}
            </Table.Td>
            <Table.Td>
                {user.telephone ? user.telephone : 'Not specified'}
            </Table.Td>
            <Table.Td>
                {user.employment ? user.employment : 'Not specified'}
            </Table.Td>
            <Table.Td>
                {user.userAgreement
                    ? 'Yes'
                    : user.userAgreement != undefined
                      ? 'No'
                      : 'Not specified'}
            </Table.Td>
            <Table.Td>
                <Button onClick={()=>onEdit(user.id)}>ed</Button>
            </Table.Td>
            <Table.Td>
                <Button onClick={()=>onDelete(user.id)}>del</Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>SurName</Table.Th>
                    <Table.Th>FullName</Table.Th>
                    <Table.Th>Birth Date</Table.Th>
                    <Table.Th>Telephone</Table.Th>
                    <Table.Th>Employment</Table.Th>
                    <Table.Th>UserAgreement</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}
