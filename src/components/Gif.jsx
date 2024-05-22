import { Link } from "react-router-dom";

const Gif = ({ gif, hover = true }) => {
  return (
    <Link to={`/${gif.type}s/${gif.slug}`}>
      <div className="w-full mb-4 cursor-pointer relative rounded group aspect-video">
        <img
          className="w-full object-cover rounded transition-all duration-300"
          src={gif?.images?.fixed_height.url}
          alt={gif.title}
        />
        {hover && (
          <div className="flex items-end p-2 gap-2 absolute inset-0 rounded opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-black ">
            <img src={gif?.user?.avatar_url} className="h-8 rounded" />
            <span>{gif?.user?.display_name}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Gif;
