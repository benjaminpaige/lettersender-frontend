import * as Chakra from "@chakra-ui/react"
import { useState } from "react"
import * as MailingAddress from "@/components/MailingAddress"
import { RichTextInput } from "@/components/RichTextInput"
import { useMutation } from "@apollo/client"
import { Step } from "./Step"
import { StepContent } from "./StepContent"
import { Steps } from "./Steps"
import { useSteps } from "./useSteps"
import {
  ADD_TO_CART_MUTATION,
  CREATE_LETTER_MUTATION,
  UPDATE_LETTER_MUTATION,
  CURRENT_USER_QUERY
} from "@/graphql"
import { useRouter } from "next/router"
import { verifyMailingAddress } from "@/utils/address"
import { isEmpty } from "@/utils/helpers"
import { Alert } from "../Alert"

export const Dashboard = () => {
  const [createLetter] = useMutation<Schemas.Letter>(CREATE_LETTER_MUTATION)
  const [updateLetter] = useMutation<Schemas.Letter>(UPDATE_LETTER_MUTATION)
  const [content, setContent] = useState("")
  const [error, setError] = useState(null)
  const [mailingAddressError, setMailingAddressError] = useState(null)
  const [recipientName, setRecipientName] = useState(null)
  const [id, setId] = useState("")
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION)
  const { nextStep, prevStep, reset, activeStep } = useSteps({ initialStep: 0 })
  const recipient = MailingAddress.useSelectMailingAddress()
  const router = useRouter()

  const handleCreateLetter = async () => {
    const variables = {
      recipientName,
      addressLine1: recipient.mailingAddress.address,
      addressLine2: recipient.mailingAddress.address2,
      postcode: recipient.mailingAddress.postcode,
      locality: recipient.mailingAddress.locality,
      state: recipient.mailingAddress.state
    }

    const { data, errors } = (await createLetter({ variables })) as any

    if (errors) {
      setError(errors[0].message)
    } else {
      setId(data.createLetter.id)
      nextStep()
    }
  }

  const handleUpdateLetter = async () => {
    const variables = {
      id,
      recipientName,
      addressLine1: recipient.mailingAddress.address,
      addressLine2: recipient.mailingAddress.address2,
      postcode: recipient.mailingAddress.postcode,
      locality: recipient.mailingAddress.locality,
      state: recipient.mailingAddress.state,
      content: content
    }

    const { data, errors } = (await updateLetter({ variables })) as any

    if (errors) {
      setError(errors[0].message)
    } else {
      nextStep()
    }
  }

  const handleAddToCart = () => {
    addToCart({
      variables: { id },
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })
      .then(() => router.push("/dashboard/cart"))
      .catch((error) => setError(error.message))
  }

  const handleNextStep = async () => {
    setMailingAddressError(null)
    if (!recipientName) {
      setMailingAddressError("Recipient name required")
      return
    }
    if (recipientName.length < 2) {
      setMailingAddressError("Recipient name too short")
      return
    }
    if (!recipient.mailingAddress.address) {
      setMailingAddressError("Address Required")
      return
    }
    if (content.length >= 10000) {
      setError("Too much content")
      return
    }

    try {
      const verificationResponse = await verifyMailingAddress({
        ...recipient.mailingAddress
      })
      if (verificationResponse.data.status === "verified") {
        if (!id) handleCreateLetter()
        if (id) handleUpdateLetter()
      } else {
        if (
          verificationResponse.data.errors &&
          !isEmpty(verificationResponse.data.errors)
        ) {
          const errorKeys = Object.keys(verificationResponse.data.errors)
          const e = verificationResponse.data.errors[errorKeys[0]][0]
          setMailingAddressError(e)
        } else {
          setMailingAddressError("Mailing address failed verification")
        }
      }
    } catch (e) {
      console.log(e)
      setError("An Error Occured")
    }
  }

  return (
    <Chakra.Box
      as="section"
      maxW={{ base: "3xl", md: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "12" }}
      py={{ base: "4", md: "12" }}
    >
      <Chakra.Box overflowX="auto">
        <Chakra.Heading size="lg" mb="6">
          Dashboard
        </Chakra.Heading>
        <Chakra.Box maxW="4xl" minH="400px">
          <Chakra.Heading as="h2" mb="4" size="md" color="blue.600">
            Quick Send
          </Chakra.Heading>
          <Steps activeStep={activeStep}>
            <Step title="Select Recipient">
              <StepContent>
                <Chakra.Stack shouldWrapChildren spacing="4">
                  <Chakra.Box>
                    <Chakra.Text fontSize="xs" mb="1" pl="2">
                      Recipient Name
                    </Chakra.Text>
                    <Chakra.Input
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                  </Chakra.Box>
                  <MailingAddress.Component {...recipient} />
                  <Chakra.HStack>
                    <Chakra.Button size="sm" variant="ghost" isDisabled>
                      Back
                    </Chakra.Button>
                    <Chakra.Button size="sm" onClick={handleNextStep}>
                      Next
                    </Chakra.Button>
                  </Chakra.HStack>
                  {mailingAddressError && (
                    <Alert message={mailingAddressError} />
                  )}
                </Chakra.Stack>
              </StepContent>
            </Step>
            <Step title="Add Message">
              <StepContent>
                <Chakra.Stack shouldWrapChildren spacing="4">
                  <RichTextInput value={content} onChange={setContent} />
                  <Chakra.HStack>
                    <Chakra.Button size="sm" onClick={prevStep} variant="ghost">
                      Back
                    </Chakra.Button>
                    <Chakra.Button size="sm" onClick={handleNextStep}>
                      Next
                    </Chakra.Button>
                  </Chakra.HStack>
                </Chakra.Stack>
              </StepContent>
            </Step>
            <Step title="Pay and Send">
              <StepContent>
                <Chakra.Stack shouldWrapChildren spacing="4">
                  <Chakra.Text>Ready to send? Lets do this.</Chakra.Text>
                  <Chakra.HStack>
                    <Chakra.Button size="sm" onClick={prevStep} variant="ghost">
                      Back
                    </Chakra.Button>
                    <Chakra.Button
                      size="sm"
                      disabled={loading}
                      onClick={handleAddToCart}
                    >
                      {loading ? "Adding Now" : "Add To Cart"}
                    </Chakra.Button>
                  </Chakra.HStack>
                </Chakra.Stack>
              </StepContent>
            </Step>
          </Steps>
          {error && <Alert message={error} my="3" />}
          {/* <HStack
        display={activeStep === 3 ? "flex" : "none"}
        mt="10"
        spacing="4"
        shouldWrapChildren
      >
        <Text>All steps completed - you&apos;re finished</Text>
        <Button
          size="sm"
          onClick={reset}
          variant="outline"
          verticalAlign="baseline"
        >
          Reset
        </Button>
      </HStack> */}
        </Chakra.Box>
      </Chakra.Box>
    </Chakra.Box>
  )
}
