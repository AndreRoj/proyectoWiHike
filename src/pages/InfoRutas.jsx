import {InfoRuta} from '../components/InfoRuta'
import { Navbar } from '../components/Navbar';
import "./HomePage.css";

export default function InfoRutas() {
    return (
        <div className='HomePage'>
            <InfoRuta
            nombre="Sabas Nieves"
            estrellas="5"
            imagenPrincipal="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTYxNzU0NzIvZGYzZWZiNmIwZDRmOTZhMDQ5ZDExZGM0NjYyYThmZWUuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
            imagen2="https://static.wixstatic.com/media/a416cc_266ea48fe572468db584d052383f55fb~mv2.jpeg/v1/fill/w_560,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a416cc_266ea48fe572468db584d052383f55fb~mv2.jpeg"
            imagen3="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNzc4ODI2ODgvODAwNTE5MjIxZmU0YTc5NDIxMjVlZjZmNDIyY2RmNmUuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ=="
            descripcion="Ruta de ida y vuelta de 3,9-km cerca de Municipio Sucre, Miranda. Se considera una ruta moderada con una duracion media de 1 h 55 min. Es una región muy popular para el senderismo y pasear, por lo que es probable encontrarse con otras personas mientras se está por la zona. "
            distancia="3,9"
            desnivel_positivo='356'
            // duracion dividido colocando las horas y los minutos por separado
            horas="1"
            minutos="55"
            dificultad="Alta"
            paseo= {true}
            acampada= {true}
            URLmap='https://maps.app.goo.gl/HQEkU29bpPdawtue7'
            />
        </div>
        
    );
}