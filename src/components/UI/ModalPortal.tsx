import React, { useEffect } from 'react';
import { Portal } from './Portal';
import { Backdrop } from './Backdrop';
import classes from './ModalPortal.module.scss';

type PropsType = {
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
  targetId?: string;
};

const ModalPortal: React.FC<PropsType> = ({ open, children, handleClose, targetId }) => {
  const container = document.getElementsByClassName(classes['portal'])[0] as HTMLElement;

  useEffect(() => {
    const container = document.getElementsByClassName(classes['portal'])[0] as HTMLElement;
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
  }, [container]);

  return open ? (
    <Portal className={classes['portal']}>
      <Backdrop handleOpen={handleClose} />
      <div className={classes['modal__child']}>{children}</div>
    </Portal>
  ) : (
    <></>
  );
};

export default ModalPortal;
