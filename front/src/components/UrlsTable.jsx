/* eslint-disable react/prop-types */
import { Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"

const UrlsTable = ({ urls }) => {
  return (
    <Table className="urls" sx={{ margin: '40px 0' }}>
      <TableHead>
        <TableRow>
          <TableCell>Original URL</TableCell>
          <TableCell sx={{ width: '30%' }}>Shorted URL</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          urls.map(url =>
            <TableRow key={url.id} >
              <TableCell>{url.originalURL}</TableCell>
              <TableCell>
                <Link href={url.originalURL} target='_blank' rel='noopener' underline='hover' color='primary'>{url.shortedURL}</Link>
              </TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}

export default UrlsTable