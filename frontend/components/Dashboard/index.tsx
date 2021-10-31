import {
  Box,
  Stack,
  Button,
  Text,
  HStack,
  Heading,
  Textarea,
  Input
} from "@chakra-ui/react"
import { useState } from "react"
import * as MailingAddress from "@/components/MailingAddress"
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
    if (!recipientName) {
      setMailingAddressError('Recipient name required')
      return
    } 
    if (recipientName.length < 2) {
      setMailingAddressError('Recipient name too short')
      return
    } 
    if (!recipient.mailingAddress.address) {
      setMailingAddressError('Address Required')
      return
    } 

    try {
      const verificationResponse = await verifyMailingAddress({...recipient.mailingAddress})
      if(verificationResponse.data.status === 'verified') {
        if (!id) handleCreateLetter()
        if (id) handleUpdateLetter()
      } else {
        setMailingAddressError('Mailing address failed verification')
      }
    } catch(e) {
      console.log(e)
      setError('An Error Occured')
    }
  }

  return (
    <Box mx="auto" maxW="2xl" py="2" px={{ base: "4", md: "8" }} minH="400px">
      <Heading as="h2" my="8">
        Quick Send
      </Heading>
      <Steps activeStep={activeStep}>
        <Step title="Select Recipient">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Box maxW="md">
                <Text fontSize="xs" mb="1" pl="2">
                  Recipient Name
                </Text>
                <Input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </Box>
              <MailingAddress.Component {...recipient} />
              <HStack>
                <Button size="sm" variant="ghost" isDisabled>
                  Back
                </Button>
                <Button size="sm" onClick={handleNextStep}>
                  Next
                </Button>
              </HStack>
              {mailingAddressError && <Alert message={mailingAddressError} maxW="md"/>}
            </Stack>
          </StepContent>
        </Step>
        <Step title="Add Message">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <HStack>
                <Button size="sm" onClick={prevStep} variant="ghost">
                  Back
                </Button>
                <Button size="sm" onClick={handleNextStep}>
                  Next
                </Button>
              </HStack>
            </Stack>
          </StepContent>
        </Step>
        <Step title="Pay and Send">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Text>Ready to send? Lets do this.</Text>
              <HStack>
                <Button size="sm" onClick={prevStep} variant="ghost">
                  Back
                </Button>
                <Button size="sm" disabled={loading} onClick={handleAddToCart}>
                  {loading ? "Adding Now" : "Add To Cart"}
                </Button>
              </HStack>
            </Stack>
          </StepContent>
        </Step>
      </Steps>
      {error && <Alert message={error} maxW="md"/>}
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
    </Box>
  )
}
