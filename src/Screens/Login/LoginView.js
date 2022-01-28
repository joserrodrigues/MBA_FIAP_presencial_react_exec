import React from 'react';
import { Grid, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import { Formik, Form, ErrorMessage } from "formik";
import CustomTextField from '../../Component/CustomTextField/CustomTextField';
import CustomButon from '../../Component/CustomButton/CustomButton'
import renderif from 'render-if';

import './Login.css';

const LoginView = ({ onSubmit, signInSchema, isLoading, connectCode, connectMessage, goToSignUp }) => {
    let message = null;

    if (connectMessage !== "") {
        message = (
            <Alert severity="error" variant="filled"> {connectMessage} </Alert>
        );
    }    
    return (
        <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center" >
            <Grid item  md={12}>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={signInSchema}
                    onSubmit={onSubmit}>
                    {(formik) => {
                        const { values, setFieldValue, submitForm } = formik;
                        return (
                            <Form >
                                <Grid container direction="column"
                                    justifyContent="center"
                                    alignItems="center" spacing={2} className='box'>
                                    <Grid item xs={12} md={6} className='boxLogin'>
                                        {message}
                                        <Typography gutterBottom variant="h6" className="text">
                                            Bem-vindo ao Sistema de Colaboradores
                                        </Typography>
                                        <div>
                                            <CustomTextField
                                                label="Email"
                                                defaultValue={values.email}
                                                onChange={e => setFieldValue('email', e.target.value)}
                                            />
                                        </div>
                                        <div><ErrorMessage name="email" component="span" className="infoError" /></div>
                                        <div>
                                            <CustomTextField
                                                label="Senha"
                                                type="password"
                                                defaultValue={values.password}
                                                onChange={e => setFieldValue('password', e.target.value)}
                                            />
                                        </div>
                                        <div><ErrorMessage name="password" component="span" className="infoError" /></div>
                                        
                                        <Stack direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={5}
                                            className='divButtons'>
                                            {renderif(isLoading)(
                                                <CircularProgress />
                                            )}
                                            {renderif(!isLoading && connectCode !== 1)(
                                                <>
                                                    <Typography gutterBottom variant="subtitle2" className="textButton" onClick={goToSignUp}>
                                                        Realizar Cadastro
                                                    </Typography>
                                                    <CustomButon type="submit" onClick={submitForm}>Logar</CustomButon>
                                                </>
                                            )}
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Form>
                        );
                    }}
                </Formik>
            </Grid>
        </Grid>
    );
};

export default LoginView;