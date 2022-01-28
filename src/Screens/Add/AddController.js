import React, { useState, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AddView from './AddView';
import * as Yup from "yup";
import "yup-phone";
import useAPI from '../../Services/APIs/Common/useAPI';
import persons from '../../Services/APIs/Persons/Persons';
import { InfoContext } from '../../store/InfoContext';

const AddController = () => {

    const addPersonsAPI = useAPI(persons.addPersons);
    const editPersonsAPI = useAPI(persons.editPersons);
    let { state: { latitude, longitude, info } } = useLocation();
    const [connectMessage, setConnectMessage] = useState("");
    const [connectCode, setConnectCode] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { tokenLogin } = useContext(InfoContext);
    const { infoID } = useParams();

    let infoData = null;
    if (info != null){
        infoData = JSON.parse(info);
    }

    console.log(infoID);
    

    let navigate = useNavigate();

    const onBackButton = () => {
        navigate(-1);
    }

    const onSubmit = (values) => {
        // navigate(-1);
        console.log(values);

        let infoSend = {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            address: values.address,
            latitude: values.latitude,
            longitude: values.longitude,
            image: "https://reqres.in/img/faces/1-image.jpg",
        }

        setIsLoading(true);
        if (infoData != null){
            editPersonsAPI.requestPromise(infoID, infoSend, tokenLogin)
                .then(info => {
                    console.log(info);
                    setIsLoading(false);
                    setConnectCode(1);
                    setConnectMessage("Colaborador alterado com sucesso");
                    setTimeout(() => {
                        navigate(-1);
                    }, 3000);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setConnectCode(-1);
                    setConnectMessage("O servidor retornou um erro= " + error.response.status);
                })
        } else {
            addPersonsAPI.requestPromise(infoSend, tokenLogin)
                .then(info => {
                    console.log(info);
                    setIsLoading(false);
                    setConnectCode(1);
                    setConnectMessage("Colaborador adicionado com sucesso");
                    setTimeout(() => {
                        navigate(-1);
                    }, 3000);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setConnectCode(-1);
                    setConnectMessage("O servidor retornou um erro= " + error.response.status);
                })
        }
    }

    const signInSchema = Yup.object().shape({
        firstName: Yup.string().required("O nome é obrigatório"),
        lastName: Yup.string().required("O sobrenome é obrigatório"),
        phone: Yup.string()
            .phone("BR", true, 'O telefone está inválido')
            .required("Telefone é obrigatório"),

        address: Yup.string()
            .required("Endereço é obrigatório")
            .min(10, "Endereço é muito curto"),
    });


    return (
        <AddView
            onBackButton={onBackButton}
            latitude={latitude} longitude={longitude}
            onSubmit={onSubmit}
            signInSchema={signInSchema}
            isLoading={isLoading}
            connectMessage={connectMessage}
            connectCode={connectCode}
            infoData={infoData}
        />
    );
};

export default AddController;