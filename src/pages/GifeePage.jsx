import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GifState } from "../context/GifContext";
import { FaRegHeart } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { ImEmbed } from "react-icons/im";
import Gif from "../components/Gif";

const contentType = ["gifs", "stickers", "texts"];

const GifeePage = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);

  const { gf } = GifState();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 20,
    });
    setGif(data);
    console.log(gif);
    setRelatedGifs(related);
    console.log(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content type");
    }

    fetchGif();
  }, [type, slug, gif]);

  return (
    <div className="w-[90%] mx-auto">
      <div className="grid grid-cols-[1fr,2fr,1fr] gap-3 mt-6">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <div className="size-16 rounded overflow-hidden">
              <img
                className="object-contain w-full h-full"
                src={gif.user ? gif.user.avatar_url : "/public/images/gif.png"}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">
                {gif.user ? gif.user.display_name : "Gifee Production"}
              </h1>
              <h1 className="text-md font-medium opacity-75">
                @{gif.username}
              </h1>
            </div>
          </div>
          <div className="mt-6">
            <p className="opacity-70">
              {gif.alt_text
                ? gif.alt_text.split(" ").slice(0, 20).join(" ")
                : "This is a gifee production gif."}
              <span onClick={() => {}} className="font-bold cursor-pointer">
                {" "}
                Read more.
              </span>
            </p>
          </div>
          <div className="mt-4">
            <h1 className="font-semibold">Follow us on:</h1>
            <div className="flex gap-4 mt-4">
              <Link to={`https://facebook.com`}>
                <div className="size-7">
                  <img
                    className="w-full h-full object-cover"
                    src="/public/images/facebook.png"
                  />
                </div>
              </Link>
              <Link to={`https://instagram.com`}>
                <div className="size-7">
                  <img
                    className="w-full h-full object-cover"
                    src="/public/images/social.png"
                  />
                </div>
              </Link>
              <Link to={`https://tiktok.com`}>
                <div className="size-7">
                  <img
                    className="w-full h-full object-cover"
                    src="/public/images/tik-tok.png"
                  />
                </div>
              </Link>
              <Link to={`https://youtube.com`}>
                <div className="size-7">
                  <img
                    className="w-full h-full object-cover"
                    src="/public/images/youtube.png"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <img
            className="object-cover w-full h-full rounded"
            src={
              gif.images
                ? gif.images.original.url
                : "https://is2-ssl.mzstatic.com/image/thumb/Purple125/v4/3d/e3/4d/3de34d69-bb83-ebfd-e2d4-8a0c3f277aa1/source/512x512bb.jpg"
            }
          />
          <h1 className="text-lg font-medium">
            {gif.title ? gif.title : "Gifee"}
          </h1>
        </div>
        <div className="ml-6 mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <FaRegHeart className="cursor-pointer" size={25} />
            <h1 className="text-lg font-semibold">Favorite</h1>
          </div>
          <div className="flex items-center gap-4">
            <FaShareAlt className="cursor-pointer" size={25} />
            <h1 className="text-lg font-semibold">Share</h1>
          </div>
          <div className="flex items-center gap-4">
            <ImEmbed className="cursor-pointer" size={25} />
            <h1 className="text-lg font-semibold">Embed</h1>
          </div>
        </div>
      </div>

      <div className="xl:w-[50%] mx-auto mt-10">
        <h1 className="text-3xl opacity-70 font-semibold">Realted Gifs:</h1>
        <div className=" columns-2">
          {relatedGifs.slice(1)?.map((gif) => {
            return <Gif gif={gif} key={gif.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default GifeePage;
