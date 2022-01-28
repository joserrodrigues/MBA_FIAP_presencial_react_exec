import React, { useState } from 'react';
import useAPI from '../../Services/APIs/Common/useAPI';
import auth from '../../Services/APIs/Auth/Auth';
import SignUpView from './SignUpView';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const SignUpController = () => {

    const authSignUpAPI = useAPI(auth.signUp);
    const [connectMessage, setConnectMessage] = useState("");
    const [connectCode, setConnectCode] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (values) => {
        // navigate(-1);
        console.log(values);

        let infoSend = {
            name: values.name,
            email: values.email,
            password: values.password        
        }

        setIsLoading(true);
        authSignUpAPI.requestPromise(infoSend)
        .then(info => {
            // console.log(info);
            setIsLoading(false);
            setConnectCode(1);
            setConnectMessage("Colaborador cadastrado com sucesso");
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

    const signInSchema = Yup.object().shape({
        name: Yup.string().required("O nome é obrigatório").min(4, "O nome está muito curta"),        
        email: Yup.string().email().required("O email é obrigatório"),        
        password: Yup.string().required("A senha é obrigatório").min(4, "A senha está muito curta"),        
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'A confirmação está diferente da senha'),
    });

    const goToSignUp = () => {
        navigate("SignUp");
    }

    return (
        <SignUpView 
            onSubmit={onSubmit}
            goToSignUp={goToSignUp}
            signInSchema={signInSchema}
            isLoading={isLoading}
            connectMessage={connectMessage}
            connectCode={connectCode}/>
    );
};

export default SignUpController;