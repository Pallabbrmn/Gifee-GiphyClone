import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const SearchGif = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchGIFs = async () => {
    if (query.trim() === "") {
      return;
    }

    navigate(`/search/${query}`);
    setQuery("");
  };

  return (
    <div className="flex relative mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className=" w-full rounded-tl-md rounded-bl-md text-black outline-none px-4 py-4 text-xl overflow-hidden"
        placeholder="Search for GIFs and Stickers..."
      />
      {query && (
        <button
          onClick={() => {
            setQuery("");
          }}
          className="absolute right-20 top-5"
        >
          <MdOutlineCancel size={25} className="text-black" />
        </button>
      )}
      <button
        onClick={searchGIFs}
        className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-3 rounded-tr-md rounded-br-md"
      >
        <FiSearch size={40} className="text-white" />
      </button>
    </div>
  );
};

export default SearchGif;
