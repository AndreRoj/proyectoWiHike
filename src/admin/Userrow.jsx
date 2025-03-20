import React from 'react';
import PropTypes from 'prop-types';

const UserRow = ({ fecha, mensaje, aprobado, desaprobado, onAprobar, onDesaprobar }) => {
  const fechaFormateada = fecha?.seconds
    ? new Date(fecha.seconds * 1000).toLocaleString()
    : "Fecha no disponible";

  return (
    <div className="user-row">
      <div className="usuario-cell">{fechaFormateada}</div>
      <div className="usuario-cell">{mensaje || "Sin mensaje"}</div>
      <div className="usuario-cell">{aprobado ? "✅" : "❌"}</div>
      <div className="usuario-cell">{desaprobado ? "✅" : "❌"}</div>
      <div className="usuario-cell">
        <button onClick={onAprobar}>Aprobar</button>
        <button onClick={onDesaprobar}>Desaprobar</button>
      </div>
    </div>
  );
};


UserRow.propTypes = {
  fecha: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ seconds: PropTypes.number, nanoseconds: PropTypes.number })
  ]),
  mensaje: PropTypes.string,
  aprobado: PropTypes.bool,
  desaprobado: PropTypes.bool,
  onAprobar: PropTypes.func.isRequired,
  onDesaprobar: PropTypes.func.isRequired
};

export default UserRow;
