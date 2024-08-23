import React from 'react';
import { useForm } from "react-hook-form"
import Header from '../../Header/Header';
import Swal from 'sweetalert2';

const AddItem = () => {
    const { register, handleSubmit,reset} = useForm()
    
      const onSubmit = async (data) =>{
        const response = await fetch('https://pod-music-server.onrender.com/api/music', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        console.log(result.acknowledged);
        if(result.acknowledged === true){
          reset()
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Add Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }


    return (
       <>
       <Header/>
        <h2 className='text-xl font-bold'>Add New Collection</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-base-200 p-6 mx-auto'>
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input defaultValue="test" {...register("example")} /> */}
  
        {/* include validation with required or other standard HTML validation rules */}
        {/* <input {...register("exampleRequired", { required: true })} />
        */}

      <div className='grid grid-cols-2 space-y-2'>
      <input
  type="text"
  placeholder="Title"
  {...register("title")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="Bangla Title"
  {...register("banglaTitle")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="Singer"
  {...register("singer")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="Lyricist"
  {...register("lyricist")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="Composer"
  {...register("composer")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="Label"
  {...register("label")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="Distributor"
  {...register("Distributor")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="ISRC"
  {...register("ISRC")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="UPC"
  {...register("UPC")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="CopR"
  {...register("CopR")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="Year"
  {...register("Year")}
  className="input input-bordered input-md w-full max-w-xs" />
<input
  type="text"
  placeholder="Link"
  {...register("Link")}
  className="input input-bordered input-md w-full max-w-xs" />
      </div>
        <input type="submit" className='btn btn-wide btn-neutral mt-6'/>
      </form>
       </>
    );
};

export default AddItem;