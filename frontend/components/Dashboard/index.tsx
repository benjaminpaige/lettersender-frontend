import {
  Box,
  Stack,
  Button,
  Text,
  HStack,
  Heading,
  Textarea
} from "@chakra-ui/react"
import * as React from "react"
import { SelectRecipient } from "../SelectRecipient"
import { Step } from "./Step"
import { StepContent } from "./StepContent"
import { Steps } from "./Steps"
import { useSteps } from "./useSteps"

export const Dashboard = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({ initialStep: 0 })

  return (
    <Box mx="auto" maxW="2xl" py="2" px={{ base: "4", md: "8" }} minH="400px">
      <Heading as="h2" my="8">
        Quick Send
      </Heading>
      <Steps activeStep={activeStep}>
        <Step title="Select Recipient">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <SelectRecipient />
              <HStack>
                <Button size="sm" variant="ghost" isDisabled>
                  Back
                </Button>
                <Button size="sm" onClick={nextStep}>
                  Next
                </Button>
              </HStack>
            </Stack>
          </StepContent>
        </Step>
        <Step title="Add Message">
          <StepContent>
            <Stack shouldWrapChildren spacing="4">
              <Textarea />
              <HStack>
                <Button size="sm" onClick={prevStep} variant="ghost">
                  Back
                </Button>
                <Button size="sm" onClick={nextStep}>
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
                Try out different ad text to see what brings in the most
                customers, and learn how to enhance your ads using features like
                ad extensions. If you run into any problems with your ads, find
                out how to tell if they&apos;re running and how to resolve
                approval issues.
              </Text>
              <HStack>
                <Button size="sm" onClick={prevStep} variant="ghost">
                  Back
                </Button>
                <Button size="sm" onClick={nextStep}>
                  Finish
                </Button>
              </HStack>
            </Stack>
          </StepContent>
        </Step>
      </Steps>
      <HStack
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
      </HStack>
    </Box>
  )
}
