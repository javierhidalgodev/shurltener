import { Box, Link, Tooltip } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';

const linkStyle = {
  display: 'inline-block',
  color: '#dbff00',
  fontFamily: 'Archivo',
  fontWeight: 800,
  transition: '100ms'
}

const Footer = () => {
  return (
    <Box component='footer' width='100%' mt='auto' padding='20px' display='flex' justifyContent='space-between' position='s' bottom={0}>
      <span>Desarrollado por <Link style={linkStyle} href='https://javihidalgodev.github.io/portfolio/' target='_blank' rel='noopener' underline='none' sx={{'&:hover': {transform: 'translateY(-2px)', textShadow: '0 3px rgba(255, 255, 255, .3)'}}}>javierhidalgo</Link></span>
      <Tooltip title='Repositorio' placement='left' arrow>
        <GitHubIcon sx={{'&:hover': {fill: '#dbff00'}, transition: '100ms'}} />
      </Tooltip>
    </Box>
  )
}

export default Footer