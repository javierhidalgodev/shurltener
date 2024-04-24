import { Box, Divider, Link, Tooltip } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';

const portfolioLinkStyle = {
  display: 'inline-block',
  color: '#dbff00',
  fontFamily: 'Archivo',
  fontWeight: 800,
  transition: '100ms'
}

const Footer = () => {
  return (
    <Box
      component='footer'
      width='100%'
      mt='auto'
      padding='20px'
      display='flex'
      justifyContent='center'
      gap='10px'
      alignItems={'center'}
      bottom={0} >
      <span id="footer-license">
        Desarrollado por <Link
          style={portfolioLinkStyle}
          href='https://javierhidalgodev.github.io/portfolio/'
          target='_blank'
          rel='noopener'
          underline='none'
          sx={{'&:hover': {transform: 'translateY(-2px)', textShadow: '0 3px rgba(255, 255, 255, .3)'}}}>
          javierhidalgo
        </Link> en 2024
      </span>
      <Divider
        orientation="vertical"
        flexItem
        aria-hidden="true" />
      <Tooltip title='Repositorio' placement='top' arrow>
        <Link
          href='https://github.com/javierhidalgodev/shurltener'
          target='_blank'
          rel='noopener'
          display='flex'
          color='primary' >
          <GitHubIcon sx={{'&:hover': {fill: '#bcd60f'}, transition: '100ms'}} />
        </Link>
      </Tooltip>
    </Box>
  )
}

export default Footer