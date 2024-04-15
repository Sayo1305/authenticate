export const handleUpdateMovies = (updatedMovies) => {
   const updatedMovieList = updateMoviesInList(updatedMovies);
   localStorage.setItem("movie_list", JSON.stringify(updatedMovieList));
};

const updateMoviesInList = (updatedMovies) => {
   const movieList = JSON.parse(localStorage.getItem("movie_list")) || [];
   if (movieList.length === 0) {
      return updatedMovies;
   }
   const updatedList = movieList.map((movie) => {
      const matchingUpdatedMovie = updatedMovies.find(
         (updatedMovie) => updatedMovie.imdbID === movie.imdbID && updatedMovie?.addedBy === movie?.addedBy
      );
      if (matchingUpdatedMovie) {
         return { ...movie, ...matchingUpdatedMovie };
      }
      return movie;
   });

   updatedMovies.forEach((updatedMovie) => {
      const isMovieInList = updatedList.some((movie) => movie.imdbID === updatedMovie.imdbID && movie.addedBy === updatedMovie.addedBy);
      if (!isMovieInList) {
         updatedList.push(updatedMovie);
      }
   });

   return updatedList;
};


export const handleDeleteMovie = (imdbID, userEmail) => {
   const updatedMovieList = deleteMovieFromList(imdbID, userEmail);
   localStorage.setItem("movie_list", JSON.stringify(updatedMovieList));
 };
 
 const deleteMovieFromList = (imdbID, userEmail) => {
   const movieList = JSON.parse(localStorage.getItem("movie_list")) || [];
    const updatedList = movieList.filter((movie) => {
     return !(movie.imdbID === imdbID && movie.addedBy === userEmail);
   });
   return updatedList;
 };
 

 export const change_list_name = (newListName, userEmail) => {
   const userLists = JSON.parse(localStorage.getItem("list_name_array")) || [];
   const userIndex = userLists.findIndex((user) => user.email === userEmail);
   if (userIndex !== -1) {
     userLists[userIndex].list_name = newListName;
      localStorage.setItem("list_name_array", JSON.stringify(userLists));
   } else {
      const newUserLists = [...userLists, { email: userEmail, list_name: newListName }];
      localStorage.setItem("list_name_array", JSON.stringify(newUserLists));
   }
 };