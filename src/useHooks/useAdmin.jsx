import { useState } from 'react';

const useAdmin = () => {
    const [userRole,setUserRole] = useState([])

    useEffect(() => {
        fetch("https://pod-music-server.onrender.com/api/users")
          .then((res) => res.json())
          .then((data) => {
            const currentUser = data.find((userData) => userData.email === user?.email);
            if (currentUser) {
              setUserRole(currentUser.role);
            }
          });
      }, []);

    return userRole;
};

export default useAdmin;