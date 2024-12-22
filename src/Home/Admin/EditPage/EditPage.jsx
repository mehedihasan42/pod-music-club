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
      const res = await fetch(`https://pod-music-server.onrender.com/api/music/${data._id}`,{
        method:"PUT",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          AlbumTitle:data.AlbumTitle,
          TrackTitles:data.TrackTitles,
          Singer:data.Singer,
          Lyricist:data.Lyricist,
          Composers:data.Composers,
          Label:data.Label,
          PUB:data.PUB,
          UPC:data.UPC,
          ISRC:data.ISRC,
          CopRNo:data.CopRNo,
          Royalty:data.Royalty,
          Pyear:data.Pyear,
          Date:data.Date,
          FBDate:data.FBDate,
          Remark:data.Remark,
        })
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
       <h2 className='text-xl font-bold mt-16'>Edit Data Here</h2>
        <form className='bg-base-200 p-6 mx-auto' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-4 space-y-2'>
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
        {/* Lyricist */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Lyricist</span>
          </label>
          <input type="text" defaultValue={currentData?.Lyricist}  {...register("Lyricist")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* Composers */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Composers</span>
          </label>
          <input type="text" defaultValue={currentData?.Composers}    {...register("Composers")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* Label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Label</span>
          </label>
          <input type="text" defaultValue={currentData?.Label}  {...register("Label")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* PUB */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">PUB</span>
          </label>
          <input type="text" defaultValue={currentData?.PUB}   {...register("PUB")} 
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
        {/* ISRC */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">ISRC</span>
          </label>
          <input type="text" defaultValue={currentData?.ISRC}   {...register("ISRC")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* CopRNo */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">CopR No</span>
          </label>
          <input type="text" defaultValue={currentData?.CopRNo}   {...register("CopRNo")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* Royalty */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Royalty</span>
          </label>
          <input type="text" defaultValue={currentData?.Royalty}   {...register("Royalty")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* Pyear */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pyear</span>
          </label>
          <input type="text" defaultValue={currentData?.Pyear}   {...register("Pyear")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="text" defaultValue={currentData?.Date}   {...register("Date")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* FBDate */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">FB Date</span>
          </label>
          <input type="text" defaultValue={currentData?.FBDate}   {...register("FBDate")} 
          className="input input-bordered input-md w-full max-w-xs" />
        </div>
        {/* Remarks */}
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
        <input type="submit" className='btn btn-neutral hover:bg-white hover:text-black btn-wide mt-6 mx-auto block'/>
      </form>
       </>
    );
};

export default EditPage;