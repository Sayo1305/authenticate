import React, { useContext, useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import Appcontext from "../context/Appcontext";
import { MoviesCard } from "./HomePage";
import { Box, Modal } from "@mui/material";
import { change_list_name } from "../utils/update_movies";

const WatchListPage = () => {
   const context = useContext(Appcontext);
   const { userMovies, userEmail, listName, setListName } = context;
   const [currentName, setCurrentName] = useState(listName);

   const handle_click = () => {
      setListName(currentName);
      change_list_name(currentName, userEmail);
      setOpen(false);
   };

   const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "1px solid #000",
      boxShadow: 24,
      p: 4,
   };
   const [open, setOpen] = useState(false);
   return (
      <PageLayout>
         <section className="w-full md:px-10 px-5 py-10 md:h-screen h-auto md:overflow-y-auto">
            <div className="text-[30px] font-bold flex items-center gap-3">
               {listName === null ? "No-Name" : listName}
               <svg
                  onClick={() => {
                     setOpen(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
               >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
               </svg>
            </div>
            <div>About this watchlist</div>

            <div className="my-10 md:grid flex flex-col md:grid-cols-2 lg:grid-cols-3 gap-10">
               {userMovies?.length > 0 &&
                  userMovies?.map((movies) => {
                     return <MoviesCard data={movies} />;
                  })}
            </div>
         </section>
         <Modal
            open={open}
            onClose={() => {
               setOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box
               sx={style}
               borderRadius={2}
            >
               <div>
                  <div className="text-xl mb-2">Change the name of list.</div>
                  <input
                     type="text"
                     id="list_name"
                     className="outline-none mb-5 w-full border-black bg-transparent p-2 border-2 rounded-md"
                     value={currentName}
                     onChange={(e) => {
                        setCurrentName(e.target.value);
                     }}
                  />
                  <button
                     type="button"
                     className="w-full bg-red-500 p-2 rounded-md text-white"
                     onClick={() => {
                        handle_click();
                     }}
                  >
                     change Name
                  </button>
               </div>
            </Box>
         </Modal>
      </PageLayout>
   );
};

export default WatchListPage;
