import React, { useState } from 'react';
import './Routeitem.css';
import { MdOutlineCheckBox } from 'react-icons/md';
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const Routeitem = ({name}) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

  return (
    <>
      <div className='Routeitem-item'>
        <h3>{name}</h3>
        <div className='Routeitem-icon' onClick={handleCheck}>
            {isChecked ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
        </div>
      </div>
    </>
  )
}

export default Routeitem
