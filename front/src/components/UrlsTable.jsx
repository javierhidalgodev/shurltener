/* eslint-disable react/prop-types */
import { Link, Button, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material"
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon  from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material'
import { useSnackbar } from 'notistack'
import { deleteUserURL } from "../services/userServices";

const API = 'https://shurltener-api.vercel.app/api/shorted/'

const UrlsTable = ({ urls, setURLs, user }) => {
  const { enqueueSnackbar } = useSnackbar()
  
  const handleClipBoardURL = async (url) => {
    try {
      await navigator.clipboard.writeText(`${API}${url.shortedURL}`)
      enqueueSnackbar('Copy to clipboard', {variant: 'success', anchorOrigin: {horizontal: 'center', vertical: 'bottom'}, style: {background: '#c5e500', color: 'black', width: 'fit-content'}})
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteURL = async urlToDelete => {
    const newUserURLs = await deleteUserURL(urlToDelete, user)
    // console.log(newUserURLs)
    setURLs(newUserURLs)
  }

  return (
    <Box sx={{overflowX: 'auto', width: '100%'}}>
      <Table className="urls" sx={{margin: '40px 0'}}>
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell sx={{textWrap: 'nowrap'}}>Shorted URL</TableCell>
            <TableCell>Copy</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            urls.map(url =>
              <TableRow key={url.id} >
                <TableCell sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px', width: '100%'}}>{url.originalURL}</TableCell>
                <TableCell width='max-content'>
                  <Link href={url.originalURL} target='_blank' rel='noopener' underline='hover' color='#dbff00'>{url.shortedURL}</Link>
                </TableCell>
                <TableCell>
                  <Tooltip title='Copy to clipboard' placement='left' arrow>
                    <Button variant='text' sx={{minWidth: 'fit-content', color: '#dbff00', '&:hover': {background: '#c5e50080'}}} onClick={() => handleClipBoardURL(url)}>
                      <ContentPasteIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title='Delete' arrow>
                    <Button variant='text' sx={{minWidth: 'fit-content', color: '#dbff00', '&:hover': {background: '#c5e50080'}}} onClick={() => handleDeleteURL(url)}>
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </Box>
  )
}

export default UrlsTable