import React, { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  useEffect(() => {
    const getContent = async () => {
      const response = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(response.data.content);
    };
    getContent();
  }, [contentType, category]);
  console.log(content);
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movies" : "Tv Shows";
  return (
    <div className="bg-black text-white relative px-5 md:px-20">
      <h2 className="mb-4 text-2xl font-bold">{formattedCategoryName + " " + formattedContentType}</h2>
      <div className="flex space-x-4 overflow-x-scroll">
        {content?.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt="Movie/Tv Show Image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              ></img>
            </div>
            <p className="mt-2 text-center">{item?.title || item?.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
