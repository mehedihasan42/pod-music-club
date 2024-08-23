import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAdmin = () => {
    const [userRole,setUserRole] = useState([])
    const { user } = useContext(AuthContext);

    useEffect(() => {
      fetch("https://pod-music-server.onrender.com/api/users")
        .then((res) => res.json())
        .then((data) => {
          const currentUser = data.find((userData) => userData.email === user?.email);
          if (currentUser) {
            setUserRole(currentUser.role);
          }
        });
    }, [user]);

    return userRole;
};

export default useAdmin;