import React, { useEffect } from "react";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif.jsx";
import FilterGif from "../components/FilterGif.jsx";

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrendingGifs = async () => {
    const { data } = await gf.trending({
      limit: 30,
      type: filter,
      rating: "g",
    });
    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);
  return (
    <div className="w-[90%] mx-auto">
      <div className="h-[80px] md:h-[120px] w-full banner flex items-center justify-center gap-6 bg-gradient-to-r from-cyan-400 to-orange-400 rounded">
        <h1 className="text-xl md:text-5xl font-semibold ">ALL THE</h1>
        <div>
          <img className="h-[70px] md:h-[120px]" src="/images/earth.gif" />
        </div>
        <h1 className="text-xl md:text-5xl font-semibold">GIFS HERE!</h1>
      </div>

      <FilterGif showTrending={true} />

      <div className="md:mt-4 columns-2  md:columns-3 lg:columns-4 xl:columns-5">
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif?.title} />;
        })}
      </div>
    </div>
  );
};

export default Home;
