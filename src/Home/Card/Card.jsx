import React, { useEffect, useState } from 'react';

const Card = () => {
    const [infos, setInfos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [singerQuery, setSingerQuery] = useState('');
    const [lyricistQuery, setLyricistQuery] = useState('');
    const [composerQuery, setComposerQuery] = useState('');
    const [labelQuery, setLabelQuery] = useState('');
    const [singerList, setSingerList] = useState([]); // To store entered singer names
    const [lyricistList, setlyricistList] = useState([]); // To store entered singer names
    const [composerList, setcomposerList] = useState([]); // To store entered singer names
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch("publicData.json")
            .then(res => res.json())
            .then(data => {
                setInfos(data);
                setSearchResults(data); 
            });
    }, []);

    const handleSearch = () => {
        const searchQueries = {
            title: searchQuery.toLowerCase().split(' '),
            singers: singerList.map(s => s.toLowerCase()), // Use the singerList for filtering
            lyricist: lyricistList.map(s => s.toLowerCase()), // Use the singerList for filtering
            // lyricist: lyricistQuery.toLowerCase().split(' '),
            composer: composerList.map(s => s.toLowerCase()),
            // composer: composerQuery.toLowerCase().split(' '),
            label: labelQuery.toLowerCase().split(' '),
        };

        const filteredData = infos.filter(info => {
            return (
                searchQueries.title.every(term => info.title.toLowerCase().includes(term)) &&
                (searchQueries.singers.length === 0 || searchQueries.singers.some(singer => info.singer.toLowerCase().includes(singer))) &&
                (searchQueries.lyricist.length === 0 || searchQueries.lyricist.some(lyricist => info.lyricist.toLowerCase().includes(lyricist))) &&
                (searchQueries.composer.length === 0 || searchQueries.composer.some(composer => info.composer.toLowerCase().includes(composer))) &&
                // searchQueries.lyricist.every(term => info.lyricist.toLowerCase().includes(term)) &&
                searchQueries.composer.every(term => info.composer.toLowerCase().includes(term)) &&
                searchQueries.label.every(term => info.label.toLowerCase().includes(term))
            );
        });

        setSearchResults(filteredData);
    };

    // Function to add singer name to the list when Enter or Space is pressed
    // -----------handle add function------------
    const handleAddSinger = (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && singerQuery.trim() !== '') {
            setSingerList([...singerList, singerQuery.trim()]);
            setSingerQuery(''); // Clear the input field after adding
        }
    };
    const handleAddLyricist = (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && lyricistQuery.trim() !== '') {
            setlyricistList([...lyricistList, lyricistQuery.trim()]);
            setLyricistQuery(''); // Clear the input field after adding
        }
    };
    const handleAddComposer = (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && composerQuery.trim() !== '') {
            setcomposerList([...composerList, composerQuery.trim()]);
            setComposerQuery(''); // Clear the input field after adding
        }
    };

    // Function to remove a singer name from the list
    // ----------handle remove function------------
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

    return (
        <>
            <div className='grid grid-cols-3 my-4 space-y-2'>
                <input
                    type="text"
                    placeholder="Search by Title"
                    value={searchQuery}
                    className="input input-bordered input-sm w-full max-w-xs"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* ------singer------------ */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by Singer"
                        value={singerQuery}
                        className="input input-bordered input-sm w-full max-w-xs"
                        onChange={(e) => setSingerQuery(e.target.value)}
                        onKeyPress={handleAddSinger}
                    />
                    <div className="absolute top-0 right-0 mt-2 mr-2">
                        {singerList.map((singer, index) => (
                            <div key={index} className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1">
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
                    placeholder="Search by Lyricist"
                    value={lyricistQuery}
                    className="input input-bordered input-sm w-full max-w-xs"
                    onChange={(e) => setLyricistQuery(e.target.value)}
                    onKeyPress={handleAddLyricist}
                />
                 <div className="absolute top-0 right-0 mt-2 mr-2">
                        {lyricistList.map((lyricist, index) => (
                            <div key={index} className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1">
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
                    placeholder="Search by Composer"
                    value={composerQuery}
                    className="input input-bordered input-sm w-full max-w-xs"
                    onChange={(e) => setComposerQuery(e.target.value)}
                    onKeyPress={handleAddComposer}
                />
                  <div className="absolute top-0 right-0 mt-2 mr-2">
                        {composerList.map((composer, index) => (
                            <div key={index} className="inline-block bg-gray-300 px-2 py-1 rounded-full mr-1">
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
                <input
                    type="text"
                    placeholder="Search by Label"
                    value={labelQuery}
                    className="input input-bordered input-sm w-full max-w-xs"
                    onChange={(e) => setLabelQuery(e.target.value)}
                />
                
                {/* Search button */}
                <button
                    className="btn btn-neutral btn-sm w-80"
                    onClick={handleSearch}
                >
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Card;




// import React, { useEffect, useState } from 'react';

// const Card = () => {
//     const [infos, setInfos] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [singerQuery, setSingerQuery] = useState('');
//     const [lyricistQuery, setLyricistQuery] = useState('');
//     const [composerQuery, setComposerQuery] = useState('');
//     const [labelQuery, setLabelQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         fetch("publicData.json")
//             .then(res => res.json())
//             .then(data => {
//                 setInfos(data);
//                 setSearchResults(data); 
//             });
//     }, []);

//     const handleSearch = () => {
       
//         const searchQueries = {
//             title: searchQuery.toLowerCase().split(' '),
//             singer: singerQuery.toLowerCase().split(' '),
//             lyricist: lyricistQuery.toLowerCase().split(' '),
//             composer: composerQuery.toLowerCase().split(' '),
//             label: labelQuery.toLowerCase().split(' '),
//         };

       
//         const filteredData = infos.filter(info => {
//             return (
//                 searchQueries.title.every(term => info.title.toLowerCase().includes(term)) &&
//                 searchQueries.singer.every(term => info.singer.toLowerCase().includes(term)) &&
//                 searchQueries.lyricist.every(term => info.lyricist.toLowerCase().includes(term)) &&
//                 searchQueries.composer.every(term => info.composer.toLowerCase().includes(term)) &&
//                 searchQueries.label.every(term => info.label.toLowerCase().includes(term))
//             );
//         });

//         setSearchResults(filteredData);
//     };

//     return (
//         <>
//             <div className='grid grid-cols-3 my-4 space-y-2'>
//                 <input
//                     type="text"
//                     placeholder="Search by Title"
//                     value={searchQuery}
//                     className="input input-bordered input-sm w-full max-w-xs"
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Search by Singer"
//                     value={singerQuery}
//                     className="input input-bordered input-sm w-full max-w-xs"
//                     onChange={(e) => setSingerQuery(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Search by Lyricist"
//                     value={lyricistQuery}
//                     className="input input-bordered input-sm w-full max-w-xs"
//                     onChange={(e) => setLyricistQuery(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Search by Composer"
//                     value={composerQuery}
//                     className="input input-bordered input-sm w-full max-w-xs"
//                     onChange={(e) => setComposerQuery(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Search by Label"
//                     value={labelQuery}
//                     className="input input-bordered input-sm w-full max-w-xs"
//                     onChange={(e) => setLabelQuery(e.target.value)}
//                 />
                
//                 {/* Search button */}
//                 <button
//                     className="btn btn-neutral btn-sm w-80"
//                     onClick={handleSearch}
//                 >
//                     Search
//                 </button>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Title</th>
//                             <th>singer</th>
//                             <th>lyricist</th>
//                             <th>composer</th>
//                             <th>label</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {searchResults.map((info, index) => (
//                             <tr key={index}>
//                                 <th>{index + 1}</th>
//                                 <td>{info.title}</td>
//                                 <td>{info.singer}</td>
//                                 <td>{info.lyricist}</td>
//                                 <td>{info.composer}</td>
//                                 <td>{info.label}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default Card;