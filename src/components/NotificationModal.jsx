import React from 'react'
import './NotificationModal.css'

import { Card } from '@mui/material'
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import CloseIcon from '@mui/icons-material/Close';

const NotificationModal = (props) => {

  const closeModal = (e) => {
    e.stopPropagation
    props.closeModal();
  } 

  return (
    <>
    <div className="page-width">
        <Card className="modal">
            <div className="modal-header">
              <div className="modal-header-message-icon">
                <MarkunreadMailboxIcon />
                <span className="modal-header-message">{props.header}</span>
              </div>                
                <CloseIcon className="modal-close" onClick={closeModal}/>
            </div>
            <div className="modal-body">
            {props.body}
            </div>
        </Card>
    </div>
    <div className="modal-background" onClick={closeModal}/>
    </>
  )
}

export default NotificationModal