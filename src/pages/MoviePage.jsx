/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import { useParams } from "react-router-dom";
import Appcontext from "../context/Appcontext";
import { handleUpdateMovies } from "../utils/update_movies";

const MoviePage = () => {
   const { id } = useParams();
   const [movieDetails, setMoviesDetails] = useState([]);
   const [alreadyExist, setAlreadyExist] = useState(false);
   const context = useContext(Appcontext);
   const { userEmail, userMovies, setUserMovies } = context;
   const addMovieToList = (movieData, userEmail) => {
      const movieToAdd = {
        Director: movieData?.Director,
        Title: movieData?.Title,
        Year: movieData?.Year,
        imdbID: movieData?.imdbID,
        Poster: movieData?.Poster,
        Released: movieData?.Released,
        Language: movieData?.Language,
        Actors: movieData?.Actors,
        Plot: movieData?.Plot,
        imdbRating: movieData?.imdbRating,
        addedBy: userEmail,
        is_complete : false,
      };
      const movieList = JSON.parse(localStorage.getItem('movie_list')) || [];
      const existingMovieIndex = movieList.findIndex(movie => movie.imdbID === movieToAdd.imdbID);
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
         try {
            // const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=tt1433184&plot=full`);
            // if(res.ok){
            //       const data = await res.json();
            //       setMoviesDetails(data);
            // }
            setMoviesDetails({
               Title: "Spiderman and Grandma",
               Year: "2009",
               Rated: "N/A",
               Released: "01 Jan 2009",
               Runtime: "8 min",
               Genre: "Short",
               Director: "Lara Izagirre",
               Writer: "Lara Izagirre",
               Actors: "Michael De Nola, Jeremy Fernandez, Cassandra Kassell",
               Plot: "Elisa discovers that her grandson John is in love. But John will discover that he's not the only one in love in the house as his grandma dreams about George, one of their neighbors.",
               Language: "English",
               Country: "United States",
               Awards: "N/A",
               Poster:
                  "https://m.media-amazon.com/images/M/MV5BMjE3Mzg0MjAxMl5BMl5BanBnXkFtZTcwNjIyODg5Mg@@._V1_SX300.jpg",
               Ratings: [
                  {
                     Source: "Internet Movie Database",
                     Value: "5.9/10",
                  },
               ],
               Metascore: "N/A",
               imdbRating: "5.9",
               imdbVotes: "23",
               imdbID: "tt1433184",
               Type: "movie",
               DVD: "N/A",
               BoxOffice: "N/A",
               Production: "N/A",
               Website: "N/A",
               Response: "True",
            });
            if (userEmail) {
               const userMovieIds = userMovies.map((movie) => movie.imdbID);
               const isAlreadyExist = userMovieIds.includes(movieDetails?.imdbID);
               setAlreadyExist(isAlreadyExist);
            }
         } catch (err) {
            console.log("error in fetching movie", err);
         }
      };
      // if (id !== null  && (movieDetails).length === 0) {
         fetch_movie();
      // }
   }, [id]);

//    console.log(alreadyExist);
   return (
      <PageLayout>
         <section className="w-full h-screen overflow-y-auto">
            <div className="w-full relative h-[350px]">
               <img
                  className="w-full  h-full object-cover"
                  src={movieDetails?.Poster}
                  alt="poster"
               />
               {/* titrlke */}
               <div className="absolute bottom-5 px-10 text-white font-bold text-[55px] flex items-start gap-3 z-20">
                  <div> {movieDetails?.Title}</div>
                  <div className="text-sm">({movieDetails?.Year})</div>
               </div>
               <div className="absolute bottom-5 right-0 px-10 text-white font-bold text-[55px] flex items-start gap-3 z-20">
                  {alreadyExist ? (
                     <button className="text-sm bg-green-500 text-white p-3 flex items-center gap-3 rounded-md">
                        {" "}
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="20"
                           height="20"
                           fill="#fff"
                           class="bi bi-bookmark-plus-fill"
                           viewBox="0 0 16 16"
                        >
                           <path
                              fill-rule="evenodd"
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
                        className="text-sm bg-red-500 text-white p-3 flex items-center gap-3 rounded-md"
                     >
                        {" "}
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="20"
                           height="20"
                           fill="#fff"
                           class="bi bi-bookmark-plus-fill"
                           viewBox="0 0 16 16"
                        >
                           <path
                              fill-rule="evenodd"
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
            <div className="px-10 grid grid-cols-3 w-full justify-items-center py-5">
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
            <div className="px-10 py-5 pb-2">
               <div className="font-bold text-slate-500">DESCRIPTION</div>
               <div>{movieDetails?.Plot}</div>
            </div>
            <div className="px-10 py-2">
               <div className="font-bold text-slate-500">ACTORS</div>
               <div>{movieDetails?.Actors}</div>
            </div>
            <div className="px-10 py-2">
               <div className="font-bold text-slate-500">IMDB RATING</div>
               <div>{movieDetails?.imdbRating}</div>
            </div>
         </section>
      </PageLayout>
   );
};

export default MoviePage;
