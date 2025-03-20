import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

const PaypalButtonComponent = ({ precio, reservaId }) => {
    const navigate = useNavigate();
    const { profile } = useContext(UserContext); // Obtener el usuario logueado

    // 🔹 Depuración: Ver si `profile` tiene datos antes de ejecutar la lógica
    useEffect(() => {
        console.log("Datos del usuario en UserContext:", profile);
    }, [profile]);

    const initialOptions = {
        "client-id": "ARTaVqbQi3NLnHEoyZdCJI1QYiR9iUUw_Nz5PBbwzAo-0q3lQ1Id0fAXBQflHnqjiD6s71zdAatipnot",
        currency: "USD",
        intent: "capture",
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: precio.toString(),
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        return actions.order.capture().then(async function (details) {
            console.log("Pago exitoso", details);

            // 🔹 Verificar si el perfil del usuario tiene un ID
            if (!profile || !profile.uid)  {
                console.error("Error: No se encontró el ID del usuario. Asegúrate de que el usuario esté autenticado.");
                return;
            }

            try {
                const userId = profile.uid;

                // 🔹 1. Agregar el usuario a `personas` en la reserva (`programado`)
                const reservaRef = doc(db, "programado", reservaId);
                await updateDoc(reservaRef, {
                    personas: arrayUnion(userId),
                });

                console.log("✅ Usuario agregado a la reserva");

                // 🔹 2. Agregar `reservaId` a `proximasrutasusuario` en el usuario
                const userRef = doc(db, "users", userId);
                await updateDoc(userRef, {
                    proximasrutasusuario: arrayUnion(reservaId),
                });

                console.log("✅ Reserva añadida al usuario");

                // 🔹 3. Redirigir a la página de éxito
                navigate('/exitosa');

            } catch (error) {
                console.error("❌ Error al actualizar Firebase:", error);
            }
        });
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
    );
};





export default function BotonPaypal({ precio, reservaId }) {
    return <PaypalButtonComponent precio={precio} reservaId={reservaId} />;
}