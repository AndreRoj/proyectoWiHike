import React from 'react';
import './Edititem.css';

const Edititem = ({ label, name, value, onChange }) => {
  return (
    <div className='Edititem-item'>
      <h3>{label}</h3>
      <input
        type="text"
        name={name} 
        value={value} 
        onChange={onChange}
      />
    </div>
  );
};

export default Edititem;