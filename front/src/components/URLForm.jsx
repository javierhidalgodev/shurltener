import { Alert, Box, Button, TextField } from "@mui/material"

const URLForm = (props) => {
    const { url, setURL, handleSubmit, notification } = props

    return (
        <>
            <Box
                component='form'
                margin='20px 0'
                method='post'
                onSubmit={handleSubmit}
                width={'100%'}
                display={'flex'}
                alignItems={'flex-start'}
                gap={2}>
                <TextField
                    placeholder={'http://www.example.com'}
                    fullWidth
                    name='url'
                    size='small'
                    value={url}
                    onChange={({ target }) => setURL(target.value)}
                    required />
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ backgroundColor: '#dbff00', fontWeight: 800, '&:hover': { backgroundColor: '#b4d100' }}}>
                    Short
                </Button>
            </Box>
            {
                notification &&
                <Alert severity={notification.type} variant='outlined' sx={{ margin: '10px 0' }}>{notification.message}</Alert>
            }
        </>
    )
}

export default URLForm