/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import { Alert, Box, Skeleton, Snackbar } from "@mui/material";
import BG_UNKNOWN from "../images/image_404.jpg";
import Appcontext from "../context/Appcontext";
import { useLocation, useNavigate } from "react-router-dom";
import { handleUpdateMovies } from "../utils/update_movies";
export const MoviesCard = ({ data }) => {
   const navigate = useNavigate();
   const location = useLocation();
   const { pathname } = location;
   const context = useContext(Appcontext);
   const { userEmail, userMovies, setUserMovies } = context;
   const [alreadyExist, setAlreadyExist] = useState(false);
   useEffect(() => {
      if (userEmail) {
         const userMovieIds = userMovies.map((movie) => movie.imdbID);
         const isAlreadyExist = userMovieIds.includes(data?.imdbID);
         setAlreadyExist(isAlreadyExist);
      }
   }, [userEmail]);

   // Function to get updated movie list (mock implementation)
   const handle_delete = (imdbIDToDelete) => {
      const updatedMovieList = userMovies.filter((movie) => movie.imdbID !== imdbIDToDelete);
      setUserMovies(updatedMovieList);
      handleUpdateMovies(updatedMovieList);
   };

   const handle_complete = (imdbID, isComplete) => {
      const movieList = userMovies;
      const movieIndex = movieList.findIndex((movie) => movie.imdbID === imdbID);
      if (movieIndex !== -1) {
         const updatedMovieList = movieList.map((movie, index) => {
            if (index === movieIndex) {
               return { ...movie, is_complete: isComplete };
            }
            return movie;
         });
         setUserMovies(updatedMovieList);
         handleUpdateMovies(updatedMovieList);
      }
   };

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

   return (
      <div className="w-[230px] relative cursor-pointer h-[350px] rounded-md shadow-md border">
         {data?.Poster === "N/A" ? (
            <img
               onClick={() => {
                  navigate(`/movie/${data?.imdbID}`);
               }}
               src={BG_UNKNOWN}
               className="w-full object-cover h-[250px]"
               alt="poster_image"
            />
         ) : (
            <img
               onClick={() => {
                  navigate(`/movie/${data?.imdbID}`);
               }}
               src={data?.Poster}
               className="w-full object-cover h-[250px] rounded-md"
               alt="poster_image"
            />
         )}
         {pathname !== "/watchlist" ? (
            <div className="absolute top-0 -left-1">
               {alreadyExist ? (
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="30"
                     height="30"
                     fill="#05A57E"
                     class="bi bi-bookmark-check-fill"
                     viewBox="0 0 16 16"
                  >
                     <path
                        fill-rule="evenodd"
                        d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"
                     />
                  </svg>
               ) : (
                  <svg
                     onClick={() => {
                        addMovieToList(data, userEmail);
                     }}
                     xmlns="http://www.w3.org/2000/svg"
                     width="30"
                     height="30"
                     fill="#595c5a"
                     class="bi bi-bookmark-plus-fill"
                     viewBox="0 0 16 16"
                  >
                     <path
                        fill-rule="evenodd"
                        d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z"
                     />
                  </svg>
               )}
            </div>
         ) : (
            <div className="absolute top-1 left-1">
               {!data?.is_complete ? (
                  <svg
                     onClick={() => {
                        handle_complete(data?.imdbID, true);
                     }}
                     xmlns="http://www.w3.org/2000/svg"
                     width="30"
                     height="30"
                     fill="#fff"
                     class="bi bi-check-square"
                     viewBox="0 0 16 16"
                  >
                     <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                     <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                  </svg>
               ) : (
                  <svg
                     onClick={() => {
                        handle_complete(data?.imdbID, false);
                     }}
                     xmlns="http://www.w3.org/2000/svg"
                     width="30"
                     height="30"
                     fill="#1A8754"
                     class="bi bi-check-square-fill"
                     viewBox="0 0 16 16"
                  >
                     <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                  </svg>
               )}
            </div>
         )}
         {pathname === "/watchlist" && (
            <div className="absolute bottom-1 right-1">
               <svg
                  onClick={() => {
                     handle_delete(data?.imdbID);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#a3a3a3"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
               >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
               </svg>
            </div>
         )}

         <div
            onClick={() => {
               navigate(`/movie/${data?.imdbID}`);
            }}
            className="p-2 font-semibold text-sm w-full text-start "
         >
            {data?.Title?.substring(0, 25)}
            {data?.Title?.length > 25 && "..."}
         </div>
         <div
            onClick={() => {
               navigate(`/movie/${data?.imdbID}`);
            }}
            className="px-2 text-slate-500 text-xs"
         >
            Year: ({data?.Year})
         </div>
         <div
            onClick={() => {
               navigate(`/movie/${data?.imdbID}`);
            }}
            className="px-2 text-slate-500 text-xs"
         >
            type : {data?.Type}
         </div>
      </div>
   );
};

const HomePage = () => {
   const [searchText, setSearchText] = useState("");
   const [loading, setLoading] = useState(false);
   const [openNotification, setOpenNotification] = useState(false);
   const [notificationMessage, setNotificationMessage] = useState("");
   const [moviesData, setMoviesData] = useState([]);
   const context = useContext(Appcontext);
   const { userEmail, setUserEmail } = context;
   const handle_click = async () => {
      if (searchText === "") {
         setOpenNotification(true);
         setNotificationMessage("Please enter a valid Text.");
         return;
      }
      if (userEmail === null) {
         setOpenNotification(true);
         setNotificationMessage("Please log in to access this feature.");
         return;
      }
      try {
         setLoading(true);
         //    const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchText}`);

         //    if(res.ok){
         //       console.log(res);
         //       const data = await res.json();
         //       console.log(data);
         //    }
         setMoviesData([
            {
               Title: "Italian Spiderman",
               Year: "2007",
               imdbID: "tt2705436",
               Type: "movie",
               Poster:
                  "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg",
            },
            {
               Title: "Superman, Spiderman or Batman",
               Year: "2011",
               imdbID: "tt2084949",
               Type: "movie",
               Poster:
                  "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg",
            },
            {
               Title: "Spiderman",
               Year: "1990",
               imdbID: "tt0100669",
               Type: "movie",
               Poster: "N/A",
            },
            {
               Title: "The Amazing Spiderman 2 Webb Cut",
               Year: "2021",
               imdbID: "tt18351128",
               Type: "movie",
               Poster:
                  "https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_SX300.jpg",
            },
            {
               Title: "Spiderman the Verse",
               Year: "2019-",
               imdbID: "tt12122034",
               Type: "series",
               Poster:
                  "https://m.media-amazon.com/images/M/MV5BNjA2NmZhOGEtZTQ5OS00MDI0LTg4N2UtYTRmOTllM2I2NDlhXkEyXkFqcGdeQXVyNTU4OTE5Nzc@._V1_SX300.jpg",
            },
            {
               Title: "Spiderman in Cannes",
               Year: "2016",
               imdbID: "tt5978586",
               Type: "movie",
               Poster:
                  "https://m.media-amazon.com/images/M/MV5BZDlmMGQwYmItNTNmOS00OTNkLTkxNTYtNDM3ZWVlMWUyZDIzXkEyXkFqcGdeQXVyMTA5Mzk5Mw@@._V1_SX300.jpg",
            },
            {
               Title: "Spiderman",
               Year: "2010",
               imdbID: "tt1785572",
               Type: "movie",
               Poster: "N/A",
            },
            {
               Title: "Spiderman and Grandma",
               Year: "2009",
               imdbID: "tt1433184",
               Type: "movie",
               Poster:
                  "https://m.media-amazon.com/images/M/MV5BMjE3Mzg0MjAxMl5BMl5BanBnXkFtZTcwNjIyODg5Mg@@._V1_SX300.jpg",
            },
            {
               Title: "Fighting, Flying and Driving: The Stunts of Spiderman 3",
               Year: "2007",
               imdbID: "tt1132238",
               Type: "movie",
               Poster:
                  "https://m.media-amazon.com/images/M/MV5BNTI3NDE1ZmEtMTRiMS00YTY4LTk0OGItNjY4YmI0MDM4OGM4XkEyXkFqcGdeQXVyODE2NDgwMzM@._V1_SX300.jpg",
            },
            {
               Title: "Amazing Spiderman Syndrome",
               Year: "2012",
               imdbID: "tt2586634",
               Type: "movie",
               Poster: "N/A",
            },
         ]);
      } catch (err) {
         console.error("error in searching ..", err);
      } finally {
         setLoading(false);
      }
   };
//    console.log(loading);
   return (
      <PageLayout>
         <section className="w-full overflow-y-auto h-screen">
            {/* tabs */}
            <div className="p-5 my-10 border bg-slate-50 w-11/12 border-red-500 rounded-md mx-auto">
               <div className="text-3xl mb-5">
                  Welcome to <span className="text-red-500">Watchlists</span>
               </div>
               <div className="mb-2">
                  Browse movies, add them to watchlists and share them with friends.
               </div>
               <div className="">
                  Just click the{" "}
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     fill="currentColor"
                     className="bi bi-bookmark-plus inline-block"
                     viewBox="0 0 16 16"
                  >
                     <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                     <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4" />
                  </svg>{" "}
                  to add a movie, the poster to see more details and it list click to mark the
                  movies a watched.
               </div>
            </div>

            {/* search tabs */}
            <div className="flex items-center w-11/12 mx-auto gap-5">
               <div className="w-full pl-2 gap-5 rounded-md  border-slate-500 flex items-center border">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     fill="currentColor"
                     class="bi bi-search"
                     viewBox="0 0 16 16"
                  >
                     <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                  <input
                     onChange={(e) => {
                        setSearchText(e.target.value);
                     }}
                     value={searchText}
                     placeholder="search my movie's name"
                     className="w-11/12 outline-none p-2"
                  />
               </div>
               <button
                  onClick={() => {
                     handle_click();
                  }}
                  className="text-white bg-red-500 border border-red-500 py-2 rounded-md px-4"
               >
                  search
               </button>
            </div>

            {/* skeleton */}
            {loading === true && (
               <section className="flex flex-wrap justify-between w-11/12 my-0 mx-auto gap-2">
                  {Array.from({ length: 8 }, (v, i) => i).map((i) => (
                     <Box sx={{ pt: 0.5 }}>
                        <Skeleton
                           width={200}
                           height={120}
                        />
                        <Skeleton width={200} />
                        <Skeleton width={200} />
                        <Skeleton width={100} />
                     </Box>
                  ))}
               </section>
            )}
            <div className="flex flex-wrap justify-start w-11/12 mx-auto gap-12 my-10">
               {loading === false &&
                  moviesData.length > 0 &&
                  moviesData?.map((movies) => {
                     return <MoviesCard data={movies} />;
                  })}
            </div>
         </section>
         <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={openNotification}
            onClose={() => {
               setOpenNotification(false);
            }}
         >
            <Alert
               onClose={() => {
                  setOpenNotification(false);
               }}
               severity="warning"
               variant="filled"
               sx={{ width: "100%" }}
            >
               {notificationMessage}
            </Alert>
         </Snackbar>
      </PageLayout>
   );
};

export default HomePage;
