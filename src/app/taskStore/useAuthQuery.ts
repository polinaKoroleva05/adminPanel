import {useQuery} from '@tanstack/react-query';
import {AuthService} from '@/app/api';

export const useAuthQuery = () => {
    return useQuery({
        queryFn: AuthService.checkAuth,
        queryKey: ['auth'],
        staleTime: 1000 * 60,
        retry: false
        
    });
};
