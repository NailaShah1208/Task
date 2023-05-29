import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
export default function ButtonAppBar() {
  const [collection, setCollection] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getApi()
  }, [])
  const deleteFun = (id) => {
    console.log("delete id=", typeof (id));


    axios.delete(`http://localhost:5000/post/${id}`).then((res) => {
      console.log("delete response", res)
    })
      .catch((err) => { console.log(" delete err", err) })
  }
  function getApi() {
    axios.get('http://localhost:5000/post/').then((res) => {
      console.log("response is=", res);
      const { data } = res;
      setCollection(data);
    })
      .catch((err) => {
        console.log(err)
      })

  }
  const handleEdit = (id) => {
    console.log("eddit id=", id);
    navigate(`/edit/${id}`)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Car Details
          </Typography>
          <Button color="success" variant='contained' onClick={() => { navigate('/add') }} >Add</Button>
        </Toolbar>
      </AppBar>
      <Box>
        <TableContainer>
          <Table sx={{ border: '2px solid black', mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                collection.map((elem) => {
                  console.log("elem", elem);
                  return <TableRow>
                    <TableCell>{elem.title}</TableCell>
                    <TableCell>{elem.model}</TableCell>
                    <TableCell>{elem.price}</TableCell>
                    <TableCell><DeleteIcon onClick={() => deleteFun(elem.id)} /></TableCell>
                    <TableCell><Button variant="contained" onClick={() => handleEdit(elem.id)}>Edit</Button></TableCell>
                  </TableRow>
                })
              }
            </TableBody>

          </Table>
        </TableContainer>
      </Box>
    </Box >
  );
}