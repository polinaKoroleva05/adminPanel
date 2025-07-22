import {useUsersQuery} from '@/app/taskStore';
import {UsersTable} from '@/widgets/usersTable';
import {Loader} from '@mantine/core';

export default function AllUsersPage() {
    const {data: users, isLoading} = useUsersQuery();
    if (isLoading) {
        return <Loader />;
    }
    return <UsersTable users={users} />;
}
