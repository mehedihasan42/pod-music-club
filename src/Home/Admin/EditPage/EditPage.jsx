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
        {/* AlbumTitle */}
      <div className="form-control">
          <label className="label">
            <span className="label-text">Album Title</span>
          </label>
          <input type="text" defaultValue={currentData?.AlbumTitle} {...register("AlbumTitle")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* TrackTitles */}
      <div className="form-control">
          <label className="label">
            <span className="label-text">Album Title</span>
          </label>
          <input type="text" defaultValue={currentData?.TrackTitles} {...register("TrackTitles")} 
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
          <input type="text" defaultValue={currentData?.Singer}  {...register("Singer")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* lyricist */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Lyricist</span>
          </label>
          <input type="text" defaultValue={currentData?.Lyricist}    {...register("Lyricist")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* composer */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Composer</span>
          </label>
          <input type="text" defaultValue={currentData?.Composer}  {...register("Composer")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Label</span>
          </label>
          <input type="text" defaultValue={currentData?.Label}   {...register("Label")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">PUB</span>
          </label>
          <input type="text" defaultValue={currentData?.PUB}   {...register("PUB")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">UPC</span>
          </label>
          <input type="text" defaultValue={currentData?.UPC}   {...register("UPC")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">ISRC</span>
          </label>
          <input type="text" defaultValue={currentData?.ISRC}   {...register("ISRC")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">CopR No</span>
          </label>
          <input type="text" defaultValue={currentData?.CopRNo}   {...register("CopRNo")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Royalty</span>
          </label>
          <input type="text" defaultValue={currentData?.Royalty}   {...register("Royalty")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pyear</span>
          </label>
          <input type="text" defaultValue={currentData?.Pyear}   {...register("Pyear")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="text" defaultValue={currentData?.Date}   {...register("Date")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">FB Date</span>
          </label>
          <input type="text" defaultValue={currentData?.FBDate}   {...register("FBDate")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Remarks</span>
          </label>
          <input type="text" defaultValue={currentData?.Remarks}   {...register("Remarks")} 
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