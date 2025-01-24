import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useCart from "../../useHooks/useCart";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import useAdmin from "../../useHooks/useAdmin";
import Select from "react-select";

const Card = () => {
  const { user } = useContext(AuthContext);
  const [refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = useAdmin();
  const DropdownIndicator = () => null;

  const [infos, setInfos] = useState([]);
  const [titleSearchList, setTitleSearchList] = useState([]);
  const [trackTitleSearchList, setTrackTitleSearchList] = useState([]);
  const [singerSearchList, setSingerSearchList] = useState([]);
  const [lyricistSearchList, setLyricistSearchList] = useState([]);
  const [composerSearchList, setComposerSearchList] = useState([]);
  const [labelSearchList, setLabelSearchList] = useState([]);
  // const [distributorSearchList, setDistributorSearchList] = useState([]);
  // const [isrcSearchList, setIsrcSearchList] = useState([]);
  // const [upcSearchList, setUpcSearchList] = useState([]);
  // const [coprSearchList, setCoprSearchList] = useState([]);
  // const [yearSearchList, setYearSearchList] = useState([]);

  const [totalData, setTotalData] = useState();

  const handleCnangeData = (event) => {
    setTotalData(event.target.value);
  };

  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = totalData ? totalData : 50;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    fetch("https://pod-music-server.onrender.com/api/music")
      .then((res) => res.json())
      .then((data) => {
        setInfos(data);
        setSearchResults(data);
      });
  }, []);

  const handleClickLink = (link)=>{
     if (link.startsWith("http") || link.startsWith("www")) {
      window.open(link, "_blank", "noopener,noreferrer");
    }else {
      navigate(link);
    }
  }

  // Function to handle changes in the track title search input
  const handleTitleSelection = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((opt) => opt.label)
      : [];
    setTitleSearchList(selectedValues); // Example: Update state
  };
  const handleTrackTitleSelection = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((opt) => opt.label)
      : [];
    setTrackTitleSearchList(selectedValues); // Example: Update state
  };
  const handleSingerSelection = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((opt) => opt.label)
      : [];
    setSingerSearchList(selectedValues); // Example: Update state
  };
  const handleLyricistSelection = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((opt) => opt.label)
      : [];
    setLyricistSearchList(selectedValues); // Example: Update state
  };
  const handleComposerSelection = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((opt) => opt.label)
      : [];
    setComposerSearchList(selectedValues); // Example: Update state
  };
  const handleLabelSelection = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((opt) => opt.label)
      : [];
    setLabelSearchList(selectedValues); // Example: Update state
  };
  //  const handleIsrcSelection = (selectedOptions) => {
  //   const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.label) : [];
  //   setIsrcSearchList(selectedValues); // Example: Update state
  // };
  //  const handleUpcSelection = (selectedOptions) => {
  //   const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.label) : [];
  //   setUpcSearchList(selectedValues); // Example: Update state
  // };
  //  const handleCoprSelection = (selectedOptions) => {
  //   const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.label) : [];
  //   setCoprSearchList(selectedValues); // Example: Update state
  // };
  //  const handleYearSelection = (selectedOptions) => {
  //   const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.label) : [];
  //   setYearSearchList(selectedValues); // Example: Update state
  // };

  // Function to handle search
  const handleSearch = () => {
    let filteredData = infos;

    if (titleSearchList.length > 0) {
      filteredData = filteredData.filter((info) =>
        titleSearchList.some(
          (AlbumTitle) =>
            info.AlbumTitle &&
            AlbumTitle &&
            info.AlbumTitle.toLowerCase().includes(AlbumTitle.toLowerCase())
        )
      );
    }

    if (trackTitleSearchList.length > 0) {
      filteredData = filteredData.filter((info) =>
        trackTitleSearchList.some(
          (trackTitle) =>
            info.TrackTitles &&
            trackTitle &&
            info.TrackTitles.toLowerCase().includes(trackTitle.toLowerCase())
        )
      );
    }

    if (singerSearchList.length > 0) {
      filteredData = filteredData.filter((info) =>
        singerSearchList.some(
          (Singer) =>
            info.Singer &&
            Singer &&
            info.Singer.toLowerCase().includes(Singer.toLowerCase())
        )
      );
    }

    if (lyricistSearchList.length > 0) {
      filteredData = filteredData.filter((info) =>
        lyricistSearchList.some(
          (Lyricist) =>
            info.Lyricist &&
            Lyricist &&
            info.Lyricist.toLowerCase().includes(Lyricist.toLowerCase())
        )
      );
    }

    if (composerSearchList.length > 0) {
      filteredData = filteredData.filter((info) =>
        composerSearchList.some(
          (Composers) =>
            info.Composers &&
            Composers &&
            info.Composers.toLowerCase().includes(Composers.toLowerCase())
        )
      );
    }

    if (labelSearchList.length > 0) {
      filteredData = filteredData.filter((info) =>
        labelSearchList.some(
          (Label) =>
            info.Label &&
            Label &&
            info.Label.toLowerCase().includes(Label.toLowerCase())
        )
      );
    }

    // if (isrcSearchList.length > 0) {
    //   filteredData = filteredData.filter((info) =>
    //     isrcSearchList.some((isrc) =>
    //       info.isrc.toString().toLowerCase().includes(isrc.toString().toLowerCase())
    //     )
    //   );
    // }

    // if (upcSearchList.length > 0) {
    //   filteredData = filteredData.filter((info) =>
    //     upcSearchList.some((upc) =>
    //       info.upc.toLowerCase().includes(upc.toLowerCase())
    //     )
    //   );
    // }

    // if (coprSearchList.length > 0) {
    //   filteredData = filteredData.filter((info) =>
    //     coprSearchList.some((copr) =>
    //       info.copr.toLowerCase().includes(copr.toLowerCase())
    //     )
    //   );
    // }

    // if (yearSearchList.length > 0) {
    //   filteredData = filteredData.filter((info) =>
    //     yearSearchList.some((year) =>
    //       info.year.toLowerCase().includes(year.toLowerCase())
    //     )
    //   );
    // }
    setSearchResults(filteredData);
    setCurrentPage(1);
  };

  /*----handleSaveItem----*/
  const handleSaveItem = async (item) => {
    const data = {
      title: item.AlbumTitle,
      track: item.TrackTitles,
      composer: item.Composers,
      label: item.Label,
      lyricist: item.Lyricist,
      singer: item.Singer,
      pYear: item.Pyear,
      email: user?.email,
    };

    console.log(item.title);
    console.log(user?.email);
    if (user && user.email) {
      fetch("https://pod-music-server.onrender.com/api/saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Save music successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Log in!",
        text: "You can not save music without",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log in!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signIn", { state: { from: location } });
        }
      });
    }
  };

  const handleDeleteItem = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://pod-music-server.onrender.com/api/music/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
        setSearchResults((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      }
    });
  };

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const seenTitles = new Set();
  const titleOptions = infos
    .map((item) => {
      if (seenTitles.has(item.AlbumTitle)) {
        return null;
      }
      seenTitles.add(item.AlbumTitle);
      return {
        value: item.AlbumTitle,
        label: item.AlbumTitle,
      };
    })
    .filter(Boolean);

  const seenTrackTitles = new Set();
  const trackTitleOptions = infos
    .map((item) => {
      if (seenTrackTitles.has(item.TrackTitles)) {
        return null;
      }
      seenTrackTitles.add(item.TrackTitles);
      return {
        value: item.TrackTitles,
        label: item.TrackTitles,
      };
    })
    .filter(Boolean);

  const seenSingers = new Set();
  const singerOptions = infos
    .map((item) => {
      if (seenSingers.has(item.Singer)) {
        return null;
      }
      seenSingers.add(item.Singer);
      return {
        value: item.Singer,
        label: item.Singer,
      };
    })
    .filter(Boolean);

  const seenLyricist = new Set();
  const LyricistOptions = infos
    .map((item) => {
      if (seenLyricist.has(item.Lyricist)) {
        return null;
      }
      seenLyricist.add(item.Lyricist);
      return {
        value: item.Lyricist,
        label: item.Lyricist,
      };
    })
    .filter(Boolean);

  const seenComposers = new Set();
  const composersOptions = infos
    .map((item) => {
      if (seenComposers.has(item.Composers)) {
        return null;
      }
      seenComposers.add(item.Composers);
      return {
        value: item.Composers,
        label: item.Composers,
      };
    })
    .filter(Boolean);

  const seenLabel = new Set();
  const labelOptions = infos
    .map((item) => {
      if (seenLabel.has(item.Label)) {
        return null;
      }
      seenLabel.add(item.Label);
      return {
        value: item.Label,
        label: item.Label,
      };
    })
    .filter(Boolean);

  const seenISRC = new Set();
  const ISRCOptions = infos
    .map((item) => {
      if (seenISRC.has(item.ISRC)) {
        return null;
      }
      seenISRC.add(item.ISRC);
      return {
        value: item.ISRC,
        label: item.ISRC,
      };
    })
    .filter(Boolean);

  const seenUPC = new Set();
  const UPC_Options = infos
    .map((item) => {
      if (seenUPC.has(item.UPC)) {
        return null;
      }
      seenUPC.add(item.UPC);
      return {
        value: item.UPC,
        label: item.UPC,
      };
    })
    .filter(Boolean);

  const seenCopRNo = new Set();
  const CopRNo_Options = infos
    .map((item) => {
      if (seenCopRNo.has(item.CopRNo)) {
        return null;
      }
      seenCopRNo.add(item.CopRNo);
      return {
        value: item.CopRNo,
        label: item.CopRNo,
      };
    })
    .filter(Boolean);

  // const seenCopRNo = new Set();
  // const CopRNo_Options = infos
  // .map((item) => {
  //   if (seenCopRNo.has(item.CopRNo)) {
  //     return null;
  //   }
  //   seenCopRNo.add(item.CopRNo);
  //   return {
  //     value: item.CopRNo,
  //     label: item.CopRNo,
  //   };
  // })
  // .filter(Boolean);

  return (
    <div className="">
      <div className="card overflow-auto w-11/12 mx-auto h-screen">
        <div className="grid lg:grid-cols-4 my-4 space-y-2 space-x-2 mt-20 mx-auto">
          {/* ---albam title--- */}
          <div className="relative mt-2 ml-2">
            <Select
              isMulti
              options={titleOptions}
              className="basic-multi-select w-full max-w-sm"
              classNamePrefix="select"
              value={titleSearchList.map((title) => ({
                value: title,
                label: title,
              }))}
              onChange={handleTitleSelection}
              placeholder="Album Title"
              components={{ DropdownIndicator }}
            />
          </div>
          {/* ---track title--- */}
          <div className="relative">
            <Select
              isMulti
              options={trackTitleOptions}
              className="basic-multi-select w-full max-w-xs"
              classNamePrefix="select"
              value={trackTitleSearchList.map((title) => ({
                value: title,
                label: title,
              }))}
              onChange={handleTrackTitleSelection}
              placeholder="Track Title"
              components={{ DropdownIndicator }}
            />
          </div>
          {/* ------singer------------ */}
          <div className="relative">
            <Select
              isMulti
              options={singerOptions}
              className="basic-multi-select w-full max-w-xs"
              classNamePrefix="select"
              value={singerSearchList.map((title) => ({
                value: title,
                label: title,
              }))}
              onChange={handleSingerSelection}
              placeholder="Singer"
              components={{ DropdownIndicator }}
            />
          </div>
          {/* ----------Lyricist------------ */}
          <div className="relative">
            <Select
              isMulti
              options={LyricistOptions}
              className="basic-multi-select w-full max-w-xs"
              classNamePrefix="select"
              value={lyricistSearchList.map((title) => ({
                value: title,
                label: title,
              }))}
              onChange={handleLyricistSelection}
              placeholder="Lyricist"
              components={{ DropdownIndicator }}
            />
          </div>
          {/* ---------composer--------- */}
          <div className="relative">
            <Select
              isMulti
              options={composersOptions}
              className="basic-multi-select w-full max-w-xs"
              classNamePrefix="select"
              value={composerSearchList.map((title) => ({
                value: title,
                label: title,
              }))}
              onChange={handleComposerSelection}
              placeholder="Composer"
              components={{ DropdownIndicator }}
            />
          </div>
          {/* -------label------ */}
          <div className="relative">
            <Select
              isMulti
              options={labelOptions}
              className="basic-multi-select w-full max-w-xs"
              classNamePrefix="select"
              value={labelSearchList.map((title) => ({
                value: title,
                label: title,
              }))}
              onChange={handleLabelSelection}
              placeholder="Label"
              components={{ DropdownIndicator }}
            />
          </div>
          {/* ------ISRC-------- */}
          {/* <div className="relative">
          <Select
            isMulti
            options={ISRCOptions}
            className="basic-multi-select w-full max-w-xs"
            classNamePrefix="select"
            value={isrcSearchList.map((title) => ({
              value: title,
              label: title,
            }))}
            onChange={handleIsrcSelection}
            placeholder="ISRC"
            components={{ DropdownIndicator }}
          />
        </div> */}
          {/* ------UPC-------- */}
          {/* <div className="relative">
          <Select
            isMulti
            options={UPC_Options}
            className="basic-multi-select w-full max-w-xs"
            classNamePrefix="select"
            value={trackTitleSearchList.map((title) => ({
              value: title,
              label: title,
            }))}
            onChange={handleUpcSelection}
            placeholder="UPC"
            components={{ DropdownIndicator }}
          />
        </div> */}
          {/* ------CopR---------- */}
          {/* <div className="relative">
          <Select
            isMulti
            options={CopRNo_Options}
            className="basic-multi-select w-full max-w-xs"
            classNamePrefix="select"
            value={trackTitleSearchList.map((title) => ({
              value: title,
              label: title,
            }))}
            onChange={handleCoprSelection}
            placeholder="CopR"
            components={{ DropdownIndicator }}
          />
        </div> */}
          {/* --------P Year--------- */}
          {/* <div className="relative">
          <Select
            isMulti
            options={trackTitleOptions}
            className="basic-multi-select w-full max-w-xs"
            classNamePrefix="select"
            value={trackTitleSearchList.map((title) => ({
              value: title,
              label: title,
            }))}
            onChange={handleYearSelection}
            placeholder="P Year"
            components={{ DropdownIndicator }}
          />
        </div> */}
          <button
            className="btn btn-sm btn-neutral hover:bg-white hover:text-black w-80"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <table className="table">
          <thead className="sticky top-8 bg-white dark:bg-gray-900">
            <tr>
              <th></th> {/* Adjust width for index column */}
              <th> Album Title </th>
              <th>Track Titles</th>
              <th>Singer</th>
              <th>Lyricist</th>
              <th>Composer</th>
              <th>Label</th>
              <th>UPC</th>
              <th>ISRC</th>
              <th>CopR</th>
              <th>P Year</th>
              <th>PUB</th>
              <th>Dist</th>
              <th>Remarks</th>
              <th>Link</th>
              <th>Royalty</th>
              <th>Date</th>
              <th>FB Date</th>
              <th></th> {/* Adjust width for Save button column */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((info, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="w-11 whitespace-nowrap">{info.AlbumTitle}</td>
                <td className="w-11 whitespace-nowrap">{info.TrackTitles}</td>
                <td className="w-11 whitespace-nowrap">{info.Singer}</td>
                <td className="w-11 whitespace-nowrap">{info.Lyricist}</td>
                <td className="w-11 whitespace-nowrap">{info.Composers}</td>
                <td className="w-11 whitespace-nowrap">{info.Label}</td>
                <td className="w-11 whitespace-nowrap">{info.UPC}</td>
                <td className="w-11 whitespace-nowrap">{info.ISRC}</td>
                <td className="w-11 whitespace-nowrap">{info.CopRNo}</td>
                <td className="w-11 whitespace-nowrap">{info.Pyear}</td>
                <td className="w-11 whitespace-nowrap">{info.PUB}</td>
                <td></td>
                <td className="w-11 whitespace-nowrap">{info.Remarks}</td>
                <td className="btn btn-link" onClick={()=>handleClickLink(info.link)}>Link</td>
                <td className="w-11 whitespace-nowrap">{info.Royalty}</td>
                <td className="w-11 whitespace-nowrap">{info.Date}</td>
                <td className="w-11 whitespace-nowrap">{info.FBDate}</td>
                {/* <td ><FaYoutube className="text-3xl text-red-600 cursor-pointer"/></td> */}
                <td className="dropdown my-0 py-0">
                  <summary
                    tabIndex={0}
                    role="button"
                    className="btn btn-circle btn-xs m-1"
                  >
                    <BsThreeDotsVertical className="text-2xl" />
                  </summary>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 z-[1] space-y-0.5 p-2 shadow"
                  >
                    <li>
                      <button
                        onClick={() => handleSaveItem(info)}
                        className="btn btn-neutral hover:bg-white hover:text-black btn-xs"
                      >
                        Save
                      </button>
                    </li>
                    {userRole === "admin" && (
                      <li>
                        <Link
                          to={`/editPage/${info._id}`}
                          className="btn btn-neutral hover:bg-white hover:text-black btn-xs"
                        >
                          Edit
                        </Link>
                      </li>
                    )}
                    {userRole === "admin" && (
                      <li>
                        <button
                          onClick={() => handleDeleteItem(info._id)}
                          className="btn btn-neutral hover:bg-white hover:text-black btn-xs"
                        >
                          Delete
                        </button>
                      </li>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <div className="overflow-x-scroll max-w-screen-lg mx-auto"></div> */}
        </table>
      </div>
      <div className="flex justify-center my-2 space-x-4 mt-4 fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-white dark:bg-gray-900">
        <select
          onChange={handleCnangeData}
          defaultValue={50}
          className="select select-bordered select-sm w-24 max-w-xs"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <button
          className="btn btn-sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <FaArrowCircleLeft className="text-xl" />
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FaArrowCircleRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Card;
