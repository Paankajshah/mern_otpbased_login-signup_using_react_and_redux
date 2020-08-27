import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function tooast(props){
   toast(props.mess);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default tooast