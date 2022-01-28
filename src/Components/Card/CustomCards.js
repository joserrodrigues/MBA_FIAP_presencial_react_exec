import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const CustomCards = ({person}) => {

    let address = person.address + " - " + person.city + "/" + person.state
    return (
        <Card >
            <CardMedia
                component="img"
                height="200"
                image={person.image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {person.firstName} {person.lastName}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                    {person.jobTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {person.zipCode}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CustomCards;