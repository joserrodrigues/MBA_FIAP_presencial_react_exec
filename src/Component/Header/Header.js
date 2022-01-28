import React, { useContext } from 'react';
import { InfoContext } from '../../store/InfoContext';
import CustomButton from '../CustomButton/CustomButton';
import { Typography, Stack } from '@mui/material';

const Header = () => {

    const context = useContext(InfoContext);
    return (
        <div>
            <Stack direction="row"
                justifyContent="flex-end"
                alignItems="center"
                marginRight={10}
                marginTop={3}>
                <CustomButton onClick={() => context.onMakeLogout()}>Logout</CustomButton>
            </Stack>

        </div>
    );
};

export default Header;