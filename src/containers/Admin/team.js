import React, { useContext, Component } from 'react';
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
  CircularProgress,
  Typography
} from '@material-ui/core';
import { fetchRequest } from "../../utils";
import UserContext from './../LoginContext';
import { apiEndpoint } from "../../config";
import {
  Snackbar,
  IconButton
} from '@material-ui/core';

import {
  Close,
  Delete,
  Edit
} from '@material-ui/icons';
const columns = [
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
  { id: 'action', label: 'Action' }
];
//const rows = [];
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
class Team extends React.Component {
  state = {
    loading: false,
    page: 0,
    role: "",
    email: '',
    open: false,
    messge: "",
    id: '',
    rowsPerPage: 2,
    addTeamMemebrBox: false,
    rows: [],
    updaterole:"",
    editRole:""
  };
  componentDidMount() {
    this.getTeamMember();
  }
  static contextType = UserContext;
  getTeamMember = () => {
    const { user, setUser } = this.context;


    this.setState({ loading: true, rows: [] }, () => {
      fetch(`${apiEndpoint}/team?name=` + user.organization)
        .then(response => response && response.json())
        .then(data => {
          try {
            const { rows } = this.state;
            this.setState({ loading: false });
            if (data.Data.length) {
              data.Data.map((record) => {
                if (record) {
                  rows.push({
                    email: record.Email[0].Value, role: record.RoleContext.Roles, uid: record.Uid
                  });

                }
              })
              this.setState({ rows: rows })
            }

          }
          catch (e) {

            this.setState({ loading: false });
          }
        });
    });


  }
  addteammember = async () => {
    const { user } = this.context;
    const { email, role } = this.state;
    let teamMember = await fetchRequest("post", "/team", { email: email, ownerid: user.organization, roles: [role] });
    if (teamMember.ErrorCode) {

      this.setState({ addTeamMemebrBox: false, email: "", role: "", open: true, message: "User is alreday mapped with the organization." });

    }
    else {
      this.setState({ addTeamMemebrBox: false, email: "", role: "", open: true, message: "User is added sucessfully to this organization" });
      this.getTeamMember();
    }
    
  }
   
   updateteamrole = async (uid) => {
    const { user } = this.context;
    const { updaterole } = this.state;
    let updateRole = await fetchRequest("put", "/role", { uid: uid, ownerid: user.organization, roles: [updaterole] });
    if (updateRole.ErrorCode) {

      this.setState({ updaterole: "", editRole: "", message: "Unable to update role for this user." });

    }
    else {
      this.setState({ updaterole: "", editRole: "", message: "Role has updated sucessfully." });
      this.getTeamMember();
    }
    
  }


