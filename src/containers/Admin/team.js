import * as React from 'react';
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
    Box
    } from '@material-ui/core';
const columns = [
  { id: 'email', label: 'Email' },
  { id: 'Role', label: 'Role' },
  {id:'action', label:'Action'}
];

const rows = [];


const currencies = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'developer',
    label: 'Developer',
  },
  {
    value: 'marketier',
    label: 'Marketier',
  },
  {
    value: 'manager',
    label: 'Product Manager',
  },
];
export default function Team() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
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
              <TableCell colSpan={6}>No Record Found</TableCell>
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

<Button
        color="secondary"
        onClick={()=>{
         
        }}
        variant="contained"
      >
        Add Team Member
      </Button>

      <Box
  component="form"
  sx={{
    '& .MuiTextField-root': { m: 1, width: '100%', margin: '3px' },
  }}
  noValidate
  autoComplete="off"
>
<TextField id="outlined-basic" label="Email" variant="outlined" />
<TextField variant="outlined"
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
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
        onClick={()=>{
         
        }}
        variant="contained"
      >
        Build
      </Button>

</Box>
    </Paper>
  );
}
