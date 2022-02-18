import React from 'react';

import './ErrorMessage.css';

export interface ErrorMessageProps {
  errorMessage: string;
}

export default function ErrorMessage(props: ErrorMessageProps): JSX.Element {
  return (
    <div className='error_message_container'>
      {props.errorMessage && (
        <p className='error_message_paragraph'>{props.errorMessage}</p>
      )}
    </div>
  );
}
