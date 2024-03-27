import { AppBar, Box, Typography } from "@mui/material"

const Navbar = () => {
  return (
    <AppBar sx={{padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'center', boxShadow: 'none'}} position='static' color="transparent">
      <Box maxWidth='md' width='100%' display='flex' justifyContent='center'>
        <Typography variant='h6' width='fit-content' textAlign='center' >
          sh<span>url</span>tener
        </Typography>
      </Box>
    </AppBar>
  )
}

export default Navbar