import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import './Overview.css';

export default function PendingCustomerStatus(props) {
  return (
    <React.Fragment>
      <div className="textCenter">
        <Title>Pending Customer Status</Title>
        <Typography component="p" variant="h4">
          {props.custCount}
        </Typography>
      </div>
    </React.Fragment>
  );
}