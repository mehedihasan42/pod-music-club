import React, {useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";

const Card = () => {

  const [infos, setInfos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

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
          <div className="absolute top-10 left-0 w-full bg-black text-white border border-gray-300 rounded-b-lg shadow-md">
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
        <button className="btn btn-neutral btn-sm w-80" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="">
         <table className="table w-full">   
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Bangla Title</th>
              <th>Singer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((info, index) => (
             
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{info.title}</td>
                <td>-</td>
                <td>{info.singer}</td>
                <td><FaYoutube className="text-3xl text-red-600 cursor-pointer"/></td>
              </tr>
            ))}
          </tbody>
          <div className="overflow-x-scroll max-w-80"></div>
        </table>
      </div>
    </>
  );
};

export default Card;
