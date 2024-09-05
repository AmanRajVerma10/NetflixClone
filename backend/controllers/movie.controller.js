import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req,res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
    return res.status(200).json({ status: true, content: randomMovie });
  } catch (error) {
    console.log("Error in controller", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

export const getMovieTrailers=async(req,res)=>{
    const {id}=req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        return res.status(200).json({success:true,trailers:data.results})
    } catch (error) {
        if(error.message.includes('404')){
            return res.status(404).send(null);
        }
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }
}