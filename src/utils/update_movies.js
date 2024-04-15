/** @format */

export const handleUpdateMovies = (updatedMovies) => {
   const updatedMovieList = updateMoviesInList(updatedMovies);
   console.log(updatedMovieList);
   localStorage.setItem("movie_list", JSON.stringify(updatedMovieList));
};

const updateMoviesInList = (updatedMovies) => {
   const movieList = JSON.parse(localStorage.getItem("movie_list")) || [];
   if (movieList.length === 0) {
      return updatedMovies;
   }
   const updatedList = movieList.map((movie) => {
      const matchingUpdatedMovie = updatedMovies.find(
         (updatedMovie) => updatedMovie.imdbID === movie.imdbID
      );
      if (matchingUpdatedMovie) {
         return { ...movie, ...matchingUpdatedMovie };
      }
      return movie;
   });

   updatedMovies.forEach((updatedMovie) => {
      const isMovieInList = updatedList.some((movie) => movie.imdbID === updatedMovie.imdbID);
      if (!isMovieInList) {
         updatedList.push(updatedMovie);
      }
   });

   return updatedList;
};
