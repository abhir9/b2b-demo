import React, {useContext} from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
    TableRow,
    TableHead,
    TableCell,
    Button,
    MenuItem,
    TextField,
    Box,
    CircularProgress
    } from '@material-ui/core';
    import {fetchRequest} from "../../utils";
    import UserContext  from './../LoginContext';
    import {apiEndpoint} from "../../config";
    import {
      Snackbar,
      IconButton
      } from '@material-ui/core';
      import {
        Close
        } from '@material-ui/icons';
const columns = [
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
  {id:'action', label:'Action'}
];

const rows = [];


const currencies = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Developer',
    label: 'Developer',
  },
  {
    value: 'Marketeer',
    label: 'Marketeer',
  },
  {
    value: 'Product Manager',
    label: 'Product Manager',
  },
];
export default function Team() {
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addTeamMemebrBox, setAddTeamMemebrBox] = React.useState(false);
  const {user} = useContext(UserContext)
  const [rowUpdate, setRowUpdate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (e) => {
    if(e.target.value){
      setRole(e.target.value.trim());
    }
  };
  const getTeamMember =  () =>{
    setLoading(true);
    fetch(`${apiEndpoint}/team?name=`+ "61666857e8e9a9f8be4b1888")
    .then(response => response && response.json())
    .then(data => {
      try{
        if(data.Data.length){
          data.Data.map((record)=>{
            if(record){
      rows.push({email:record.Email[0].Value,role:record.RoleContext.Roles})
            }
          })
        }
        setLoading(false);
      }
      catch(e){}
    });

  }
  const addteammember = async () =>{
  let teamMember =  await fetchRequest("post", "/team", {email:email,ownerid:user.organization,roles:[role]});
  if(teamMember.ErrorCode){
    setOpen(true)
    setMessage("User is alreday mapped with the organization.");
    
  }
  else {
    setOpen(true)
    setMessage("User is added sucessfully to this organization.")
  }
  getTeamMember();
  }
  React.useEffect(() => {
    if(rows.length === 0){
      getTeamMember();
    }
  },[rows, rowUpdate])
  return (
    <React.Fragment>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
       <Snackbar
  anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
  open={open}
  onClose={()=>{
    setOpen(false)
  }}
  message={message}
 // key={vertical + horizontal}
 action={
  <React.Fragment>
    <IconButton
      aria-label="close"
      color="inherit"
      sx={{ p: 0.5 }}
      onClick={()=>{
        setOpen(false)
      }}
    >
      <Close />
    </IconButton>
  </React.Fragment>
}
/>
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
          
              {rows.length ? (
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

              ): <TableRow>
              <TableCell colSpan={6}>{loading ?<Box sx={{ display: 'flex' }}> <CircularProgress /> </Box>
 :"No Record Found"}</TableCell>
            </TableRow> }
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
      />:""}



    

    </Paper>

<Button
color="secondary"
onClick={()=>{
 setAddTeamMemebrBox(!addTeamMemebrBox);
}}
variant="contained"
>
Add Team Member
</Button>
  {addTeamMemebrBox && <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '100%', margin: '3px' },
    }}
    noValidate
    autoComplete="off"
  >
  <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{
  if(e.target.value){
    setEmail(e.target.value.trim());
  }
  }}/>
  <TextField variant="outlined"
            id="outlined-select-currency"
            select
            label="Select"
            value={role}
            onChange={handleChange}
            helperText="Please select your role"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
              
             <Button
          color="secondary"
          disabled={user.role && !user.role.includes("Owner")}
          onClick={()=>{
            addteammember();
          }}
          variant="contained"
        >
          Add
        </Button>
        <Button
        
          onClick={()=>{
            setAddTeamMemebrBox(false);
          }}
          variant="contained"
        >
          Cancel
        </Button>
  
  </Box>}
  </React.Fragment>
  );
}
