import {useQuery} from '@tanstack/react-query';
import {UserService} from '@/app/api';

export const useIdUserQuery = (id: string) => {
    return useQuery({
        queryFn: () => UserService.getById(id),
        queryKey: ['user', id],
        staleTime: 1000 * 60,
        retry: (failureCount, error) => {
            console.log(error)
            if (error.message === 'Not Found') {
                return false;
            }
            return failureCount < 3;
        }
    });
};
