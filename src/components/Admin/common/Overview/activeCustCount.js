import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import './Overview.css';

export default function ActiveCustCount(props) {
  return (
    <React.Fragment>
      <div className="textCenter"> 
        <Title>Total Active Customer</Title>
        <Typography component="p" variant="h4">
          {props.custCount}
        </Typography>
      </div>
    </React.Fragment>
  );
}