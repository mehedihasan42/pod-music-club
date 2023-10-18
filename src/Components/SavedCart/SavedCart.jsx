import React from 'react';
import useCart from '../../useHooks/useCart';
import Header from '../../Home/Header/Header';
import Swal from 'sweetalert2';

const SavedCart = () => {
    const [refetch,savedCart] = useCart()

    const handleDeleteItem = item => {
      console.log(item);
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.isConfirmed) {
          fetch(`https://pod-music-server-side-qypo1cayo-mehedihasan42.vercel.app/saved/${item._id}`, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              if (data.deletedCount === 1) { // Check if the delete was successful
                refetch();
                Swal.fire(
                  'Deleted!',
                  'This music has been deleted.',
                  'success'
                );
              } else {
                Swal.fire(
                  'Error!',
                  'Unable to delete the item.',
                  'error'
                );
              }
            })
            .catch(error => console.error(error));
        }
      });
    };
    

    return (
        <div className="overflow-x-auto">
            <Header/>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Singer</th>
              <th>Lyricist</th>
              <th>Composer</th>
              <th>Label</th>
              <th>Distributor</th>
              <th>ISRC</th>
              <th>UPC</th>
              <th>CopR</th>
              <th>P Year</th>
            </tr>
          </thead>
          <tbody>
            {savedCart.map((saved, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{saved.title}</td>
                <td>{saved.singer}</td>
                <td>{saved.lyricist}</td>
                <td>{saved.composer}</td>
                <td>{saved.label}</td>
                <td>{saved.Distributor}</td>
                <td>{saved.ISRC}</td>
                <td>{saved.UPC}</td>
                <td>{saved.CopR}</td>
                <td>{saved.pYear}</td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(saved)}
                    className="btn btn-neutral btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default SavedCart;