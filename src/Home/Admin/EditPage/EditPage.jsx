import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMusics from '../../../useHooks/useMusics';
import Header from '../../Header/Header';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const EditPage = () => {
    const musicData = useMusics()
    const id = useParams()

    const currentData = musicData?.find((userData) => userData?._id === id.id);

    const {
      register,
      handleSubmit,
      reset
    } = useForm({defaultValues:currentData || {}})

    useEffect(() => {
      if (currentData) {
          reset(currentData);
      }
  }, [currentData, reset]);
  
    const onSubmit = async(data) => {
      const res = await fetch(`https://pod-music-server.onrender.com/api/music/${id.id}`,{
        method:"PUT",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({title:data.title,singer:data.singer,lyricist:data.lyricist,composer:data.composer,label:data.label,Distributor:data.Distributor,ISRC:data.ISRC,UPC:data.UPC,CopR:data.CopR,Year:data.Year,Link:data.Link})
      })
      const result = res.json();
      if(result){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Edit Successfully Done",
          showConfirmButton: false,
          timer: 1500
        });
      }
      console.log(result)
    }

    return (
        <>
       <Header/>
       <h2 className='text-xl font-bold'>Edit Data Here</h2>
        <form className='bg-base-200 p-6 mx-auto' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-2 space-y-2'>
        {/* title */}
      <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" defaultValue={currentData?.title} {...register("title")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/*  Bangla*/}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bangla</span>
          </label>
          <input type="text" defaultValue={currentData?.singer}   {...register("bangla")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* singer */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Singer</span>
          </label>
          <input type="text" defaultValue={currentData?.singer}  {...register("singer")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* lyricist */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Lyricist</span>
          </label>
          <input type="text" defaultValue={currentData?.lyricist}    {...register("lyricist")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* composer */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Composer</span>
          </label>
          <input type="text" defaultValue={currentData?.composer}  {...register("composer")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Label</span>
          </label>
          <input type="text" defaultValue={currentData?.label}   {...register("label")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* Distributor */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Distributor</span>
          </label>
          <input type="text" defaultValue={currentData?.Distributor}   {...register("Distributor")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* ISRC */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">ISRC</span>
          </label>
          <input type="text" defaultValue={currentData?.ISRC}  {...register("ISRC")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* UPC */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">UPC</span>
          </label>
          <input type="text" defaultValue={currentData?.UPC}   {...register("UPC")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        CopR
        <div className="form-control">
          <label className="label">
            <span className="label-text">CopR</span>
          </label>
          <input type="text" defaultValue={currentData?.CopR}  {...register("CopR")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* Year */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Year</span>
          </label>
          <input type="text" defaultValue={currentData?.Year}   {...register("Year")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* Link */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Link</span>
          </label>
          <input type="text" defaultValue={currentData?.Link}  {...register("Link")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div> 
      </div>
        <input type="submit" className='btn btn-wide btn-neutral mt-6'/>
      </form>
       </>
    );
};

export default EditPage;