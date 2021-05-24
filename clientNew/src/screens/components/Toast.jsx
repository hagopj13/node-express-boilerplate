import { Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useEffect, useState } from 'react';

const Toast = ({ showAlert, severity, onClose, message }) => {
  const [open, setOpen] = useState(showAlert);

  useEffect(() => {
    setOpen(showAlert);
  }, [showAlert]);

  return (
    <Collapse in={open}>
      <Alert
        style={{ backgroundColor: 'rgb(232, 202, 198)' }}
        severity={severity}
        onClick={() => {
          setOpen((p) => !p);
          onClose();
        }}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default Toast;
