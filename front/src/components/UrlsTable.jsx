/* eslint-disable react/prop-types */
import { Link, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon  from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material'
import { useSnackbar } from 'notistack'

const API = 'https://shurltener-api.vercel.app/api/shorted/'

const UrlsTable = ({ urls, setURLs }) => {
  const { enqueueSnackbar } = useSnackbar()
  
  const handleClipBoardURL = async (url) => {
    try {
      await navigator.clipboard.writeText(`${API}${url.shortedURL}`)
      enqueueSnackbar('Copy to clipboard', {variant: 'success', anchorOrigin: {horizontal: 'center', vertical: 'bottom'}, style: {background: '#c5e500', color: 'black', width: 'fit-content'}})
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteURL = urlToDelete => {
    const newURLs = urls.filter(url => url.id !== urlToDelete.id)
    setURLs(newURLs)
    localStorage.setItem('urls', JSON.stringify(newURLs))

  }

  return (
    <Table className="urls" sx={{ margin: '40px 0' }}>
      <TableHead>
        <TableRow>
          <TableCell>Original URL</TableCell>
          <TableCell sx={{ width: '30%' }}>Shorted URL</TableCell>
          <TableCell>Copy</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          urls.map(url =>
            <TableRow key={url.id} >
              <TableCell>{url.originalURL}</TableCell>
              <TableCell>
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
  )
}

export default UrlsTable