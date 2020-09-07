import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PendingCustomerStatus from "./PendingCustomerStatus";
import ActiveCustCount from "./activeCustCount";
import PendingAppCards from "./pendingCards";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import "./Overview.css";

const columns = [
  { id: "id", label: "Customer ID" },
  {
    id: "account_status",
    label: "Account Status",
  },
  {
    id: "email",
    label: "Email"
  },
  {
    id: "creditcard_balance",
    label: "Balance",
    format: (value) => "$" + value.toFixed(2),
  },
  {
    id: "creditcard_type",
    label: "Card Type",
  },
  {
    id: "creditcard_status",
    label: "Card Status",
  },
  {
    id: "creditcard_limit",
    label: "Card Limit",
    format: (value) => "$" + value.toFixed(2),
  }
];

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Overview() {

  const [custPendingCount, setPendingCustomerState] = useState(0);
  const [custActiveCount, setActiveCount] = useState(0);
  const [custPendingCards, setPendingCreditCardState] = useState(0);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  var arr = [];
  useEffect(() => {
    getTotalCustomer();
    getPendingCustomer();
    getPendingCreditCardStatus();
    getAllCustomer();
  }, []);

  const getTotalCustomer = () => {
    axios
      .get(`http://localhost:8083/adminDashboard/users/active`, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      })
      .then((response) => {
        setActiveCount(response.data.length);
      })
      .catch((error) => console.log(error));
  };

  const getPendingCustomer = () => {
    axios
      .get(`http://localhost:8083/adminDashboard/pendingAcc`, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      })
      .then((response) => {
        setPendingCustomerState(response.data.length);
      })
      .catch((error) => console.log(error));
  };

  const getPendingCreditCardStatus = () => {
    axios
      .get(`http://localhost:8083/adminDashboard/pendingcards`, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      })
      .then((response) => {
        setPendingCreditCardState(response.data.length);
      })
      .catch((error) => console.log(error));
  };

  const getAllCustomer = () => {
    axios
      .get(`http://localhost:8083/adminDashboard/creditcards`, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => console.log(error));
  };

  const search = e => {
    let found = false;

    while (arr.length > 0) {
      arr.pop()
    }

    if (e.target.value != "") {
      for (let index = 0; index < rows.length; index++) {
        /*eslint eqeqeq: "off"*/
        if (rows[index].creditcard_balance == e.target.value
          || rows[index].creditcard_limit === e.target.value
          || rows[index].id === e.target.value
          || rows[index].account_status == e.target.value
          || rows[index].creditcard_type === e.target.value
          || rows[index].email === e.target.value
          || rows[index].creditcard_status == e.target.value
        ) {
          arr.push(rows[index])
          found = true;
        }
      }

      if (found == false) {
        getAllCustomer();
      } else {
        resetState();
      }
      found = false;

    }
    else {
      getAllCustomer();
    }
  };

  const resetState = () => {
    setRows([...arr]);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();

  return (
    <main className="content">
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className="container">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="fixedHeightPaper" elevation={3}>
              <PendingCustomerStatus custCount={custPendingCount} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="fixedHeightPaper" elevation={3}>
              <ActiveCustCount custCount={custActiveCount} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="fixedHeightPaper" elevation={3}>
              <PendingAppCards cardCount={custPendingCards} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="paper" elevation={3}>
              <div>
                <h2 className="paymentHistoryTitle">Payment History</h2>
                <input type="text" className="searchBar" onChange={search} placeholder="Search"></input>
              </div>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" id="myTable">
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
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.card_id}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  className="paymentTableCell"
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}