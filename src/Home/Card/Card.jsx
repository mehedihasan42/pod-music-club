import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useCart from "../../useHooks/useCart";
import { FaArrowCircleRight,FaArrowCircleLeft } from "react-icons/fa";
import useAdmin from "../../useHooks/useAdmin";


const Card = () => {
  const { user } = useContext(AuthContext);
  const [refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = useAdmin()


  const [infos, setInfos] = useState([]);
  //Album Title
  const [titleSearchQuery, setTitleSearchQuery] = useState("");
  const [titleSearchList, setTitleSearchList] = useState([]);
  const [titleSuggestions, setTitleSuggestions] = useState([]);

  //track Title
  const [trackTitleSearchQuery, settrackTitleSearchQuery] = useState("");
  const [trackTitleSearchList, setTrackTitleSearchList] = useState([]);
  const [trackTitleSuggestions, setTrackTitleSuggestions] = useState([]);
  //singer
  const [singerSearchQuery, setSingerSearchQuery] = useState("");
  const [singerSearchList, setSingerSearchList] = useState([]);
  const [singerSuggestions, setSingerSuggestions] = useState([]);
  //lyricis
  const [lyricistSearchQuery, setlyricistSearchQuery] = useState("");
  const [lyricistSearchList, setLyricistSearchList] = useState([]);
  const [lyricistSuggestions, setLyricistSuggestions] = useState([]);
  //composer
  const [composerSearchQuery, setComposerSearchQuery] = useState("");
  const [composerSearchList, setComposerSearchList] = useState([]);
  const [composerSuggestions, setComposerSuggestions] = useState([]);
  //label
  const [labelSearchQuery, setLabelSearchQuery] = useState("");
  const [labelSearchList, setLabelSearchList] = useState([]);
  const [labelSuggestions, setLabelSuggestions] = useState([]);
  //distributor
  const [distributorSearchQuery, setDistributorSearchQuery] = useState("");
  const [distributorSearchList, setDistributorSearchList] = useState([]);
  const [distributorSuggestions, setDistributorSuggestions] = useState([]);
  //isrc
  const [isrcSearchQuery, setIsrcSearchQuery] = useState("");
  const [isrcSearchList, setIsrcSearchList] = useState([]);
  const [isrcSuggestions, setIsrcSuggestions] = useState([]);
  //upc
  const [upcSearchQuery, setUpcSearchQuery] = useState("");
  const [upcSearchList, setUpcSearchList] = useState([]);
  const [upcSuggestions, setUpcSuggestions] = useState([]);
  //copr
  const [coprSearchQuery, setCoprSearchQuery] = useState("");
  const [coprSearchList, setCoprSearchList] = useState([]);
  const [coprSuggestions, setCoprSuggestions] = useState([]);
  //year
  const [yearSearchQuery, setYearSearchQuery] = useState("");
  const [yearSearchList, setYearSearchList] = useState([]);
  const [yearSuggestions, setYearSuggestions] = useState([]);

  const [totalData,setTotalData] = useState()

  const handleCnangeData = (event) =>{
    setTotalData(event.target.value)
  }

  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = totalData?totalData:50;
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
  
 // Function to handle changes in the album title search input
  const handleTitleSearchChange = (e) => {
    const { value } = e.target;
    setTitleSearchQuery(value);
    if (value.trim() === "") {
      setTitleSuggestions([]);
      return;
    }
    const filteredSuggestions = infos.filter((info) =>
      info.AlbumTitle.toLowerCase().includes(value.toLowerCase())
    )
    .reduce((acc, curr) => {
      if (!acc.some(item => item.AlbumTitle === curr.AlbumTitle)) {
        acc.push(curr);
      }
      return acc;
    }, []);
    // const filteredSuggestions = infos.filter((info) =>
    //   info.title.toLowerCase().includes(value.toLowerCase())
    // );
    setTitleSuggestions(filteredSuggestions);
  };

 // Function to handle changes in the track title search input
  const handleTrackTitleSearchChange = (e) => {
    const { value } = e.target;
    settrackTitleSearchQuery(value);
    if (value.trim() === "") {
      setTrackTitleSuggestions([]);
      return;
    }
    const filteredSuggestions = infos.filter((info) =>
      info.TrackTitles.toLowerCase().includes(value.toLowerCase())
    )
    .reduce((acc, curr) => {
      if (!acc.some(item => item.TrackTitles === curr.TrackTitles)) {
        acc.push(curr);
      }
      return acc;
    }, []);
    // const filteredSuggestions = infos.filter((info) =>
    //   info.title.toLowerCase().includes(value.toLowerCase())
    // );
    setTrackTitleSuggestions(filteredSuggestions);
  };

  // Function to handle changes in the singer search input
  const handleSingerSearchChange = (e) => {
    const { value } = e.target;
    setSingerSearchQuery(value);
    if (value.trim() === "") {
      setSingerSuggestions([]);
      return;
    }
    const filteredSuggestions = infos.filter((info) =>
      info.Singer.toLowerCase().includes(value.toLowerCase())
    )
    .reduce((acc, curr) => {
      if (!acc.some(item => item.Singer === curr.Singer)) {
        acc.push(curr);
      }
      return acc;
    }, []);
    setSingerSuggestions(filteredSuggestions);
  };

  // Function to handle changes in the Lyricist search input
  const handleLyricistSearchChange = (e) => {
    const { value } = e.target;
    setlyricistSearchQuery(value);
    if (value.trim() === "") {
      setLyricistSuggestions([]);
      return;
    }
    const filteredSuggestions = infos.filter((info) =>
      info.Lyricist.toLowerCase().includes(value.toLowerCase())
    )
    .reduce((acc, curr) => {
      if (!acc.some(item => item.Lyricist === curr.Lyricist)) {
        acc.push(curr);
      }
      return acc;
    }, []);
    // const filteredSuggestions = infos.filter((info) =>
    //   info.lyricist.toLowerCase().includes(value.toLowerCase())
    // )
    setLyricistSuggestions(filteredSuggestions);
  };

  // Function to handle changes in the composer search input
  const handleComposerSearchChange = (e) => {
    const { value } = e.target;
    setComposerSearchQuery(value);
    if (value.trim() === "") {
      setComposerSuggestions([]);
      return;
    }
    const filteredSuggestions = infos.filter((info) =>
      info.Composers.toLowerCase().includes(value.toLowerCase())
    )
    .reduce((acc, curr) => {
      if (!acc.some(item => item.Composers === curr.Composers)) {
        acc.push(curr);
      }
      return acc;
    }, []);
    // const filteredSuggestions = infos.filter((info) =>
    //   info.composer.toLowerCase().includes(value.toLowerCase())
    // );
    setComposerSuggestions(filteredSuggestions);
  };
  // Function to handle changes in the label search input
  const handleLabelSearchChange = (e) => {
    const { value } = e.target;
    setLabelSearchQuery(value);
    if (value.trim() === "") {
      setLabelSuggestions([]);
      return;
    }
    const filteredSuggestions = infos.filter((info) =>
      info.Label.toLowerCase().includes(value.toLowerCase())
    )
    .reduce((acc, curr) => {
      if (!acc.some(item => item.Label === curr.Label)) {
        acc.push(curr);
      }
      return acc;
    }, []);
    setLabelSuggestions(filteredSuggestions);
  };
  
  // Function to handle changes in the Distributor search input
  const handleDistributorSearchChange = (e) => {
    const { value } = e.target;
    setDistributorSearchQuery(value);
    if (value.trim() === "") {
      setDistributorSuggestions([]);
      return;
    }
    const filteredSuggestions = infos.filter((info) =>
      info.Distributor.toLowerCase().includes(value.toLowerCase())
  );
  setDistributorSuggestions(filteredSuggestions);
};

// Function to handle changes in the isrc search input
  const handleIsrcSearchChange = (e) => {
    const { value } = e.target;
    setIsrcSearchQuery(value);
    if (value.trim() === "") {
      setIsrcSuggestions([]);
      return;
    }
    const filteredSuggestions = infos.filter((info) =>
      info.ISRC.toLowerCase().includes(value.toLowerCase())
    );
    setIsrcSuggestions(filteredSuggestions);
  };

// Function to handle changes in the Distributor search input
  const handleUpcSearchChange = (e) => {
      const { value } = e.target;
      setUpcSearchQuery(value);
      if (value.trim() === "") {
        setUpcSuggestions([]);
        return;
      }
      const filteredSuggestions = infos.filter((info) =>
        info.UPC.toLowerCase().includes(value.toLowerCase())
    );
    setUpcSuggestions(filteredSuggestions);
  };

  // Function to handle changes in the copr search input
  const handleCoprSearchChange = (e) => {
    const { value } = e.target;
    setCoprSearchQuery(value);
    if (value.trim() === "") {
      setCoprSuggestions([]);
      return;
    }
    const filteredSuggestions = infos.filter((info) =>
      info.CopR.toLowerCase().includes(value.toLowerCase())
    );
    setCoprSuggestions(filteredSuggestions);
  };

  // Function to handle changes in the pyaer search input
  const handlePyearSearchChange = (e) => {
    const { value } = e.target;
    setYearSearchQuery(value);
    if (value.trim() === "") {
      setYearSuggestions([]);
      return;
    }
    const filteredSuggestions = infos.filter((info) =>
      info.Year.includes(value)
    );
    setYearSuggestions(filteredSuggestions);
  };



// Function to select a suggestion from the autocomplete list
const handleTitleSuggestionClick = (AlbumTitle) => {
  setTitleSearchQuery("");
  setTitleSearchList([...titleSearchList, AlbumTitle]);
  setTitleSuggestions([]);
};

// Function to select a suggestion from the autocomplete list
const handleTrackTitleSuggestionClick = (TrackTitles) => {
  settrackTitleSearchQuery("");
  setTrackTitleSearchList([...trackTitleSearchList, TrackTitles]);
  setTrackTitleSuggestions([]);
};

const handleSingerSuggestionClick = (Singer) => {
  setSingerSearchQuery("");
  setSingerSearchList([...singerSearchList, Singer]);
  setSingerSuggestions([]);
};

const handleLyricistSuggestionClick = (Lyricist) => {
  setSingerSearchQuery("");
  setLyricistSearchList([...lyricistSearchList, Lyricist]);
  setLyricistSuggestions([]);
};

const handleComposerSuggestionClick = (Composers) => {
  setComposerSearchQuery("");
  setComposerSearchList([...composerSearchList, Composers]);
  setComposerSuggestions([]);
};

const handleLabelSuggestionClick = (Label) => {
  setLabelSearchQuery("");
  setLabelSearchList([...labelSearchList, Label]);
  setLabelSuggestions([]);
};

const handleDistributorSuggestionClick = (distributor) => {
  setDistributorSearchQuery("");
  setDistributorSearchList([...distributorSearchList, distributor]);
  setDistributorSuggestions([]);
};

const handleIsrcSuggestionClick = (isrc) => {
  setIsrcSearchQuery("");
  setIsrcSearchList([...isrcSearchList, isrc]);
  setIsrcSuggestions([]);
};

const handleUpcSuggestionClick = (isrc) => {
  setUpcSearchQuery("");
  setUpcSearchList([...isrcSearchList, isrc]);
  setUpcSuggestions([]);
};

const handleCoprSuggestionClick = (isrc) => {
  setCoprSearchQuery("");
  setCoprSearchList([...isrcSearchList, isrc]);
  setCoprSuggestions([]);
};

const handlePyearSuggestionClick = (isrc) => {
  setYearSearchQuery("");
  setYearSearchList([...isrcSearchList, isrc]);
  setYearSuggestions([]);
};


// Function to handle search
const handleSearch = () => {
  let filteredData = infos;

  if (titleSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      titleSearchList.some((AlbumTitle) =>
        info.AlbumTitle.toLowerCase().includes(AlbumTitle.toLowerCase())
      )
    );
  }

  if (trackTitleSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      trackTitleSearchList.some((TrackTitles) =>
        info.TrackTitles.toLowerCase().includes(TrackTitles.toLowerCase())
      )
    );
  }

  if (singerSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      singerSearchList.some((Singer) =>
        info.Singer.toLowerCase().includes(Singer.toLowerCase())
      )
    );
  }

  if (lyricistSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      lyricistSearchList.some((Lyricist) =>
        info.Lyricist.toLowerCase().includes(Lyricist.toLowerCase())
      )
    );
  }

  if (composerSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      composerSearchList.some((Composers) =>
        info.Composers.toLowerCase().includes(Composers.toLowerCase())
      )
    );
  }

  if (labelSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      labelSearchList.some((Label) =>
        info.Label.toLowerCase().includes(Label.toLowerCase())
      )
    );
  }

  if (distributorSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      distributorSearchList.some((dis) =>
        info.dis.toLowerCase().includes(dis.toLowerCase())
      )
    );
  }

  if (isrcSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      isrcSearchList.some((isrc) =>
        info.isrc.toLowerCase().includes(isrc.toLowerCase())
      )
    );
  }

  if (upcSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      upcSearchList.some((upc) =>
        info.upc.toLowerCase().includes(upc.toLowerCase())
      )
    );
  }

  if (coprSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      coprSearchList.some((copr) =>
        info.copr.toLowerCase().includes(copr.toLowerCase())
      )
    );
  }

  if (yearSearchList.length > 0) {
    filteredData = filteredData.filter((info) =>
      yearSearchList.some((year) =>
        info.year.toLowerCase().includes(year.toLowerCase())
      )
    );
  }

  setSearchResults(filteredData);
};


