import {useMutation} from '@tanstack/react-query';
import {AuthService} from '@/app/api';


export function getAuthQueryMiddleware(callback: (value: boolean)=>void) {
    const {mutate: loginMutation, isPending: isLoginLoading, isSuccess: isSuccessLogin, ...allf} = useMutation({
        mutationFn: AuthService.login,

        onSuccess: (response) => {
            console.log(response);
            callback(true)
        },
        onError: (error) => {
            console.log('Ошибка авторизации: ' + error.message);
        }
    });
    console.log(allf)
    
    return {
        loginMutation,
        isLoginLoading,
        isSuccessLogin
    };
}
