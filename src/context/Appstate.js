import React, { useEffect, useState } from "react";
import Appcontext from "./Appcontext";

const Appstate = ({ children }) => {
   const [userEmail, setUserEmail] = useState(null);
   const [userMovies, setUserMovies] = useState([]);
   const [listName, setListName] = useState(null);
   const [moviesList , setMoviesList] = useState([]);

   const reset_all = ()=>{
      setListName(null);
      setUserMovies([]);
      setUserEmail(null);
      setMoviesList([]);
   }
   useEffect(() => {
      const getUser = async () => {
         try {
            const current_user = JSON.parse(localStorage.getItem("current_user"));
            if (current_user !== null) {
               setUserEmail(current_user);
            }
         } catch (e) {
            console.log("error in getting in user", e);
         }
      };
      if (userEmail === null) getUser();
      // eslint-disable-next-line
   }, []);

   useEffect(() => {
      const fetchUserMovies = async () => {
         try {
            const movieList = JSON.parse(localStorage.getItem("movie_list")) || [];
            if (userEmail) {
               const moviesByUser = movieList.filter((movie) => movie.addedBy === userEmail);
               setUserMovies(moviesByUser);
            }
            const listName2 = JSON.parse(localStorage.getItem("list_name_array")) || [];
            if (userEmail) {
               const userObject = listName2.find((user) => user?.email === userEmail);
               setListName(userObject?.list_name || null);
            }
         } catch (error) {
            console.log("Error fetching user movies:", error);
         }
      };
      fetchUserMovies();
      // eslint-disable-next-line
   }, [userEmail]);
   return (
      <Appcontext.Provider
         value={{ userEmail, setUserEmail,reset_all,setMoviesList , moviesList ,  userMovies, setUserMovies, listName, setListName }}
      >
         {children}
      </Appcontext.Provider>
   );
};

export default Appstate;
