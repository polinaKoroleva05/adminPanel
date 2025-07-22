import {useQueryClient} from '@tanstack/react-query';
import {useMutation} from '@tanstack/react-query';
import {AuthService, UserService} from '@/app/api';


export function getUserQueryMiddleware() {
    const client = useQueryClient();
    const {mutate: loginMutation, isPending: isLoginLoading} = useMutation({
        mutationFn: AuthService.login,

        onSuccess: (response) => {
            console.log(response);
        },
        onError: (error) => {
            console.log('Ошибка авторизации: ' + error.message);
        }
    });
    const {mutate: createUserMutation} = useMutation({
        mutationFn: UserService.createUser,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['allUsers']});
            // client.invalidateQueries({queryKey: ['allTasks']});
        }
    });

    const {mutate: editUserMutation} = useMutation({
        mutationFn: UserService.editUser,
        onError: (_err, _variables) => {
            console.log(_err)
        },
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['allUsers']});
        }
    });

    const {mutate: deleteUserMutation} = useMutation({
        mutationFn: UserService.deleteUser,
        onError: (_err, _id) => {
            console.log(_err)
        },
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['allUsers']});
        }
    });
    return {
        loginMutation,
        isLoginLoading,
        createUserMutation,
        editUserMutation,
        deleteUserMutation
    };
}
