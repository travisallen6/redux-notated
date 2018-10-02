import React from 'react';
import './EditGuest.css';

export default function EditGuest(props) {
    return (
    <div className="modal-bg">
      <div className="modal">
        <input value={ props.guestToEdit } className="modal-input" onChange={ props.edit }/>
        <button onClick={props.submit} className="modal-btn">Update</button>
        <button onClick={props.cancel} className="modal-btn">Cancel</button>
      </div>
    </div>
    )
}
  