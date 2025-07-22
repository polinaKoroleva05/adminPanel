import {getUserQueryMiddleware} from '@/app/taskStore';
import {Button, Table, Text} from '@mantine/core';
import type {UserInterface} from '@shared/model/types';
import {useNavigate} from 'react-router';
import DeleteIcon from '@shared/ui/delete.svg?react';
import EditIcon from '@shared/ui/edit.svg?react';
import styles from './usersTable.module.css';
import { modals } from '@mantine/modals';

export default function UsersTable({users}: {users: UserInterface[]}) {
    const navigate = useNavigate();
    const {deleteUserMutation} = getUserQueryMiddleware();
    console.log(users);
    const openDeleteModal = (id: string) =>
        modals.openConfirmModal({
            title: 'Please confirm your action',
            children: (
                <Text size='sm'>
                    Are you sure you want to delete the user? This action
                    cannot be undone.
                </Text>
            ),
            labels: {confirm: 'Delete', cancel: 'Cancel'},
            confirmProps: {color: 'red'},
            onCancel: () => console.log('Cancel'),
            onConfirm: () => deleteUserMutation(id)
        });

    function onEdit(id: string) {
        navigate(`/user/edit/${id}/mantine`);
    }
    function onDelete(event: any, id: string) {
        event.stopPropagation();
        openDeleteModal(id);
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
                <Button
                    variant='outline'
                    color='#8c8c8cff'
                    size='xs'
                    radius='sm'
                    onClick={() => onEdit(user.id)}
                >
                    <EditIcon className={styles.iconEdit} />
                </Button>
            </Table.Td>
            <Table.Td>
                <Button
                    variant='outline'
                    color='#8c8c8cff'
                    size='xs'
                    radius='sm'
                    onClick={(event) => onDelete(event, user.id)}
                >
                    <DeleteIcon className={styles.iconDelete} />
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table
            className={styles.table}
            highlightOnHover
            withTableBorder
            striped
            withColumnBorders
            withRowBorders={false}
        >
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
