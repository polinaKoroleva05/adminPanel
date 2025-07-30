import {useQueryClient} from '@tanstack/react-query';
import {useMutation} from '@tanstack/react-query';
import {UserService} from '@/app/api';
import type { UserInterface } from '@/shared/model/types';

export function getUserQueryMiddleware() {
    const client = useQueryClient();
    const {mutate: createUserMutation} = useMutation({
        mutationFn: UserService.createUser,
        onSuccess: (data, userCreateData) => { //устананавливаем для нового айдишника, получ.от сервера значение в кэш, и добавляем в общий список
            console.log('data createUserMutation', data)
            client.setQueryData(['user', data.data.id], () => ({id: data.data.id, ...userCreateData}));
            client.setQueryData(['allUsers'], (oldUsers: UserInterface[]) => [
                ...oldUsers,
                {id: data.data.id, ...userCreateData}
            ]);
            // client.invalidateQueries({queryKey: ['allUsers']});

        }
    });

    const {mutate: editUserMutation} = useMutation({
        mutationFn: UserService.editUser,
        onError: (_err, _variables) => {
            console.log(_err);
        },
        onSuccess: (_axiosRes, {id, dataUser}) => { //в кэше устанавливаем актуальные данные для пользователя и обновляем весь список
            client.setQueryData(['user', id], (oldUser: UserInterface) => ({...oldUser, ...dataUser}));
            client.setQueryData(['allUsers'], (oldUsers: UserInterface[]) =>
                oldUsers.map((user) =>
                    user.id === id ? {...user, ...dataUser} : user
                )
            );
            // client.invalidateQueries({queryKey: ['user', id]});
            // client.invalidateQueries({queryKey: ['allUsers']});
        }
    });

    const {mutate: deleteUserMutation} = useMutation({
        mutationFn: UserService.deleteUser,
        onError: (_err, _id) => {
            console.log(_err);
        },
        onSuccess: (_axiosRes, id) => { //в кэше удаляем пользователя с этим айдишником
            client.setQueryData(['allUsers'], (oldUsers: UserInterface[]) =>
                oldUsers.filter((user: UserInterface) => user.id != id)
            );
            // client.invalidateQueries({queryKey: ['allUsers']});
        }
    });
    return {
        createUserMutation,
        editUserMutation,
        deleteUserMutation
    };
}
