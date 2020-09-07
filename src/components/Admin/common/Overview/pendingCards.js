import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import './Overview.css';

export default function PendingCards(props) {
  return (
    <React.Fragment>
      <div className="textCenter"> 
        <Title>Pending CreditCard Approval</Title>
        <Typography component="p" variant="h4">
          {props.cardCount}
        </Typography>
      </div>
    </React.Fragment>
  );
}