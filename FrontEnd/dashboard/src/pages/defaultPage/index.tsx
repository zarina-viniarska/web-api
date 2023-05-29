import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Paper from '@mui/material/Paper';

const DefaultPage: React.FC = () => {
  const { user } = useTypedSelector((store) => store.UserReducer);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{user.Name}</TableCell>
            <TableCell>{user.Surname}</TableCell>
            <TableCell>{user.Email}</TableCell>
            <TableCell>{user.PhoneNumber}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DefaultPage;
