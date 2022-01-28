import React from 'react';
import { Button, Grid, Stack } from '@mui/material';
import './Home.css'

const HomeView = ({ count, statusPlay, onStart, onPause, onStop}) => {

    let buttons = [];

    console.log(statusPlay);
    if (statusPlay === 0){
        buttons.push(<Button key={1} text={"Iniciar"} variant="outlined" color="error" onClick={() => onStart()}>Iniciar</Button>);
    } else if (statusPlay === 1){
        buttons.push(<Button key={2} text={"Pausar"} variant="outlined" color="error" onClick={() => onPause()}> Pausar</Button>);
        buttons.push(<Button key={3} text={"Parar"} variant="outlined" color="error" onClick={() => onStop()}> Parar</Button>);  
    } else {
        buttons.push(<Button key={1} text={"Despausar"} variant="outlined" color="error" onClick={() => onStart()} >Despausar</Button>);
        buttons.push(<Button key={2} text={"Parar"} variant="outlined" color="error" onClick={() => onStop()} >Parar</Button>);        
    }
    return (
        <Grid container spacing={2} direction="column"
            justifyContent="center"
            alignItems="center"
            className='container'>
            <Grid item>
                <div className='text'>Count {count}</div>
            </Grid>
            <Grid item xs>
                <Stack direction="row" spacing={10}>
                    {buttons}
                </Stack>
            </Grid>
        </Grid>
    );
};

export default HomeView;