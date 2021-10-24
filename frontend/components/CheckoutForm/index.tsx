import * as Chakra from '@chakra-ui/react'
import { CardElement, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

export const CheckoutForm = () => {

    const handleSubmit = (e) => {
        // Stop the form from submitting and turn the loader on
        e.preventDefault()

        // Create the payment method via stripe

        // Handle any errors from stripe

        // Send token to keystone server via custom mutation

        // Turn the loader off

        // Change the page to view the order
    }

    return (
        <Elements stripe={stripeLib}>
            <Chakra.Box boxShadow="md" mt="4" p="2" as="form" onSubmit={handleSubmit}>
                <CardElement/>
                <Chakra.Button w="full" mt="4" type="submit">Check out now</Chakra.Button>
            </Chakra.Box>
        </Elements>
    )
}