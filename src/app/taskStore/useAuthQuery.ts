import {useQuery} from '@tanstack/react-query';
import {AuthService} from '@/app/api';

export const useAuthQuery = () => {
    return useQuery({
        queryFn: AuthService.checkAuth,
        queryKey: ['auth'],
        staleTime: 5000,
        retry: (failureCount, error: any) => {
            if(error.response?.data.statusCode){
                return false
            }
            if (error.message === 'Not Found') {
                return false;
            }
            return failureCount < 3;
        }
    });
};
