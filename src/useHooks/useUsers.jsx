import { useQuery } from '@tanstack/react-query';

const useUsers = () => {

   const { refetch, data: userData = []} = useQuery({
        queryKey: [],
        queryFn: async()=>{
            const res = await fetch("https://pod-music-server.onrender.com/api/users")
            return res.json()
        },
      })
    return [refetch,userData];
};

export default useUsers;