// Function to remove a search item from the list
const handleRemoveTitle = (index) => {
  const updatedTitleSearchList = [...titleSearchList];
  updatedTitleSearchList.splice(index, 1);
  setTitleSearchList(updatedTitleSearchList);
};

// Function to remove a search item from the list
const handleRemoveTrackTitle = (index) => {
  const updatedTrackTitleSearchList = [...trackTitleSearchList];
  updatedTrackTitleSearchList.splice(index, 1);
  setTrackTitleSearchList(updatedTrackTitleSearchList);
};

const handleRemoveSinger = (index) => {
  const updatedSingerSearchList = [...singerSearchList];
  updatedSingerSearchList.splice(index, 1);
  setSingerSearchList(updatedSingerSearchList);
};

const handleRemoveLyricist = (index) => {
  const updatedLyricistSearchList = [...lyricistSearchList];
  updatedLyricistSearchList.splice(index, 1);
  setLyricistSearchList(updatedLyricistSearchList);
};
  
const handleRemoveComposer = (index) => {
  const updatedComposerSearchList = [...composerSearchList];
  updatedComposerSearchList.splice(index, 1);
  setComposerSearchList(updatedComposerSearchList);
};

const handleRemoveLabel = (index) => {
  const updatedLabelSearchList = [...labelSearchList];
  updatedLabelSearchList.splice(index, 1);
  setLabelSearchList(updatedLabelSearchList);
};

