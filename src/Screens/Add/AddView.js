import React from 'react';
import { Grid, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Formik, Form, ErrorMessage } from "formik";
import './Add.css'
import CustomTextField from '../../Component/CustomTextField/CustomTextField';
import CustomButon from '../../Component/CustomButton/CustomButton'
import InputMask from "react-input-mask";
import renderif from 'render-if';

const DetailView = ({ onBackButton, latitude, longitude, google, onSubmit, signInSchema, isLoading, connectCode, connectMessage, infoData }) => {

    console.log(latitude + ", " + longitude)    
    console.log(infoData)

    let firstName = "";
    let lastName = "";
    let address = "";
    let phone = "";
    let infoLatitude = "";
    let infoLongitude = "";
    let buttonAddTitle = "Adicionar";
    if (infoData !== null){
        firstName = infoData.firstName;
        lastName = infoData.lastName;
        address = infoData.address;
        phone = infoData.phone;
        infoLatitude = infoData.latitude;
        infoLongitude = infoData.longitude;
        buttonAddTitle = "Editar";
    } else {
        infoLatitude = latitude;
        infoLongitude = longitude;
    }


    console.log(infoLatitude + ", " + infoLongitude)    
    let message = null;
    console.log(connectMessage);
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
        <Formik
            initialValues={{
                firstName: firstName,
                lastName: lastName,
                address: address,
                phone: phone,
                latitude: infoLatitude,
                longitude: infoLongitude,
            }}
            validationSchema={signInSchema}
            onSubmit={onSubmit}>
            {(formik) => {
                const { values, setFieldValue, submitForm } = formik;
                return (
                    <Form>
                        <Grid container spacing={2} className='box'>
                            <Grid item xs={12} md={6}>
                                {message}
                                <Typography gutterBottom variant="h3" className="text">
                                    Adicionar novo Colaborador
                                </Typography>
                                <div>
                                    <CustomTextField
                                        label="Nome"
                                        defaultValue={values.firstName}
                                        onChange={e => setFieldValue('firstName', e.target.value)}
                                    />
                                </div>
                                <div><ErrorMessage name="firstName" component="span" className="infoError" /></div>
                                <div>
                                    <CustomTextField
                                        label="Sobrenome"
                                        defaultValue={values.lastName}
                                        onChange={e => setFieldValue('lastName', e.target.value)}
                                    />
                                </div>
                                <div><ErrorMessage name="lastName" component="span" className="infoError" /></div>
                                <div>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        disabled={false}
                                        value={values.phone}
                                        maskChar=" "
                                        onChange={e => {
                                            setFieldValue('phone', e.target.value)
                                        }}
                                    >
                                        <CustomTextField label="Telefone" defaultValue={values.phone} />
                                    </InputMask>
                                </div>
                                <div><ErrorMessage name="phone" component="span" className="infoError" /></div>
                                <div>
                                    <CustomTextField
                                        label="Endereco"
                                        defaultValue={values.address}
                                        onChange={e => setFieldValue('address', e.target.value)}
                                    />
                                </div>
                                <div><ErrorMessage name="address" component="span" className="infoError" /></div>
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
                                            <CustomButon type="submit" onClick={submitForm}>{buttonAddTitle}</CustomButon>
                                            <CustomButon onClick={() => onBackButton()}>Voltar</CustomButon>

                                        </>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Map google={google} zoom={15} className="maps"
                                    initialCenter={{ lat: infoLatitude, lng: infoLongitude }}>
                                    <Marker
                                        key={1}
                                        name={"My Position"}
                                        draggable={true}
                                        onDragend={(e, newValue) => {
                                            setFieldValue('latitude', newValue.position.lat())
                                            setFieldValue('longitude', newValue.position.lng())
                                        }}
                                        position={{ lat: values.latitude, lng: values.longitude }}
                                    />
                                </Map>
                            </Grid>

                        </Grid>
                    </Form>
                );
            }}
        </Formik>

    );
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAPS_KEY
})(DetailView);