import React, { useState, useContext } from 'react';
import useAPI from '../../Services/APIs/Common/useAPI';
import auth from '../../Services/APIs/Auth/Auth';
import LoginView from './LoginView';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { InfoContext } from '../../store/InfoContext';

const LoginController = () => {

    const authLoginAPI = useAPI(auth.login);
    const [connectMessage, setConnectMessage] = useState("");
    const [connectCode, setConnectCode] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(InfoContext);
    const navigate = useNavigate();

    const onSubmit = (values) => {
        // navigate(-1);
        console.log(values);

        let infoSend = {
            email: values.email,
            password: values.password,            
        }

        setIsLoading(true);
        authLoginAPI.requestPromise(infoSend)
        .then(info => {
            // console.log(info);
            setIsLoading(false);
            // setConnectCode(1);
            // setConnectMessage("Colaborador logado com sucesso");
            context.onMakeLogin(info.token);
        })
        .catch((error) => {
            setIsLoading(false);
            setConnectCode(-1);
            setConnectMessage("O servidor retornou um erro= " + error.response.status);
        })
    }

    const signInSchema = Yup.object().shape({
        email: Yup.string().email().required("O email é obrigatório"),
        password: Yup.string().required("A senha é obrigatório").min(4, "A senha está muito curta"),        
    });

    const goToSignUp = () => {
        navigate("/SignUp");
    }

    return (
        <LoginView 
            onSubmit={onSubmit}
            goToSignUp={goToSignUp}
            signInSchema={signInSchema}
            isLoading={isLoading}
            connectMessage={connectMessage}
            connectCode={connectCode}/>
    );
};

export default LoginController;