const handleRemoveDistributor = (index) => {
  const updatedLabelSearchList = [...labelSearchList];
  updatedLabelSearchList.splice(index, 1);
  setLabelSearchList(updatedLabelSearchList);
};

const handleRemoveIsrc = (index) => {
  const updatedIsrcSearchList = [...labelSearchList];
  updatedIsrcSearchList.splice(index, 1);
  setIsrcSearchList(updatedIsrcSearchList);
};

const handleRemoveUpc = (index) => {
  const updatedUpcSearchList = [...upcSearchList];
  updatedUpcSearchList.splice(index, 1);
  setUpcSearchList(updatedUpcSearchList);
};

const handleRemoveCopr = (index) => {
  const updatedCoprSearchList = [...coprSearchList];
  updatedCoprSearchList.splice(index, 1);
  setCoprSearchList(updatedCoprSearchList);
};

const handleRemovePyear = (index) => {
  const updatedYearSearchList = [...coprSearchList];
  updatedYearSearchList.splice(index, 1);
  setYearSearchList(updatedYearSearchList);
};
  
 
  /*----handleSaveItem----*/
  const handleSaveItem = async (item) => {
    const data = {
      title: item.AlbumTitle,
      track:item.TrackTitles,
      composer: item.Composers,
      label: item.Label,
      lyricist: item.Lyricist,
      singer: item.Singer,
      pYear:item.Pyear,
      email: user?.email,
    }
    
    console.log(item.title);
    console.log(user?.email);
    if (user && user.email) {
      fetch(
        "https://pod-music-server.onrender.com/api/saved",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
      .then(res=>  res.json())
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
        })
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

 

  const handleDeleteItem = async(id)=>{
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
        fetch(`https://pod-music-server.onrender.com/api/music/${id}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(result =>{
          if(result.deletedCount >0){
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        }) 
        setSearchResults(prevItems => prevItems.filter(item => item._id !== id));
      }
    });
  }

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


  return (
    <div className="card max-w-screen-2xl mx-auto">
      <div className="grid lg:grid-cols-3 my-4 space-y-2 mt-12">
        {/* ---albam title--- */}
        <div className="relative">
          <input
            type="text"
            placeholder="Album Title"
            value={titleSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs mt-2"
            onChange={handleTitleSearchChange}
          />
          <div  className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {titleSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleTitleSuggestionClick(suggestion.AlbumTitle)}
              >
                {suggestion.AlbumTitle}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {titleSearchList.map((AlbumTitle, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {AlbumTitle}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveTitle(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* ---track title--- */}
        <div className="relative">
          <input
            type="text"
            placeholder="Track Title"
            value={trackTitleSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handleTrackTitleSearchChange}
          />
          <div  className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {trackTitleSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleTrackTitleSuggestionClick(suggestion.TrackTitles)}
              >
                {suggestion.TrackTitles}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {trackTitleSearchList.map((TrackTitle, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {TrackTitle}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveTrackTitle(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* ---bangla title------ */}
       <div className="relative">
          <input
            type="text"
            placeholder="Bangla Title"
            // value={singerQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            // onChange={(e) => setSingerQuery(e.target.value)}
            //onKeyPress={handleAddSinger}
          />
          {/* <div className="absolute top-0 right-0 mt-2 mr-2">
            {singerList.map((singer, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1"
              >
                {singer}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveSinger(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div> */}
        </div> 
        {/* ------singer------------ */}
        <div className="relative">
          <input
            type="text"
            placeholder="Singer"
            value={singerSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handleSingerSearchChange}
          />
          <div className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {singerSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleSingerSuggestionClick(suggestion.Singer)}
              >
                {suggestion.Singer}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {singerSearchList.map((singer, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {singer}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveSinger(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ----------Lyricist------------ */}
        <div className="relative">
          <input
            type="text"
            placeholder="Lyricist"
            value={lyricistSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handleLyricistSearchChange}
          />
          <div className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {lyricistSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleLyricistSuggestionClick(suggestion.Lyricist)}
              >
                {suggestion.Lyricist}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {lyricistSearchList.map((lyricist, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {lyricist}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveLyricist(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* ---------composer--------- */}
        <div className="relative">
          <input
            type="text"
            placeholder="Composer"
            value={composerSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handleComposerSearchChange}
          />
          <div className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {composerSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleComposerSuggestionClick(suggestion.Composers)}
              >
                {suggestion.Composers}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {composerSearchList.map((Composers, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {Composers}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveComposer(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -------label------ */}
        <div className="relative">
          <input
            type="text"
            placeholder="Label"
            value={labelSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handleLabelSearchChange}
          />
          <div className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {labelSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleLabelSuggestionClick(suggestion.Label)}
              >
                {suggestion.Label}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {labelSearchList.map((Label, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {Label}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveLabel(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* -----Distributor------ */}
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Distributor"
            value={distributorSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handleDistributorSearchChange}
          />
          <div className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {distributorSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleDistributorSuggestionClick(suggestion.distributor)}
              >
                {suggestion.distributor}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {distributorSearchList.map((distributor, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {distributor}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveDistributor(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div> */}
        {/* ------ISRC-------- */}
        <div className="relative">
          <input
            type="text"
            placeholder="ISRC"
            value={isrcSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handleIsrcSearchChange}
          />
          <div className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {isrcSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleIsrcSuggestionClick(suggestion.isrc)}
              >
                {suggestion.isrc}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {isrcSearchList.map((isrc, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {isrc}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveIsrc(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* ------UPC-------- */}
        <div className="relative">
          <input
            type="text"
            placeholder="UPC"
            value={upcSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handleUpcSearchChange}
          />
          <div className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {upcSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleUpcSuggestionClick(suggestion.upc)}
              >
                {suggestion.upc}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {upcSearchList.map((upc, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {upc}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveUpc(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* ------CopR---------- */}
        <div className="relative">
          <input
            type="text"
            placeholder="CopR"
            value={coprSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handleCoprSearchChange}
          />
          <div className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {coprSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleCoprSuggestionClick(suggestion.copr)}
              >
                {suggestion.copr}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {coprSearchList.map((copr, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {copr}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveCopr(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* --------P Year--------- */}
        <div className="relative">
          <input
            type="text"
            placeholder="P-Year"
            value={yearSearchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handlePyearSearchChange}
          />
          <div className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md max-h-80 overflow-y-auto">
            {yearSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handlePyearSuggestionClick(suggestion.year)}
              >
                {suggestion.year}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {yearSearchList.map((pyear, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {pyear}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemovePyear(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-neutral hover:bg-white hover:text-black btn-sm ml-20 w-80" onClick={handleSearch}>
          Search
        </button>
      </div>
     
  <table className="table">
    <thead className="sticky top-16 bg-white dark:bg-gray-900">
      <tr>
        <th ></th> {/* Adjust width for index column */}
        <th className="w-44">  Album Title  </th>
        <th >Track Titles</th>
        <th >Bangla Title</th>
        <th >Singer</th>
        <th >Lyricist</th>
        <th >Composer</th>
        <th >Label</th>
        <th >PUB</th>
        <th>UPC</th>
        <th >ISRC</th>
        <th >CopR</th>
        <th >Royalty</th>
        <th >P Year</th>
        <th >Date</th>
        <th >FB Date</th>
        <th >Remarks</th>
        <th >Link</th>
        <th ></th> {/* Adjust width for Save button column */}
      </tr>
    </thead>
    <tbody>
      {currentItems.map((info, index) => (
        <tr className="" key={index}>
          <td>{index + 1}</td>
          <td className="w-11 whitespace-nowrap">{info.AlbumTitle}</td>
          <td className="w-11 whitespace-nowrap">{info.TrackTitles}</td>
          <td>-</td>
          <td className="w-11 whitespace-nowrap">{info.Singer}</td>
          <td className="w-11 whitespace-nowrap">{info.Lyricist}</td>
          <td className="w-11 whitespace-nowrap">{info.Composers}</td>
          <td className="w-11 whitespace-nowrap">{info.Label}</td>
          <td className="w-11 whitespace-nowrap">{info.PUB}</td>
          <td className="w-11 whitespace-nowrap">{info.UPC}</td>
          <td className="w-11 whitespace-nowrap">{info.ISRC}</td>
          <td className="w-11 whitespace-nowrap">{info.CopRNo}</td>
          <td className="w-11 whitespace-nowrap">{info.Royalty}</td>
          <td className="w-11 whitespace-nowrap">{info.Pyear}</td>
          <td className="w-11 whitespace-nowrap">{info.Date}</td>
          <td className="w-11 whitespace-nowrap">{info.FBDate}</td>
          <td className="w-11 whitespace-nowrap">{info.Remarks}</td>
          {/* <td ><FaYoutube className="text-3xl text-red-600 cursor-pointer"/></td> */}
          <td >
            <button
              onClick={() => handleSaveItem(info)}
              className="btn btn-neutral hover:bg-white hover:text-black btn-sm"
            >
              Save
            </button>
          </td>
          {userRole === "admin" && (
            <td >
              <Link to={`/editPage/${info._id}`} className="btn btn-neutral hover:bg-white hover:text-black btn-sm">Edit</Link>
            </td>
          )}
          {userRole === "admin" && (
            <td >
              <button onClick={()=>handleDeleteItem(info._id)} className="btn btn-neutral hover:bg-white hover:text-black btn-sm">Delete</button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
    <div className="overflow-x-scroll max-w-screen-lg mx-auto">
</div>
  </table>
  <div className="flex justify-end space-x-4 mt-4">
  <select onChange={handleCnangeData} defaultValue={50} className="select select-bordered select-sm w-24 max-w-xs">
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <button
        className="btn btn-sm"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
       <FaArrowCircleLeft className="text-xl"/>
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        className="btn btn-sm"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
         <FaArrowCircleRight className="text-xl"/>
      </button>
    </div>
    </div>
  );
};

export default Card;