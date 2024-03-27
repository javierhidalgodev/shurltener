import { AppBar, Box, Typography } from "@mui/material"
import LinkIcon from '@mui/icons-material/Link';

const Navbar = () => {
  return (
    <AppBar sx={{padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'row', boxShadow: 'none'}} position='static' color="transparent">
      <Box maxWidth='md' width='100%' display='flex' justifyContent='start'>
        <Typography variant='h6' width='fit-content' textAlign='center' display='flex' alignItems='center' gap={1}>
          <LinkIcon sx={{
            fill: '#dbff00',
            '&:hover': {transform: 'rotate(30deg)'},
            transition: 'transform 150ms'
          }} />
          <div>
            sh<Typography variant='h6' color='#dbff00' display='inline' fontWeight={600}>url</Typography>tener
          </div>
        </Typography>
      </Box>
    </AppBar>
  )
}

export default Navbar