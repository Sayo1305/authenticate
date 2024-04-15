/** @format */

import React, { useContext, useEffect, useState } from "react";
import Appcontext from "../context/Appcontext";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
   const [email, setEmail] = useState("");
   const context = useContext(Appcontext);
   const { setUserEmail, userEmail } = context;
   const [openNotification, setOpenNotification] = useState(false);
   const [notificationMessage, setNotificationMessage] = useState("");
   const router = useNavigate();
   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   };
   //    user is already logged in
   useEffect(() => {
      if (userEmail !== null) {
         router("/");
      }
   }, [userEmail]);

   //    data take locally from the localStorage
   const userList = JSON.parse(localStorage.getItem("user_list"));
   const handleLogin = () => {
      if (email.length > 0) {
         const temp = [...userList];
         if (temp?.includes(email)) {
            setUserEmail(email);
         } else {
            temp.push(email);
            setUserEmail(email);
            localStorage.setItem("user_list", JSON.stringify(temp));
         }
         localStorage.setItem("current_user", JSON.stringify(email));
         router("/");
      } else {
         setOpenNotification(true);
         setNotificationMessage("Please enter a valid email.");
      }
   };
   return (
      <div className="w-full h-screen bg-red-50 flex flex-col justify-center items-center">
         <div className="text-center text-red-500 font-bold text-4xl py-6">Watchlists</div>
         <div className="border-2 p-5 lg:w-1/4 md:w-1/2 w-10/12 border-red-300 rounded-md flex flex-col">
            <div className="text-center text-red-500 text-lg mb-10">
               Simple, Login with your email.
            </div>
            <label
               htmlFor="email"
               className="text-sm"
            >
               Email:
            </label>
            <input
               type="email"
               id="email"
               className="outline-none mb-5 border-black bg-transparent p-2 border-2 rounded-md"
               value={email}
               onChange={handleEmailChange}
               required
            />
            <button
               type="button"
               className="w-full bg-red-500 p-2 rounded-md text-white"
               onClick={handleLogin}
            >
               Login
            </button>
         </div>
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
      </div>
   );
};

export default LoginPage;
