import React from 'react'
import { FiEdit } from "react-icons/fi";
import './Edititem.css';

const Edititem = ({label}) => {
  return (
    <div className='Edititem-item'>
        <h3>{label}</h3>
        <input type="edititem"></input> {/* Deberia ser un input, que guarde el dato*/}
        <div className='Edititem-icon'>
            <FiEdit />
        </div>
    </div>
  )
}

export default Edititem
