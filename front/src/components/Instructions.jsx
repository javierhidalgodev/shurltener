import { List, Typography } from "@mui/material"

const Instructions = () =>
    <>
        <List component='ul' sx={{ listStyleType: 'disc', listStylePosition: 'inside', fontSize: '.8rem' }}>
            <li>Name: solo se pueden usar letras y espacios.</li>
            <li>Username: solo se pueden usar letras y números.</li>
            <li>Password: debe tener una longitud de 8 como mínimo, un número, una mayúscula y una minúscula.</li>
        </List>
    </>

export default Instructions