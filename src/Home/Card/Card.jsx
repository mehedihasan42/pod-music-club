import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../useHooks/useCart";

const Card = () => {
  const { user } = useContext(AuthContext);
  const [refetch] = useCart()
  const navigate = useNavigate();
  const location = useLocation();

  const [infos, setInfos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [singerQuery, setSingerQuery] = useState("");
  const [lyricistQuery, setLyricistQuery] = useState("");
  const [composerQuery, setComposerQuery] = useState("");
  const [labelQuery, setLabelQuery] = useState("");
  const [distributorQuery, setDistributorQuery] = useState("");
  const [upcQuery, setUpcQuery] = useState("");
const [isrcQuery, setIsrcQuery] = useState('');
const [coprQuery, setCoprQuery] = useState('');
const [pyearQuery, setPyearQuery] = useState('');
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

  useEffect(() => {
    /*https://pod-music-server-side-j63axr6rr-mehedihasan42.vercel.app/music*/
    fetch("http://localhost:5000/music")
      .then((res) => res.json())
      .then((data) => {
        setInfos(data);
        setSearchResults(data);
      });
  }, []);

  /*handle Search*/
  const handleSearch = () => {
    const searchQueries = {
      title: searchList.map((s) => s.toLowerCase()),
      singers: singerList.map((s) => s.toLowerCase()), // Use the singerList for filtering
      lyricist: lyricistList.map((s) => s.toLowerCase()),
      composer: composerList.map((s) => s.toLowerCase()),
      label: labelList.map((s) => s.toLowerCase()),
      distributor: distributorList.map((s) => s.toLowerCase()),
      isrc: isrcList.map((s) => s.toLowerCase()),
      upc: upcList.map((s)=> s.toLowerCase()),
      copr: coprList.map((s) => s.toLowerCase()),
      pyear: pyearList.map((s) => s.toLowerCase()),
    };

    /*------filter-----------*/
    const filteredData = infos.filter((info) => {
      return (
        // searchQueries.title.every(term => info.title.toLowerCase().includes(term)) &&
        (searchQueries.title.length === 0 ||
          searchQueries.title.some((title) =>
            info.title.toLowerCase().includes(title)
          )) &&
        (searchQueries.singers.length === 0 ||
          searchQueries.singers.some((singer) =>
            info.singer.toLowerCase().includes(singer)
          )) &&
        (searchQueries.lyricist.length === 0 ||
          searchQueries.lyricist.some((lyricist) =>
            info.lyricist.toLowerCase().includes(lyricist)
          )) &&
        (searchQueries.composer.length === 0 ||
          searchQueries.composer.some((composer) =>
            info.composer.toLowerCase().includes(composer)
          )) &&
        (searchQueries.label.length === 0 ||
          searchQueries.label.some((label) =>
            info.label.toLowerCase().includes(label)
          )) &&
        (searchQueries.distributor.length === 0 ||
          searchQueries.distributor.some((distributor) =>
            info.Distributor.toLowerCase().includes(distributor)
          )) &&
          (searchQueries.isrc.length === 0 || searchQueries.isrc.some(isrc => info.ISRC.toLowerCase().includes(isrc))) &&
          (searchQueries.upc.length === 0 || searchQueries.upc.some(upc => info.UPC.toLowerCase().includes(upc))) &&
(searchQueries.copr.length === 0 || searchQueries.copr.some(copr => info.CopR.toLowerCase().includes(copr))) &&
(searchQueries.pyear.length === 0 || searchQueries.pyear.some(pyear => info.pYear.toLowerCase().includes(pyear)))
      );
    });

    setSearchResults(filteredData);
  };

  // Function to add singer name to the list when Enter or Space is pressed
  // -----------handle add function------------
  const handleAddTitle = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setSearchList([...searchList, searchQuery.trim()]);
      setSearchQuery(""); // Clear the input field after adding
    }
  };
  const handleAddSinger = (e) => {
    if (e.key === "Enter" && singerQuery.trim() !== "") {
      setSingerList([...singerList, singerQuery.trim()]);
      setSingerQuery(""); // Clear the input field after adding
    }
  };
  const handleAddLyricist = (e) => {
    if (e.key === "Enter" && lyricistQuery.trim() !== "") {
      setlyricistList([...lyricistList, lyricistQuery.trim()]);
      setLyricistQuery(""); // Clear the input field after adding
    }
  };
  const handleAddComposer = (e) => {
    if (e.key === "Enter" && composerQuery.trim() !== "") {
      setcomposerList([...composerList, composerQuery.trim()]);
      setComposerQuery("");
    }
  };
  const handleAddLabel = (e) => {
    if (e.key === "Enter" && labelQuery.trim() !== "") {
      setlabelList([...labelList, labelQuery.trim()]);
      setLabelQuery("");
    }
  };
  const handleAddDistributor = (e) => {
    if (e.key === "Enter" && distributorQuery.trim() !== "") {
      setDistributorlList([...distributorList, distributorQuery.trim()]);
      setDistributorQuery("");
    }
  };
  const handleAddIsrc = (e) => {
    if (e.key === "Enter" && isrcQuery.trim() !== "") {
      setIsrcList([...isrcList, isrcQuery.trim()]);
      setIsrcQuery("");
    }
  };
  const handleAddUpc = (e) => {
    if (e.key === "Enter" && upcQuery.trim() !== "") {
      setUpcList([...upcList, upcQuery.trim()]);
      setUpcQuery("");
    }
  };
  const handleAddCopr = (e) => {
    if (e.key === "Enter" && coprQuery.trim() !== "") {
      setCoprList([...coprList, coprQuery.trim()]);
      setCoprQuery("");
    }
  };
  const handleAddPyear = (e) => {
    if (e.key === "Enter" && pyearQuery.trim() !== "") {
      setPyearList([...pyearList, pyearQuery.trim()]);
      setPyearQuery("");
    }
  };

  // Function to remove a singer name from the list
  // ----------handle remove function------------
  const handleRemoveTitle = (index) => {
    const updatedSearchList = [...searchList];
    updatedSearchList.splice(index, 1);
    setSearchList(updatedSearchList);
  };
  const handleRemoveSinger = (index) => {
    const updatedSingerList = [...singerList];
    updatedSingerList.splice(index, 1);
    setSingerList(updatedSingerList);
  };
  const handleRemoveLyricist = (index) => {
    const updatedLyricistList = [...lyricistList];
    updatedLyricistList.splice(index, 1);
    setlyricistList(updatedLyricistList);
  };
  const handleRemoveComposer = (index) => {
    const updatedComposerList = [...composerList];
    updatedComposerList.splice(index, 1);
    setcomposerList(updatedComposerList);
  };
  const handleRemoveLabel = (index) => {
    const updatedLabelList = [...composerList];
    updatedLabelList.splice(index, 1);
    setlabelList(updatedLabelList);
  };
  const handleRemovedistributor = (index) => {
    const updatedDistributorlList = [...distributorList];
    updatedDistributorlList.splice(index, 1);
    setDistributorlList(updatedDistributorlList);
  };
  const handleRemoveIsrc = (index) => {
    const updatedIsrclList = [...isrcList];
    updatedIsrclList.splice(index, 1);
    setIsrcList(updatedIsrclList);
  };
  const handleRemoveUpc = (index) => {
    const updatedUpcList = [...upcList];
    updatedUpcList.splice(index, 1);
    setUpcList(updatedUpcList);
  };
  const handleRemoveCopr = (index) => {
    const updatedCoprList = [...upcList];
    updatedCoprList.splice(index, 1);
    setCoprList(updatedCoprList);
  };
  const handleRemovePyear = (index) => {
    const updatedPyearList = [...pyearList];
    updatedPyearList.splice(index, 1);
    setPyearList(updatedPyearList);
  };

  /*----handleSaveItem----*/
  const handleSaveItem = (item) => {
    console.log(item.title);
    console.log(user?.email);
    if (user && user.email) {
      const data = {
        title: item.title,
        composer: item.composer,
        label: item.label,
        lyricist: item.lyricist,
        singer: item.singer,
        email: user?.email,
      };
      fetch(
        "http://localhost:5000/saved",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch()
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
        title: "Are you sure?",
        text: "You won't be able to revert this!",
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
        <div className="relative">
          <input
            type="text"
            placeholder="Title"
            value={searchQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleAddTitle}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            {searchList.map((title, index) => (
              <div
                key={index}
                className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1"
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
        {/* ------singer------------ */}
        <div className="relative">
          <input
            type="text"
            placeholder="Singer"
            value={singerQuery}
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => setSingerQuery(e.target.value)}
            onKeyPress={handleAddSinger}
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
            onKeyPress={handleAddLyricist}
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
            onKeyPress={handleAddComposer}
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
            onKeyPress={handleAddLabel}
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
            onKeyPress={handleAddDistributor}
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
            onKeyPress={handleAddIsrc}
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
            onKeyPress={handleAddUpc}
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
            onKeyPress={handleAddCopr}
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
            onKeyPress={handleAddPyear}
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
        {/* Search button */}
        <button className="btn btn-neutral btn-sm w-80" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
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
            {searchResults.map((info, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{info.title}</td>
                <td>{info.singer}</td>
                <td>{info.lyricist}</td>
                <td>{info.composer}</td>
                <td>{info.label}</td>
                <td>{info.Distributor}</td>
                <td>{info.ISRC}</td>
                <td>{info.UPC}</td>
                <td>{info.CopR}</td>
                <td>{info.pYear}</td>
                <td>
                  <button
                    onClick={() => handleSaveItem(info)}
                    className="btn btn-neutral btn-sm"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Card;
