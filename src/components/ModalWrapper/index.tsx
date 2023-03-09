import React from 'react'
import { Modal, Box } from "@mui/material";
import type { TChildrenProps } from 'common/types.common';

interface IModalWrap {
  children: TChildrenProps;
  handleClose: Function;
  open?: boolean
}

const ModalWrap = ({
  children,
  open = false,
  handleClose
}: IModalWrap) => {
  return (
    <Modal
      sx={{transition: '1s'}}
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-testid="modal__reusable__component"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transition: '1s',
        transform: 'translate(-50%, -50%)',
        width: '320px' 
        }}
      >
        {children}
      </Box>
    </Modal>
  )
}

export default ModalWrap