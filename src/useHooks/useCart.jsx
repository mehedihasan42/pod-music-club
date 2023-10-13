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
            const res = await fetch(`http://localhost:5000/saved?email=${user?.email}`)
            return res.json()
        },
      })

      return [refetch,savedCart,cardLoading]

};

export default useCart;
  