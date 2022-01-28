import React from 'react';

const Button = ({ text, onClickFunction, color }) => {
    return (
        <button onClick={onClickFunction} className='buttonInfo'>{text}</button>
    );
};

export default Button;