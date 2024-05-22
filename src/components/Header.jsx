import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { GifState } from "../context/GifContext";
import SearchGif from "./SearchGif";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const { gf, filter, setFilter, favorites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav className="w-[90%] mx-auto">
      <div className="relative flex  justify-between items-center mb-2">
        <Link className="flex items-center gap-2" to="/">
          <img src="/public/images/gif.png" className="w-14" alt="" />
          <h1 className="text-5xl font-semibold tracking-tight">GIFEE</h1>
        </Link>

        {/* render categories */}
        <div className="flex justify-center items-center gap-4">
          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link
                key={category.name}
                className="px-2 py-1 text-2xl border-b-4 hover:gradient hover:rounded hidden lg:block"
                to={`/${category.name_encoded}`}
              >
                {category.name}
              </Link>
            );
          })}

          <button
            onClick={() => setShowCategories(!showCategories)}
            className={`px-2 py-1 text-3xl hover:gradient hover:rounded ${
              showCategories ? "gradient" : ""
            } hidden lg:block`}
          >
            <IoMdMore />
          </button>
          {favorites.length > 0 && (
            <div className=" text-xl px-3 py-1 cursor-pointer bg-gray-400 rounded flex justify-center items-center">
              <Link to="/favorites">Favorite Gifs</Link>
            </div>
          )}
          <button className="px-2 py-1 text-2xl hover:gradient block lg:hidden">
            <HiMenuAlt3 />
          </button>
        </div>
        {showCategories && (
          <div className="absolute right-0 top-16 px-10 py-6 w-full gradient z-20 rounded">
            <span>
              <h1 className="text-2xl py-2">Categories</h1>
            </span>
            <hr className="opacity-50" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-2">
              {categories?.map((category) => {
                return (
                  <Link
                    onClick={() => setShowCategories(!showCategories)}
                    key={category.name}
                    className="px-2 py-1 text-xl hover:gradient hover:rounded lg:block"
                    to={`/${category.name_encoded}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* searchbar */}
      <SearchGif />
    </nav>
  );
};

export default Header;
