import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  TableHead,
  TableRow,
  TableBody,
  Table,
  TableCell,
  TableContainer,
} from "@material-ui/core";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import "../common/Overview/Overview.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const columns = [
  { id: "id", label: "Customer ID" },
  {
    id: "email",
    label: "Email"
  },
  {
    label: "Approve / Deny Customer account"
  }
];

// Overrides the current default theme provided by the material UI
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  approveButtonStyle: {
    background: "#00a152",
    color: "#fff",
    margin: "5px 5px 5px 5px",
    cursor: "pointer"
  },

  denyButtonStyle: {
    background: "#d32f2f",
    color: "#fff",
    cursor: "pointer"
  }
}));

export default function ApprovalStatus() {
  const classes = useStyles();

  const [allCustomerState, setAllCustomerState] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [click, setClick] = useState(false)

  // Upon loading, useEffect will get called
  useEffect(() => {
    getAllCustomer();
    setClick(false)
  }, [click]);


  const getAllCustomer = () => {
    axios
      .get(`http://localhost:8083/adminDashboard/pendingAcc`, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      })
      .then((response) => {
        setAllCustomerState(response.data);
      })
      .catch((error) => console.log(error));
  };
  const updateStatus = (id, status) => {
    var config = {
      method: 'post',
      url: 'http://localhost:8083/adminDashboard/updateStatus',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ "id": id, "account_status": status })
    };

    axios(config)
      .then()
      .catch(function (error) {
        console.log(error);
      });

  };

  const onClickApprove = (event) => {
    const status = "Active";
    updateStatus(event.target.value, status);
    setClick(true)
  };

  const onClickDeny = (event) => {
    const status = "Rejected";
    updateStatus(event.target.value, status);
    setClick(true)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Grid item xs={12}>
        <Paper className="paper" elevation={3}>
          <div>
            <h2 className="paymentHistoryTitle">Customer Account Approval</h2>
          </div>

          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="paymentTableHead">
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id+1}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allCustomerState
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id+1}>
                      <TableCell
                        style={{ letterSpacing: "2px" }}
                        width="30%"
                        component="th"
                        scope="row"
                        id={row.id}
                        className="paymentTableCell"
                      >
                        {row.id}
                      </TableCell>

                      <TableCell style={{ letterSpacing: "2px" }} width="30%">
                        {row.Email}
                      </TableCell>
                      <TableCell
                        style={{ letterSpacing: "2px" }}
                        width="25%"
                        className="paymentTableCell"
                      >
                        <button
                          className={classes.approveButtonStyle}
                          variant="contained"
                          value={row.id}
                          onClick={onClickApprove}
                        >
                          Approve
                          </button>
                        <button
                          className={classes.denyButtonStyle}
                          variant="contained"
                          value={row.id}
                          onClick={onClickDeny}
                        >
                          Deny
                          </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count= {0}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </div>
  );
}
