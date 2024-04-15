/** @format */

import React, { useContext, useEffect, useState } from "react";
import Appcontext from "../../context/Appcontext";
import { useNavigate } from "react-router-dom";
import { Popover } from "@mui/material";
import profile_pic from "../../images/person.png";
const PageLayout = ({ children }) => {
   const context = useContext(Appcontext);
   const { userEmail, setUserEmail, userMovies, listName } = context;
   const [anchorEl, setAnchorEl] = useState(null);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const open = Boolean(anchorEl);
   const id = open ? "simple-popover" : undefined;
   const router = useNavigate();
   return (
      <div className="w-full h-screen relative flex md:flex-row flex-col  items-start">
         <div className="md:w-3/12 w-full border-r relative md:h-screen h-auto">
            <div  onClick={()=>{router('/')}}className="text-center cursor-pointer text-red-500 font-bold text-4xl py-6">Watchlists</div>
            <div className="flex border items-center w-10/12 rounded-md pl-2 mx-auto">
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
                  className="w-5/6 rounded  mx-auto outline-none p-2"
                  placeholder="search"
               />
            </div>

            <div  onClick={()=>{router('/')}} className="mt-10 w-10/12 cursor-pointer flex items-center text-white bg-red-500 p-2 rounded-md gap-3 mx-auto">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-house-door-fill"
                  viewBox="0 0 16 16"
               >
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
               </svg>{" "}
               Home
            </div>
            <div className="w-10/12 mx-auto h-[1px] bg-slate-300 my-5"></div>
            <div className="w-10/12 mx-auto text-xl">My lists</div>
            {userMovies?.length > 0 && (
               <div onClick={()=>{router('/watchlist')}} className="w-10/12 my-2 border rounded-md flex cursor-pointer items-center gap-3 p-2 mx-auto ">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     fill="currentColor"
                     class="bi bi-card-checklist"
                     viewBox="0 0 16 16"
                  >
                     <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                     <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                  </svg>{" "}
                  {listName === null ? "NO-NAME" : listName}
               </div>
            )}

            {/* profile stats */}
            <div className="md:absolute md:w-full md:my-0 my-2 w-11/12 mx-auto bottom-5 px-5">
               <div
                  onClick={() => {
                     if (userEmail === null) {
                        router("/login");
                     }
                  }}
                  className="w-full mx-auto p-3 rounded-md justify-between border flex items-center"
               >
                  <div className="flex items-center gap-4">
                     <div className="lg:block hidden">
                        {userEmail === null ? (
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="currentColor"
                              className="bi bi-person-circle lg:block hidden"
                              viewBox="0 0 16 16"
                           >
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                              <path
                                 fill-rule="evenodd"
                                 d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                              />
                           </svg>
                        ) : (
                           <img
                              src={profile_pic}
                              className="w-10 h-10 rounded-full lg:block hidden"
                              alt="avatar"
                           />
                        )}
                     </div>
                     <div className="text-xs">{userEmail === null ? "GUEST" : userEmail}</div>
                  </div>
                  <div
                     onClick={(e) => {
                        handleClick(e);
                     }}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-three-dots"
                        viewBox="0 0 16 16"
                     >
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                     </svg>
                  </div>
               </div>
            </div>
         </div>
         <div className="md:w-9/12 w-full">{children}</div>
         <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}
         >
            <div
               onClick={() => {
                  setUserEmail(null);
                  localStorage.removeItem("current_user");
                  router("/login");
               }}
               className="p-3 text-white bg-red-500 flex items-center gap-2 cursor-pointer"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
               >
                  <path
                     fill-rule="evenodd"
                     d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                     fill-rule="evenodd"
                     d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
               </svg>{" "}
               Logout
            </div>
         </Popover>
      </div>
   );
};

export default PageLayout;
