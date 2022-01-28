import * as React from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import CustomCards from '../../Components/Card/CustomCards';
import './Home.css'

export default function HomeView({ person }) {

    let arrayCards = [];
    if (person.data) {
        person.data.persons.forEach(element => {
            arrayCards.push(
                <Grid item xs={12} md={6} lg={3} key={element.id} >
                    <CustomCards person={element} />
                </Grid>);
        });
    }

    let info = null;
    if (person.loading) {
        info = (
            <div className='infoClass'>
                <CircularProgress />
            </div>
        )
    } else if (person.error != "") {
        info = (
            <div className='infoClass'>
                <Typography gutterBottom variant="h5" component="div">
                    {person.error}
                </Typography>
            </div>
        )
    } else {
        info = (
            <Grid
                container
                spacing={5}>
                {arrayCards}
            </Grid>
        )
    }

    return (
        <>
            {info}
        </>

    );
}