import {Table} from '@mantine/core';
import type {UserInterface} from '@shared/model/types';

export default function UsersTable() {
    const elements: UserInterface[] = [
        {
            id: 1,
            name: 'string',
            password: 'string',
            fullName: 'string',
            email: 'string',
            birthDate: 'string',
            telephone: 'string',
            employment: 'string',
            userAgreement: true
        },
                {
            id: 2,
            name: 'name',
            password: 'password',
            fullName: 'fullName',
            email: 'email',
            birthDate: 'birthDate',
            telephone: 'telephone',
            employment: 'employment',
            userAgreement: false
        },
                {
            id: 3,
            name: 'string',
            password: 'string',
            fullName: 'string',
            email: 'string',
            birthDate: 'string',
            telephone: 'string',
            employment: 'string',
            userAgreement: true
        }
    ];
    const rows = elements.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.fullName}</Table.Td>
            <Table.Td>{element.birthDate}</Table.Td>
            <Table.Td>{element.telephone}</Table.Td>
            <Table.Td>{element.employment}</Table.Td>
            <Table.Td>{element.userAgreement ? 'yes' : 'no'}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Name</Table.Th>
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
