import React, { useState } from "react";
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Routes } from "react-router-dom";

import Home from './pages/Home'
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import Statistic from "./pages/Statistic";
import ErrorPage from "./404/ErrorPage";
import Userform from "./user/Userform";
import UserTraders from "./user/UserTraders";
import Notification from "./user/Notification";
import TelegramImage from "./user/TelegramImage";
import ShowImagePage from "./user/ShowImagePage";
import Download from "./user/Download";
import ForMe from "./pages/ForMe";
import Traders from "./myFirstProject/Traders";
import MyComponent from "./myFirstProject/bitgetapi";

function App() {
  return (
    <div className="ag-format-container" style={{backgroundColor: '#100231', width: '100%', minHeight:'750px'}}>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admins" element={<Admin/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/traders" element={<Statistic/>} />
        <Route path="/userform" element={<Userform/>} />
        <Route path="/notification" element={<Notification/>} />
        <Route path="/usertraders" element={<UserTraders/>} />
        <Route path="/forme" element={<ForMe/>}/>
        <Route path="/echobot/pnl/:telegram_id" element={<ShowImagePage/>} />
        {/*<Route path="/download" element={<Download/>} />*/}
        <Route path="/download" element={<Download />} />
        <Route path="/404" element={<ErrorPage/>} />
        {/*south korea*/}
        <Route path="/newtraders" element={<Traders />} />
        <Route path="/mypage" element={<MyComponent />} />

      </Routes>
    </div> 
      
   
  );

  }
export default App;
