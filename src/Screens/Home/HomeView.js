import React from 'react';
import Button from '../../Components/Button/Button';
import './Home.css'

const HomeView = ({ count, onClicked}) => {
    return (
        <div className='root'>
            <div className='text'>Count {count}</div>
            <Button text={"Clique AQUI"} onClickFunction={() => onClicked()} />
        </div>
    );
};

export default HomeView;