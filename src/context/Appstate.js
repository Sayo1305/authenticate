/** @format */

import React, { useEffect, useState } from "react";
import Appcontext from "./Appcontext";

const Appstate = ({ children }) => {
   const [userEmail, setUserEmail] = useState(null);
   const [userMovies, setUserMovies] = useState([]);
   const [listName , setListName] = useState(null);
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
   }, []);

   useEffect(() => {
      const fetchUserMovies = async () => {
         try {
            const movieList = JSON.parse(localStorage.getItem("movie_list")) || [];
            if (userEmail) {
               const moviesByUser = movieList.filter((movie) => movie.addedBy === userEmail);
               setUserMovies(moviesByUser);
            }
            const listName2 = localStorage.getItem("list_name") || null;
            if(userEmail){
                  setListName(listName2)
            }
         } catch (error) {
            console.log("Error fetching user movies:", error);
         }
      };
      fetchUserMovies();
   }, [userEmail]);
   return <Appcontext.Provider value={{ userEmail, setUserEmail , userMovies , setUserMovies  , listName , setListName}}>{children}</Appcontext.Provider>;
};

export default Appstate;
