import  React, {useContext} from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  TableHead,
  TableCell,
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Snackbar
} from '@material-ui/core';
import UserContext  from './../LoginContext';
import {
  Delete,
  Edit
} from '@material-ui/icons';
import { fetchRequest } from "../../utils";
const columns = [
  { id: 'name', label: 'Name' },
  { id: 'body', label: 'Critieira' },
  { id: 'action', label: 'Action' }
];
const API = process.env.REACT_APP_API || 'http://localhost:3072';


var rows = [];

export default function StickyHeadTable({showSection}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [calledAPI, setcalledAPI] = React.useState(false);
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const {user} = useContext(UserContext);
  React.useEffect(() => {
  

    if (!calledAPI) {
      setLoading(true);
     
      fetch(`${API}/data?orgid=`+user.organization)
        .then(response => response && response.json())
        .then(data => {
          setcalledAPI(true);
          if (data.length) {   
            rows = [];    
            data.map((record) => {
              rows.push({
                id: record.id, name: record.name, body: record.body, action:
                  <React.Fragment>
                    <IconButton disabled={user.role.includes("Marketeer") || user.role.includes("Developer")} color="primary" aria-label="edit" component="span" onClick={()=>{
                      showSection(record);
                    }}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton  disabled={user.role.includes("Marketeer") || user.role.includes("Developer")}  color="primary" aria-label="delete" component="span" onClick={() => {
                      setLoading(true);
                      fetchRequest("delete", "/data/"+record.id).then((data)=>{
                       
                        if(!data.errors){
                          rows =  rows.filter((persona)=>persona.id !== record.id);   
                        }
                        setLoading(false);
                      });
                    }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </React.Fragment>

              })
            })
          }
          setLoading(false);
        });
    }
  }, [loading, calledAPI])

  return (
    
    <React.Fragment>
      <Typography>Personas</Typography>
      <Box
        component="div"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%', margin: '3px' },
        }}
        noValidate
        autoComplete="off"
        style={{ padding: '40px' }}
      >
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
             
              
                {loading ? 
                <Box sx={{ display: 'flex' }}> <CircularProgress /> </Box>
                 : rows.length ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })

                ) : <TableRow>
                  <TableCell colSpan={6}>{loading ? <Box sx={{ display: 'flex' }}> <CircularProgress /> </Box>
                    : "No Record Found"}</TableCell>
                </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
          {rows.length ?
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              SelectProps={{
                inputProps: {
                  'aria-label': '',
                },
                native: true,
              }}
            /> : ""}
        </Paper>
      </Box>
    </React.Fragment>
  );
}
