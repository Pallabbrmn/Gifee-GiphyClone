import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/GifContext";
import FilterGif from "../components/FilterGif";
import Gif from "../components/Gif";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { gf, filter } = GifState();
  const { query } = useParams();

  // const fetchSearchResults = async () => {
  //   const { data } = await gf.search(query, {
  //     sort: "relevant",
  //     lang: "en",
  //     type: "filter",
  //     limit: 20,
  //   });

  //   setSearchResults(data);
  //   console.log(searchResults);
  // };
  // useEffect(() => {
  //   fetchSearchResults();
  // }, [filter]);

  useEffect(() => {
    const fetchGifs = async () => {
      // setLoading(true);
      // setError(null);

      try {
        const response = await fetch(
          `https://api.giphy.com/v1/${filter}/search?api_key=sQds5AAfWZyf6Z8G3pkw3p7I7XhQWWrO&q=${query}&limit=25&offset=0&rating=g&lang=en`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setSearchResults(data.data);
        console.log(searchResults);
      } catch (error) {
        console.log("Error");
      } finally {
        console.log("data loaded");
      }
    };

    fetchGifs();
  }, [filter, query]);

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-xl">Search results: {query}</h1>
      <FilterGif alignLeft={true} />

      {searchResults.length > 0 ? (
        <div className="colums-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => {
            return <Gif gif={gif} key={gif.id} />;
          })}
        </div>
      ) : (
        <span>No GIFs found!</span>
      )}
    </div>
  );
};

export default Search;
