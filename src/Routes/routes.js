import React, { useContext } from 'react';
import HomeController from '../Screens/Home/HomeController';
import DetailController from '../Screens/Detail/DetailController';
import { Routes, Route } from "react-router-dom";
import AddController from '../Screens/Add/AddController';
import LoginController from '../Screens/Login/LoginController';
import { InfoContext } from "../store/InfoContext";
import SignUpController from '../Screens/SignUp/SignUpController';

const RouteApp = () => {

    const { tokenLogin, onMakeLogin } = useContext(InfoContext);

    let hasToken = false;
    if (tokenLogin === undefined || tokenLogin === null){
        let storageToken = localStorage.getItem("tokenLogin");
        if (storageToken != null && storageToken != undefined){
            onMakeLogin(storageToken);
            hasToken = true;
        }
    } else {
        hasToken = true;
    }

    if (hasToken){
        return (
            <Routes>
                <Route path="/" element={<HomeController />} />
                <Route path="detail">
                    <Route path=":infoID" element={<DetailController />} />
                </Route>
                <Route path="add" element={<AddController />} />
                <Route path="edit/:infoID" element={<AddController />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/" element={<LoginController />} />
                <Route path="/SignUp" element={<SignUpController />} />
            </Routes>
        );
    }
    
};

export default RouteApp;