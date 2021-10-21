import {
  Box,
  Stack,
  Button,
  Text,
  HStack,
  Heading,
  Textarea
} from "@chakra-ui/react"
import { useState } from 'react'
import * as SelectRecipient from "../SelectRecipient"
import { useMutation } from "@apollo/client"
import { Step } from "./Step"
import { StepContent } from "./StepContent"
import { Steps } from "./Steps"
import { useSteps } from "./useSteps"
import { ADD_TO_CART_MUTATION, CREATE_LETTER_MUTATION, UPDATE_LETTER_MUTATION, CURRENT_USER_QUERY } from '@/graphql'
import {useRouter} from "next/router"

export const Dashboard = () => {
  const [createLetter] = useMutation(CREATE_LETTER_MUTATION)
  const [updateLetter] = useMutation(UPDATE_LETTER_MUTATION)
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState(null)
  const [id, setId] = useState('')
  const [addToCart, {loading}] = useMutation(ADD_TO_CART_MUTATION)
  const { nextStep, prevStep, reset, activeStep } = useSteps({ initialStep: 0 })
  const selectRecipient = SelectRecipient.useSelectRecipient()
  const router = useRouter()

  const handleCreateLetter = async () => {

    const variables = {
      recipientName: selectRecipient.recipientName,
      addressLine1: selectRecipient.recipient.address,
      addressLine2: selectRecipient.recipient.address2,
      postcode: selectRecipient.recipient.postcode,
      locality: selectRecipient.recipient.locality,
      state: selectRecipient.recipient.state,
    }
    
    const { data, errors } = await createLetter({ variables }) as any
    
    if (errors) {
      setErrors(errors[0].message)
    } else {
      setId(data.createLetter.id)
      nextStep()
    }
  }
  
  const handleUpdateLetter = async () => {
    
    const variables = {
      id,
      recipientName: selectRecipient.recipientName,
      addressLine1: selectRecipient.recipient.address,
      addressLine2: selectRecipient.recipient.address2,
      postcode: selectRecipient.recipient.postcode,
      locality: selectRecipient.recipient.locality,
      state: selectRecipient.recipient.state,
      content: content
    }
    
    const { data, errors } = await updateLetter({ variables }) as any

    if (errors) {
      setErrors(errors[0].message)
    } else {
      nextStep()
    }
    
  }

  const handleAddToCart = () => {
    addToCart({ variables: { id }, refetchQueries: [{query: CURRENT_USER_QUERY}]})
      .then(() => router.push('/dashboard/cart'))
      .catch(error => console.log(error))
  }

  const handleNextStep = () => {
    if (!id) handleCreateLetter()
    if (id) handleUpdateLetter()
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
              <SelectRecipient.Component {...selectRecipient} />
              <HStack>
                <Button size="sm" variant="ghost" isDisabled>
                  Back
                </Button>
                <Button size="sm" onClick={handleNextStep}>
                  Next
                </Button>
              </HStack>
            </Stack>
          </StepContent>
        </Step>
        <Step title="Add Message">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Textarea value={content} onChange={e => setContent(e.target.value)}/>
              <HStack>
                <Button size="sm" onClick={prevStep} variant="ghost">
                  Back
                </Button>
                <Button size="sm" onClick={() => {
                  
                  handleNextStep()
                }}>
                  Next
                </Button>
              </HStack>
            </Stack>
          </StepContent>
        </Step>
        <Step title="Pay and Send">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Text>
                Ready to send? Lets do this.
              </Text>
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
