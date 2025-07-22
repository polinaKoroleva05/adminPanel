import type {
    UserCreateInterface,
    UserPatchInterface
} from '@/shared/model/types.ts';
import {instance} from './api.config.ts';

const UserService = {
    get() {
        return instance.get('/api/v1/users').then((res) => res.data);
    },

    getById(id: string) {
        console.log('UserService getById', window.location.origin);
        return instance.get('/api/v1/users/' + id).then((res) => res.data);
    },

    createUser(dataUser: UserCreateInterface) {
        if (dataUser.birthDate) {
            const dateInstance = new Date(dataUser.birthDate);
            console.log('createUser date', dateInstance.toISOString());
            dataUser.birthDate = dateInstance.toISOString();
        }
        return instance.post('/api/v1/users', dataUser, {
            headers: {'Content-Type': 'application/json'}
        });
    },
    editUser({id, dataUser}: {id: string; dataUser: UserPatchInterface}) {
        if (dataUser.birthDate) {
            const dateInstance = new Date(dataUser.birthDate);
            console.log('createUser date', dateInstance.toISOString());
            dataUser.birthDate = dateInstance.toISOString();
        }
        return instance.patch('/api/v1/users/' + id, dataUser, {
            headers: {'Content-Type': 'application/json'}
        });
    },
    deleteUser(id: string) {
        return instance.delete('/api/v1/users/' + id);
    }
};

export default UserService;
