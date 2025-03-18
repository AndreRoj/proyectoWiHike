import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useNavigate } from "react-router"




const PaypalButtonComponent = ({ precio }) => {
    const navigate = useNavigate()


    const initialOptions = {
        "client-id": "ARTaVqbQi3NLnHEoyZdCJI1QYiR9iUUw_Nz5PBbwzAo-0q3lQ1Id0fAXBQflHnqjiD6s71zdAatipnot",
        currency: "USD",
        intent: "capture",
    }





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
        })
    }


    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const name = details.payer.name.given_name

            console.log(name)
            console.log("")

            navigate('/exitosa')

        })
    }


    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
    )





}




export default function BotonPaypal({ precio }) {
    return (
        <>


            <PaypalButtonComponent precio={precio} />

        </>
    )
}