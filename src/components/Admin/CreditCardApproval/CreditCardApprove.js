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
  { id: "email", label: "Email" },
  { id: "creditcard_type", label: "Card Type" },
  { id: "card_id", label: "Approve / Deny CreditCard" },

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

export default function CreditCardApprove() {
  const classes = useStyles();

  const [allCustomerState, setAllCustomerState] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [click, setClick] = useState(false)

  // Upon loading, useEffect will get called
  useEffect(() => {
    getPendingsCreditCard();
    setClick(false)
  }, [click]);


  const getPendingsCreditCard = () => {
    axios
      .get(`http://localhost:8083/adminDashboard/pendingcards`, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      })
      .then((response) => {
        setAllCustomerState(response.data);
      })
      .catch((error) => console.log(error));
  };

  const updateCreditCard = (id, type, status) => {

    var config = {
      method: 'post',
      url: 'http://localhost:8083/adminDashboard/updateCard',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ "id": id, "card_status": status, "card_type": type })
    };

    axios(config)
      .then((res) => {
        setClick(true)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onClickApprove = (event) => {
    const data = event.target.value.split("-");
    updateCreditCard(data[0], data[1], "Active");
  };

  const onClickDeny = (event) => {
    const data = event.target.value.split("-");
    updateCreditCard(data[0], data[1], "Rejected");
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
            <h2 className="paymentHistoryTitle">Customer CreditCard Application</h2>
          </div>

          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="paymentTableHead">
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
                {allCustomerState
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.card_id}>
                      <TableCell
                        style={{ letterSpacing: "2px" }}
                        width="25%"
                        component="th"
                        scope="row"
                        id={row.card_id}
                        key={row.card_id}
                        className="paymentTableCell"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell style={{ letterSpacing: "2px" }} width="25%">
                        {row.email}
                      </TableCell>
                      <TableCell style={{ letterSpacing: "2px" }} width="25%">
                        {row.creditcard_type}
                      </TableCell>

                      <TableCell
                        style={{ letterSpacing: "2px" }}
                        width="25%"
                        className="paymentTableCell"
                      >
                        <button
                          className={classes.approveButtonStyle}
                          variant="contained"
                          value={row.card_id + "-" + row.creditcard_type}
                          onClick={onClickApprove}
                        >
                          Approve
                          </button>
                        <button
                          className={classes.denyButtonStyle}
                          variant="contained"
                          value={row.card_id + "-" + row.creditcard_type}
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
            count={0}
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
