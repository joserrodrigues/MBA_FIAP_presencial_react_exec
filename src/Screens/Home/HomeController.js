import React, { useEffect, useState, useRef } from 'react';
import useAPI from '../../Services/API/Common/useAPI';
import persons from '../../Services/API/Persons/persons';
import HomeView from './HomeView';


const HomeController = () => {

    const getPersonsGetAPI = useAPI(persons.getPersons);
    useEffect(() => {
        getPersonsGetAPI.request();
    }, []);

    return <HomeView person={getPersonsGetAPI} />
}


export default HomeController;