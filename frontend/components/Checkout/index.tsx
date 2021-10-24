import * as Chakra from '@chakra-ui/react'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe, StripeError } from '@stripe/stripe-js'
import { useState } from 'react'
import NProgress from "nprogress"
import { Alert } from '@/components/Alert'

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

export const CheckoutForm = () => {
    const [cardError, setCardError] = useState<StripeError>()
    const [loading, setLoading] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    
    const handleSubmit = async (e) => {
        // Stop the form from submitting and turn the loader on
        e.preventDefault()
        setLoading(true)
        NProgress.start()
        
        // Create the payment method via stripe
        const { error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        // Handle any errors from stripe
        if(error) setCardError(error)
        
        // Send token to keystone server via custom mutation
        
        // Turn the loader off
        setLoading(false)
        NProgress.done()
        
        // Change the page to view the order
    }
    
    return (
        <Chakra.Box boxShadow="md" mt="4" p="2" as="form" onSubmit={handleSubmit}>
            {cardError && <Alert message={cardError.message} />}
            <CardElement/>
            <Chakra.Button w="full" mt="4" type="submit" isLoading={loading} loadingText="Submitting">Check Out</Chakra.Button>
        </Chakra.Box>
    )
}

export const Checkout = () => {
    
    return (
        <Elements stripe={stripeLib}>
            <CheckoutForm />
        </Elements>
    )
}