  render() {
    const { editRole, rows, loading, updaterole, role, addTeamMemebrBox, open, message, rowsPerPage, page } = this.state;
    const { user } = this.context;

    return (
      <React.Fragment>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={() => {
              this.setState({ open: false })
            }}
            message={message}
            // key={vertical + horizontal}
            action={
              <React.Fragment>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  sx={{ p: 0.5 }}
                  onClick={() => {

                    this.setState({ open: false })
                  }}
                >
                  <Close />
                </IconButton>
              </React.Fragment>
            }
          />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" style={loading? {overflow: 'hidden'}:{}}>
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

                {loading ? <Box sx={{ display: 'flex' }}> <CircularProgress /> </Box> : rows.length ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <React.Fragment key={column.id}>
                                {column.id === "email" && <TableCell key={column.id} align={column.align}>
                                  {value} 
                                </TableCell>}
                                {column.id === "role" && <TableCell key={column.id} align={column.align}>
                                  {editRole && editRole === row["uid"]? 
                                    <React.Fragment>    <TextField variant="outlined"
                                        id="outlined-select-currency"
                                        select
                                        label="Select"
                                        value={updaterole || row['role']}
                                        onChange={(e) => {
                                          this.setState({ updaterole: e.target.value.trim() })
                                        }}
                                        helperText="Please select your role"
                                      >
                                        {currencies.map((option) => (
                                          <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                      <div style={{marginTop:"24px"}}></div>
                                      <Button
               color="primary"
                onClick={() => {
                  this.updateteamrole(row['uid'])
                }}
                variant="contained"
              >
                Save
              </Button>
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => {
                  this.setState({editRole:""})
                }}
                variant="contained"
              >
                Cancel
              </Button>
                        </React.Fragment>
                                  : value}
                                </TableCell>}

                                {column.id === "action" && <TableCell key={column.id} align={column.align}>
                                  <React.Fragment>
                                    {row['role'] && row['role'].includes("Owner") ? "" :
                                      <div>
                                        <IconButton  disabled={user.role.includes("Product Manager") || user.role.includes("Marketeer") || user.role.includes("Developer")} color="primary" aria-label="edit role" component="span" onClick={() => {
                                          // showSection(record);
                                          this.setState({editRole:row["uid"]})
                                        }}>
                                          <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton disabled={user.role.includes("Product Manager") || user.role.includes("Marketeer") || user.role.includes("Developer")} color="primary" aria-label="delete" component="span" onClick={() => {
                                          //  setLoading(true);
                                          this.setState({ loading: true })
                                         const deleteMemeber =  fetchRequest("delete", "/team", { orgId: user.organization, uids: row['uid'] }).then((data) => {
                                          this.setState({ loading: false })
                                          if(!deleteMemeber.ErrorCode){
                                            var _rows =  rows.filter((team)=>team.uid !== row['uid']);
                                            
                                            this.setState({rows:_rows, open:true, message:"user is deleted successfully."});

                                          }
                                            
                                          });
                                        }}>
                                          <Delete fontSize="small" />
                                        </IconButton>
                                      </div>}
                                  </React.Fragment>
                                </TableCell>}
                              </React.Fragment>
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
              rowsPerPageOptions={[2, 5, 10]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, newPage) => {
                this.setState({ page: newPage })
              }}
              onRowsPerPageChange={(event) => {
                this.setState({ page: 0, rowsPerPage: +event.target.value })
              }}
              SelectProps={{
                inputProps: {
                  'aria-label': '',
                },
                native: true,
              }}
            /> : ""}





        </Paper>

        {!addTeamMemebrBox && <Button
          color="primary"
          onClick={() => {

            this.setState({ addTeamMemebrBox: true, email: "", role: "" })
          }}
          disabled={user.role.includes("Admin") || user.role.includes("Product Manager") || user.role.includes("Marketeer") || user.role.includes("Developer")}
          variant="contained"
          style={{ "margin": '5px' }}
        >
          Add Team Member
        </Button>
        }
        {addTeamMemebrBox &&
          <div style={{ width: '50%' }}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '100%', margin: '3px' },
                mt: 5
              }}
              noValidate
              autoComplete="off"
            >
              <Typography>Add New Team memeber to your Organization</Typography>
              <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => {
                if (e.target.value) {

                  this.setState({ email: e.target.value.trim() })
                }
              }} />
              <TextField variant="outlined"
                id="outlined-select-currency"
                select
                label="Select"
                value={role}
                onChange={(e) => {
                  this.setState({ role: e.target.value.trim() })
                }}
                helperText="Please select your role"
              >
                {currencies.map((option) => {
                  if(!user.role.includes(option.value)){
                  return <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                  }
                })}
              </TextField>

              <Button
               color="primary"
                disabled={user.role && !user.role.includes("Owner")}
                onClick={() => {
                  this.addteammember();
                }}
                variant="contained"
              >
                Add
              </Button>
              <Button
                style={{ marginLeft: '15px' }}
                onClick={() => {
                  this.setState({ addTeamMemebrBox: false });
                }}
                variant="contained"
              >
                Cancel
              </Button>

            </Box>
          </div>
        }
      </React.Fragment>


    );
  }
}

export default Team;
