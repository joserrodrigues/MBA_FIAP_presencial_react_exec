import React from 'react';
import { Grid, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import { Formik, Form, ErrorMessage } from "formik";
import CustomTextField from '../../Component/CustomTextField/CustomTextField';
import CustomButon from '../../Component/CustomButton/CustomButton'
import renderif from 'render-if';

import './SignUp.css';

const SignUpView = ({ onSubmit, signInSchema, isLoading, connectCode, connectMessage }) => {
    let message = null;

    if (connectMessage !== "") {
        let severity = "success";
        if (connectCode !== 1) {
            severity = "error";
        }
        message = (
            <Alert severity={severity} variant="filled"> {connectMessage} </Alert>
        );
    }  
    return (
        <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center" xs={12} md={6} lg={12}>
            <Grid item  md={12}>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
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
                                            Realize o cadastro para acessar o sistema
                                        </Typography>
                                        <div>
                                            <CustomTextField
                                                label="Nome"
                                                defaultValue={values.name}
                                                onChange={e => setFieldValue('name', e.target.value)}
                                            />
                                        </div>
                                        <div><ErrorMessage name="name" component="span" className="infoError" /></div>
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
                                        <div>
                                            <CustomTextField
                                                label="Confirmar Senha"
                                                type="password"
                                                defaultValue={values.password}
                                                onChange={e => setFieldValue('confirmPassword', e.target.value)}
                                            />
                                        </div>
                                        <div><ErrorMessage name="confirmPassword" component="span" className="infoError" /></div>
                                        
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
                                                    <CustomButon type="submit" onClick={submitForm}>Cadastrar</CustomButon>
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

export default SignUpView;