import React from 'react';
import HomeController from '../Screens/Home/HomeController';
import DetailController from '../Screens/Detail/DetailController';
import { Routes, Route } from "react-router-dom";
import AddController from '../Screens/Add/AddController';

const routes = () => {
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
};

export default routes;