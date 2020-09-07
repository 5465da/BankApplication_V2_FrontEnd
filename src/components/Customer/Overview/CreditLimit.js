import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import './Overview.css';

export default function CreditLimit(props) {
  return (
    <React.Fragment>
      <div className="textCenter"> 
        <Title>Credit Limit</Title>
        <Typography component="p" variant="h4">
          ${props.limit}
        </Typography>
      </div>
    </React.Fragment>
  );
}