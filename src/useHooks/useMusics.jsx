import { useEffect, useState } from 'react';

const useMusics = () => {
    const [musicData,setData] = useState([])
    useEffect(() => {
        fetch("https://pod-music-server.onrender.com/api/music")
          .then((res) => res.json())
          .then((data) => {
            setData(data)
          });
      }, []);
    return musicData;
};

export default useMusics;