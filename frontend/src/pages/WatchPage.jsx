import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { formatReleaseDate } from "../utils/dateFunction"
import { ORIGINAL_IMG_BASE_URL} from "../utils/constants"
import { useContentStore } from "../store/content";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WatchPage = () => {
  const { id } = useParams();
  const { contentType } = useContentStore();
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const [trailers, setTrailers] = useState([]);
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/trailers`
        );
        setTrailers(response.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/similar`
        );
        setSimilarContent(response.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/details`
        );
        setContent(response.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };
  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };
  console.log(trailers);

  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <div className="mx-auto container px-4 py-8 h-full">
          <Navbar />
          {trailers.length > 0 && (
            <div className="flex justify-between items-center mb-4">
              <button
                className={`
                    bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                      currentTrailerIdx === 0
                        ? "opacity-50 cursor-not-allowed "
                        : ""
                    }}
                    `}
                disabled={currentTrailerIdx === 0}
                onClick={handlePrev}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className={`
                    bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                      currentTrailerIdx === trailers.length - 1
                        ? "opacity-50 cursor-not-allowed "
                        : ""
                    }}
                    `}
                disabled={currentTrailerIdx === trailers.length - 1}
                onClick={handleNext}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
          <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
            {trailers.length > 0 && (
              <ReactPlayer
                controls={true}
                height={"70vh"}
                width={"100%"}
                className="mx-auto overflow-hidden rounded-lg"
                url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
              />
            )}
            {trailers?.length === 0 && (
              <h2 className="text-xl text-center mt-5">
                No trailers available for{" "}
                <span className="font-bold text-red-600">
                  {content?.title || content?.name}
                </span>{" "}
                😥
              </h2>
            )}
          </div>
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto"
          >
            <div className="mb-4 md:mb-0">
              <h2 className="text-5xl font-bold text-balance">
                {content?.title || content?.name}
              </h2>

              <p className="mt-2 text-lg">
                {formatReleaseDate(
                  content?.release_date || content?.first_air_date
                )}{" "}
                |{" "}
                {content?.adult ? (
                  <span className="text-red-600">18+</span>
                ) : (
                  <span className="text-green-600">PG-13</span>
                )}{" "}
              </p>
              <p className="mt-4 text-lg">{content?.overview}</p>
            </div>
            <img
              src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
              alt="Poster image"
              className="max-h-[600px] rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchPage;
