import React from 'react';
import ReactDOM from 'react-dom'
import history from './history'

const Modal = props =>{
    return ReactDOM.createPortal(
        <div onClick={()=>history.push('/')} className="ui dimmer modals visible active">
            <div className="ui standard modal visible active ">
                <div className="header">
                    Delete stream
                </div>
                <div className="content">
                    {props.content}
                </div>
                <div className="action" style={{textAlign:'right', padding:'0px 20px 20px 0px'}}>
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal;