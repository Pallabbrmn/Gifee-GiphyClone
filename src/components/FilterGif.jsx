import React from "react";
import { GifState } from "../context/GifContext";
import { IoMdTrendingUp } from "react-icons/io";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

const FilterGif = ({ alignLeft = false, showTrending = false }) => {
  const { filter, setFilter } = GifState();
  return (
    <div
      className={`mt-2 mb-4 md:mt-4 flex ${alignLeft ? "" : "justify-end"} ${
        showTrending
          ? "justify-between gap-2 flex-col sm:flex-row sm:items-center"
          : ""
      }`}
    >
      {showTrending && (
        <span className="flex items-center gap-2">
          {showTrending && (
            <IoMdTrendingUp size={30} className="text-teal-500" />
          )}
          <h1 className="text-xl font-semibold">Trending</h1>
        </span>
      )}
      <div className="flex min-w-80 rounded-full bg-gray-800">
        {filters.map((f) => {
          return (
            <div
              className={`${
                filter === f.value ? f.background : ""
              } font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer `}
              onClick={() => {
                setFilter(f.value);
              }}
              key={f.title}
            >
              {f.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGif;
