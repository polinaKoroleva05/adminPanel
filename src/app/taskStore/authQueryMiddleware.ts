import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AuthService} from '@/app/api';


export function getAuthQueryMiddleware() {
    const client = useQueryClient();
    const {mutate: loginMutation, isPending: isLoginLoading, isSuccess: isSuccessLogin, ...all} = useMutation({
        mutationFn: AuthService.login,

        onSuccess: (response) => {
            client.setQueryData(['auth'], response);
        },
        onError: (error) => {
            console.log('Ошибка авторизации: ' + error.message);
        }
    });

    const {mutate: logoutMutation} = useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['auth']});
        },
        onError: (error) => {
            console.log('Ошибка выхода из аккаунта: ' + error.message);
        }
    });
    
    return {
        loginMutation,
        isLoginLoading,
        all,
        isSuccessLogin,
        logoutMutation
    };
}
