import { AppBar, Box, Typography } from "@mui/material"
import LinkIcon from '@mui/icons-material/Link';

const Navbar = () => {
  return (
    <AppBar sx={{padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'row', boxShadow: 'none'}} position='static' color="transparent">
      <Box maxWidth='md' width='100%' display='flex' alignItems='center' gap={1} sx={{'@media (width < 900px)': {justifyContent: 'center', transform: 'scale(1.5)'}}}>
          <LinkIcon sx={{
            fill: '#dbff00',
            '&:hover': {transform: 'rotate(45deg)'},
            transition: 'transform 150ms'
          }} />
          <Typography variant='h6'>
            sh<Typography color='#dbff00' display='inline' fontWeight={600} fontSize='inherit'>url</Typography>tener
          </Typography>
      </Box>
    </AppBar>
  )
}

export default Navbar