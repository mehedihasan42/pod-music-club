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
          console.log(item._id)
          fetch(`https://pod-music-server.onrender.com/api/saved/${item._id}`, {
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
        <div className="overflow-x-auto mt-10 saved">
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
                <td>{saved.track}</td>
                <td>{saved.singer}</td>
                <td>{saved.lyricist}</td>
                <td>{saved.composers}</td>
                <td>{saved.label}</td>
                <td>{saved.PUB}</td>
                <td>{saved.UPC}</td>
                <td>{saved.ISRC}</td>
                <td>{saved.CopRNo}</td>
                <td>{saved.Royalty}</td>
                <td>{saved.pYear}</td>
                <td>{saved.Date}</td>
                <td>{saved.FBDate}</td>
                <td>{saved.Remarks}</td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(saved)}
                    className="btn btn-neutral hover:bg-white hover:text-black btn-sm"
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