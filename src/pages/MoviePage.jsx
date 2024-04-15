import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import { useParams } from "react-router-dom";
import Appcontext from "../context/Appcontext";
import { handleUpdateMovies } from "../utils/update_movies";
import movie_unknown from "../images/image_404.jpg";
const MoviePage = () => {
   const { id } = useParams();
   const [movieDetails, setMoviesDetails] = useState([]);
   const [alreadyExist, setAlreadyExist] = useState(false);
   const context = useContext(Appcontext);
   const [loading, setLoading] = useState(false);
   const { userEmail, userMovies, setUserMovies } = context;
   const addMovieToList = (movieData, userEmail) => {
      const movieToAdd = {
         Title: movieData?.Title,
         Year: movieData?.Year,
         imdbID: movieData?.imdbID,
         Poster: movieData?.Poster,
         addedBy: userEmail,
         is_complete: false,
      };
      const movieList = JSON.parse(localStorage.getItem("movie_list")) || [];
      const existingMovieIndex = movieList.findIndex((movie) => movie.imdbID === movieToAdd.imdbID);
      if (existingMovieIndex !== -1) {
      } else {
         const updatedMovieList = [...movieList, movieToAdd];
         setUserMovies(updatedMovieList);
         handleUpdateMovies(updatedMovieList);
      }
      setAlreadyExist(true);
   };

   useEffect(() => {
      const fetch_movie = async () => {
         setLoading(true);
         try {
            const res = await fetch(
               `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}&plot=full`
            );
            if (res.ok) {
               const data = await res.json();
               if(data?.Response === "True"){
                  setMoviesDetails(data);
                  if (userEmail) {
                     const userMovieIds = userMovies.map((movie) => movie.imdbID);
                     const isAlreadyExist = userMovieIds.includes(data?.imdbID);
                     setAlreadyExist(isAlreadyExist);
                  }
               }
            }
         } catch (err) {
            console.log("error in fetching movie", err);
         } finally {
            setLoading(false);
         }
      };
      if (id !== null) {
         fetch_movie();
      }
      // eslint-disable-next-line
   }, [id]);

   return (
      <PageLayout>
         <section className="w-full md:h-screen h-auto md:overflow-y-auto">
            {loading === true ? (
               <div className="w-full h-screen px-10 animate-pulse ease-in-out">
                  <div className="w-full h-[350px] rounded-lg bg-slate-200"></div>
                  <div className="w-full h-10 my-2 rounded-3xl bg-slate-200"></div>
                  <div className="w-1/2 h-10 my-2 rounded-lg bg-slate-200"></div>
                  <div className="w-1/4 h-10 my-2 rounded-lg bg-slate-200"></div>
                  <div className="w-full h-10 my-2 rounded-lg bg-slate-200"></div>
               </div>
            ) : (
               <>
                  <div className="w-full relative h-[350px]">
                     {movieDetails?.Poster === "N/A" ? (
                        <img
                           className="w-full  h-full object-cover"
                           src={movie_unknown}
                           alt="poster"
                        />
                     ) : (
                        <img
                           className="w-full  h-full object-cover"
                           src={movieDetails?.Poster}
                           alt="poster"
                        />
                     )}

                     {/* titrlke */}
                     <div className="absolute bottom-5 px-10 text-white font-bold md:text-[55px] text-xl flex items-start gap-3 z-20">
                        <div className="tracking-[1px] leading-tight"> {movieDetails?.Title}</div>
                        <div className="text-sm">({movieDetails?.Year})</div>
                     </div>
                     <div className="absolute bottom-5 right-0 px-10 text-white font-bold text-[55px] flex items-start gap-3 z-20">
                        {alreadyExist ? (
                           <button className="md:text-sm text-xs bg-green-500 text-white md:p-3 p-2 flex items-center gap-3 rounded-md">
                              {" "}
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 fill="#fff"
                                 className="bi bi-bookmark-plus-fill md:block hidden"
                                 viewBox="0 0 16 16"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z"
                                 />
                              </svg>
                              Already in List
                           </button>
                        ) : (
                           <button
                              onClick={() => {
                                 addMovieToList(movieDetails, userEmail);
                              }}
                              className="md:text-sm text-xs bg-red-500 text-white md:p-3 p-2 flex items-center gap-3 rounded-md"
                           >
                              {" "}
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 fill="#fff"
                                 className="bi bi-bookmark-plus-fill md:block hidden"
                                 viewBox="0 0 16 16"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z"
                                 />
                              </svg>
                              watch it
                           </button>
                        )}
                     </div>
                     <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-[#000000a3] to-[#0000]"></div>
                  </div>

                  {/* tags */}
                  <div className="md:px-10 px-5 md:grid md:grid-cols-3 grid-cols-2 w-full justify-items-center py-5">
                     <div>
                        <div className="font-bold text-slate-500">DIRECTOR</div>
                        <div>{movieDetails?.Director}</div>
                     </div>
                     <div>
                        <div className="font-bold text-slate-500">RELEASED</div>
                        <div>{movieDetails?.Released}</div>
                     </div>
                     <div>
                        <div className="font-bold text-slate-500">LANGUAGE</div>
                        <div>{movieDetails?.Language}</div>
                     </div>
                  </div>
                  <div className="md:px-10 px-5 md:py-5 pb-2">
                     <div className="font-bold text-slate-500">DESCRIPTION</div>
                     <div>{movieDetails?.Plot}</div>
                  </div>
                  <div className="md:px-10 px-5 md:py-2">
                     <div className="font-bold text-slate-500">ACTORS</div>
                     <div>{movieDetails?.Actors}</div>
                  </div>
                  <div className="md:px-10 px-5 md:py-2">
                     <div className="font-bold text-slate-500">IMDB RATING</div>
                     <div>{movieDetails?.imdbRating}</div>
                  </div>
               </>
            )}
         </section>
      </PageLayout>
   );
};

export default MoviePage;
