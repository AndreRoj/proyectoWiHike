function Usuario({nombre, apellido, correo, telefono, fechadenacimiento, cedula}) {
    return (
        <li className="usuario">
            <p> Nombre:{nombre} </p>
            <p> Apellido:{apellido} </p>
            <p> Correo:{correo} </p>
            <p> Telefono:{telefono} </p>
            <p> Fecha de nacimiento:{fechadenacimiento} </p>
            <p> Cedula:{cedula} </p>

        </li>

    );
}
export default Usuario;