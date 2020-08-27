import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Toast from './toast';

const ErrorMessage = ({ error }) => (
  
    <Fragment>

    {error && <Toast mess={error.message} />}
    
  

  </Fragment>
);

export default connect(store => ({ error: store.error }))(ErrorMessage);