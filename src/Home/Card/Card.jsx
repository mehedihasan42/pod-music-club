import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../useHooks/useCart";
import { FaYoutube } from "react-icons/fa";

const Card = () => {
  const { user } = useContext(AuthContext);
  const [refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(user?.email)

  const [infos, setInfos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [singerQuery, setSingerQuery] = useState("");
  const [lyricistQuery, setLyricistQuery] = useState("");
  const [composerQuery, setComposerQuery] = useState("");
  const [labelQuery, setLabelQuery] = useState("");
  const [distributorQuery, setDistributorQuery] = useState("");
  const [upcQuery, setUpcQuery] = useState("");
  const [isrcQuery, setIsrcQuery] = useState("");
  const [coprQuery, setCoprQuery] = useState("");
  const [pyearQuery, setPyearQuery] = useState("");
  const [searchList, setSearchList] = useState([]); // To store entered singer names
  const [singerList, setSingerList] = useState([]); // To store entered singer names
  const [lyricistList, setlyricistList] = useState([]); // To store entered singer names
  const [composerList, setcomposerList] = useState([]); // To store entered singer names
  const [labelList, setlabelList] = useState([]); // To store entered singer names
  const [distributorList, setDistributorlList] = useState([]);
  const [isrcList, setIsrcList] = useState([]);
  const [upcList, setUpcList] = useState([]);
  const [coprList, setCoprList] = useState([]);
  const [pyearList, setPyearList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("https://pod-music-server.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => {
        const currentUser = data.find((userData) => userData.email === user?.email);
        if (currentUser) {
          setUserRole(currentUser.role);
        }
      });
  }, [user]);

  useEffect(() => {
    fetch("https://pod-music-server.onrender.com/api/music")
      .then((res) => res.json())
      .then((data) => {
        setInfos(data);
        setSearchResults(data);
      });
  }, []);

  
 // Function to handle changes in the search input
 const handleSearchChange = (e) => {
  const { value } = e.target;
  setSearchQuery(value);
  if (value.trim() === "") {
    setSuggestions([]);
    return;
  }
  const filteredSuggestions = infos.filter((info) =>
    info.title.toLowerCase().includes(value.toLowerCase())
  );
  setSuggestions(filteredSuggestions);
};

// Function to select a suggestion from the autocomplete list
const handleSuggestionClick = (title) => {
setSearchQuery(title);
setSearchList([...searchList, title]);
setSuggestions([]); 
setSearchQuery("");
handleSearch();
};


// Function to handle search
const handleSearch = () => {
if (searchList.length === 0) {
  setSearchResults(infos); // Display all results if search list is empty
} else {
  const searchQueries = {
    title: searchList.map((s) => s.toLowerCase()),
  };

  const filteredData = infos.filter((info) =>
    searchQueries.title.some((title) =>
      info.title.toLowerCase().includes(title)
    )
  );
  setSearchResults(filteredData);
}
};


// Function to remove a search item from the list
const handleRemoveTitle = (index) => {
  const updatedSearchList = [...searchList];
  updatedSearchList.splice(index, 1);
  setSearchList(updatedSearchList);
};

  


  
 
  /*----handleSaveItem----*/
  const handleSaveItem = async (item) => {
    const data = {
      title: item.title,
      composer: item.composer,
      label: item.label,
      lyricist: item.lyricist,
      singer: item.singer,
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

  return (
    <>
      <div className="grid lg:grid-cols-3 my-4 space-y-2">
        {/* ---title--- */}
      <div className="relative">
          <input
            type="text"
            placeholder="Title"
            value={searchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={handleSearchChange}
          />
          <div className="absolute top-10 z-10 left-0 w-full bg-base-300 text-black rounded-b-lg shadow-md">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion.title)}
              >
                {suggestion.title}
              </div>
            ))}
          </div>
          <div className="top-0 right-0 m-0">
            {searchList.map((title, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 mt-1 mr-1"
              >
                {title}
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
        {/* ---bangla title------ */}
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Bangla Title"
            value={singerQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setSingerQuery(e.target.value)}
            //onKeyPress={handleAddSinger}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
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
          </div>
        </div> */}
        {/* ------singer------------ */}
        <div className="relative">
          <input
            type="text"
            placeholder="Singer"
            value={singerQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setSingerQuery(e.target.value)}
            //onKeyPress={handleAddSinger}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
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
          </div>
        </div>
        {/* ----------Lyricist------------ */}
        <div className="relative">
          <input
            type="text"
            placeholder="Lyricist"
            value={lyricistQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setLyricistQuery(e.target.value)}
            //onKeyPress={handleAddLyricist}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            {lyricistList.map((lyricist, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1"
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
            value={composerQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setComposerQuery(e.target.value)}
            //onKeyPress={handleAddComposer}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            {composerList.map((composer, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1"
              >
                {composer}
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
            value={labelQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setLabelQuery(e.target.value)}
            //onKeyPress={handleAddLabel}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            {labelList.map((label, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1"
              >
                {label}
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
        <div className="relative">
          <input
            type="text"
            placeholder="Distributor"
            value={distributorQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setDistributorQuery(e.target.value)}
            //onKeyPress={handleAddDistributor}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            {distributorList.map((distributor, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1"
              >
                {distributor}
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemovedistributor(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* ------ISRC-------- */}
        <div className="relative">
          <input
            type="text"
            placeholder="ISRC"
            value={isrcQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setIsrcQuery(e.target.value)}
            //onKeyPress={handleAddIsrc}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            {isrcList.map((isrc, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1"
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
            value={upcQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setUpcQuery(e.target.value)}
            //onKeyPress={handleAddUpc}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            {upcList.map((upc, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1"
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
            value={coprQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setCoprQuery(e.target.value)}
            //onKeyPress={handleAddCopr}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            {coprList.map((copr, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1"
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
            placeholder="P Year"
            value={pyearQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setPyearQuery(e.target.value)}
            //onKeyPress={handleAddPyear}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            {pyearList.map((pyear, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1"
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
        <button className="btn btn-neutral btn-sm w-80" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* <div className=""> */}
     
  <table className="table w-full">
    <thead>
      <tr>
        <th className="w-8"></th> {/* Adjust width for index column */}
        <th className="w-24">Title</th>
        <th className="w-24">Bangla Title</th>
        <th className="w-24">Singer</th>
        <th className="w-24">Lyricist</th>
        <th className="w-24">Composer</th>
        <th className="w-24">Label</th>
        <th className="w-24">Distributor</th>
        <th className="w-24">ISRC</th>
        <th className="w-24">UPC</th>
        <th className="w-24">CopR</th>
        <th className="w-24">P Year</th>
        <th className="w-24">Link</th>
        <th className="w-24"></th> {/* Adjust width for Save button column */}
        {userRole === "admin" && <th className="w-24"></th>} {/* Adjust width for Edit button column */}
      </tr>
    </thead>
    <tbody>
      {searchResults.map((info, index) => (
        <tr key={index}>
          <td className="w-8">{index + 1}</td>
          <td className="w-24">{info.title}</td>
          <td className="w-24">-</td>
          <td className="w-24">{info.singer}</td>
          <td className="w-24">{info.lyricist}</td>
          <td className="w-24">{info.composer}</td>
          <td className="w-24">{info.label}</td>
          <td className="w-24">{info.Distributor}</td>
          <td className="max-w-96 mx-0 px-0">{info.ISRC}</td>
          <td className="max-w-96 mx-0 px-0">{info.UPC}</td>
          <td className="w-24">{info.CopR}</td>
          <td className="w-24">{info.Year}</td>
          <td className="w-24"><FaYoutube className="text-3xl text-red-600 cursor-pointer"/></td>
          <td className="w-24">
            <button
              onClick={() => handleSaveItem(info)}
              className="btn btn-neutral btn-sm"
            >
              Save
            </button>
          </td>
          {userRole === "admin" && (
            <td className="w-24">
              <button className="btn btn-neutral btn-sm">Edit</button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
    <div className="overflow-x-scroll max-w-screen-lg mx-auto">
</div>
  </table>

      {/* </div> */}
    </>
  );
};

export default Card;
