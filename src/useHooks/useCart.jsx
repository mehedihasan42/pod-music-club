import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


const useCart = () => {
    const {user} = useContext(AuthContext)

    const { refetch, data: savedCart = []} = useQuery({
        queryKey: ['saved',user?.email],
        queryFn: async()=>{
            const res = await fetch(`http://localhost:5000/saved?email=${user?.email}`)
            return res.json()
        },
      })

      return [refetch,savedCart]

};

export default useCart;
  