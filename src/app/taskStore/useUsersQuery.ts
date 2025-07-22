import { useQuery } from "@tanstack/react-query"
import {UserService} from '@/app/api';

export const useUsersQuery = () => {
    return useQuery({
        queryFn: UserService.get,
        queryKey: ['allUsers'],
        staleTime: 5000
    })
}