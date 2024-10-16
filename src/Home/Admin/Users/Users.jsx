import React from "react";
import useUsers from "../../../useHooks/useUsers";
import Swal from "sweetalert2";
import Header from "../../Header/Header";

const Users = () => {
  const [refetch,userData] = useUsers();
  const makeAdmin = (id) =>{
    fetch(`https://pod-music-server.onrender.com/api/users/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({})
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.modifiedCount >0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "This user is an admin now",
                showConfirmButton: false,
                timer: 1500
              });
              refetch()
        }
    });
  }

  const deleteUser = (id)=>{
    fetch(`https://pod-music-server.onrender.com/api/users/${id}`,{
        method:'DELETE',
    })
    .then(res=>res.json())
    .then(result=>{
        if(result.deletedCount > 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User deleted successfully",
                showConfirmButton: false,
                timer: 1500
              });
            refetch()
        }
    }
    )
  }

  return (
    <div>
        <Header/>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Make Admin</th>
          </tr>
        </thead>
        <tbody>
            {
                userData.map((user)=>(
                    <tr>
                        <td>{user.email}</td>
                        {user.role ==='admin'?"Admin":<button onClick={()=>makeAdmin(user._id)} className="btn btn-neutral btn-sm">Admin</button>}   
                        <td><button className="btn btn-neutral btn-sm" onClick={()=>deleteUser(user._id)}>Delete</button></td>                
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  );
};

export default Users;
