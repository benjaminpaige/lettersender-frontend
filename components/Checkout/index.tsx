import * as Chakra from "@chakra-ui/react"
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js"
import { loadStripe, StripeError } from "@stripe/stripe-js"
import { useState } from "react"
import NProgress from "nprogress"
import { Alert } from "@/components/Alert"
import { useMutation } from "@apollo/client"
import { CREATE_ORDER_MUTATION, CURRENT_USER_QUERY } from "@/graphql"
import { useRouter } from "next/router"
import { µCheckoutForm } from "./types"

// TODO: discuss other ways to load stripe;
// there may need to be a cancel subscription call;
const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

export const CheckoutForm = () => {
  const [cardError, setCardError] = useState<StripeError>()
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const [checkout, { error: graphQLError }] = useMutation(CREATE_ORDER_MUTATION)
  const router = useRouter()

  const handleSubmit: µCheckoutForm.HandleSubmit = async (e) => {
    // Stop the form from submitting and turn the loader on
    e.preventDefault()
    setLoading(true)
    NProgress.start()

    // Create the payment method via stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })

    // Handle any errors from stripe
    if (error) {
      setLoading(false)
      setCardError(error)
      NProgress.done()
      return
    }

    // Send token to keystone server via custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    }).catch((e) => {
      console.log(e)
      setCardError(error)
    })

    // Turn the loader off
    setLoading(false)
    NProgress.done()

    if (order) {
      // Change the page to view the order
      router.push("/dashboard/orders")
    }
  }

  return (
    <Chakra.Box boxShadow="md" mt="4" p="2" as="form" onSubmit={handleSubmit}>
      {cardError && <Alert message={cardError.message} mb="3" />}
      {graphQLError && <Alert message={graphQLError.message} mb="3" />}
      <CardElement
        options={{
          style: {
            base: {
              color: Chakra.useColorModeValue("darkblue.800", "white")
            }
          }
        }}
      />
      <Chakra.Button
        w="full"
        mt="6"
        type="submit"
        isLoading={loading}
        loadingText="Submitting"
      >
        Check Out
      </Chakra.Button>
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
