import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAuth from './useAuth';


const useCart = () => {
    const {user} = useContext(AuthContext)

    const { refetch, data: savedCart = [], isLoading:cardLoading} = useQuery({
        queryKey: ['saved',user?.email],
        enabled: !!user?.email,
        queryFn: async()=>{
            const res = await fetch(`https://pod-music-server-side-qypo1cayo-mehedihasan42.vercel.app/saved?email=${user?.email}`)
            return res.json()
        },
      })

      return [refetch,savedCart,cardLoading]

};

export default useCart;
  