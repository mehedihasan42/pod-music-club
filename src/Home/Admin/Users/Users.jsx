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
                title: "This user is an valid user now",
                showConfirmButton: false,
                timer: 1500
              });
              refetch()
        }
    });
  }

  const makeUser = (id) =>{
    fetch(`https://pod-music-server.onrender.com/api/approveUser/${id}`,{
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  }

  // const deleteUser = (id)=>{
  //   fetch(`https://pod-music-server.onrender.com/api/users/${id}`,{
  //       method:'DELETE',
  //   })
  //   .then(res=>res.json())
  //   .then(result=>{
  //       if(result.deletedCount > 0){
  //           Swal.fire({
  //               position: "top-end",
  //               icon: "success",
  //               title: "User deleted successfully",
  //               showConfirmButton: false,
  //               timer: 1500
  //             });
  //           refetch()
  //       }
  //   }
  //   )
  // }

  return (
    <div className="users">
        <Header/>
      <table className="table w-full mt-8">
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
                       <td>
                       {user.role ==='admin'?"Admin":<button onClick={()=>makeAdmin(user._id)} className="btn btn-neutral hover:bg-white hover:text-black btn-sm">Make Admin</button>}  
                        </td> 
                       <td> {user.role ==='approve'?"Valid User":<button onClick={()=>makeUser(user._id)} className="btn btn-neutral hover:bg-white hover:text-black btn-sm">Make User</button>}     </td>
                        <td><button className="btn btn-neutral hover:bg-white hover:text-black btn-sm" onClick={()=>deleteUser(user._id)}>Delete</button></td>                
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  );
};

export default Users;
