import { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  HStack,
  Flex,
  Stack,
  Spacer,
  useColorModeValue as mode
} from "@chakra-ui/react"
import {
  Formik,
  Form,
  Field,
  FormikProps,
  FieldProps,
  FormikHelpers
} from "formik"
import { signUpValidationSchema } from "@/utils"
import { useMutation } from "@apollo/client"
import { SIGNUP_USER_MUTATION } from "@/graphql"
import { useRouter } from "next/router"
import * as MailingAddress from "@/components/MailingAddress"
import { Alert } from "@/components/Alert"
import { verifyMailingAddress } from "@/utils/address"

type FormValues = {
  email: string
  fullName: string
  password: string
}

const initialValues = {
  fullName: "",
  email: "",
  password: ""
}

export const SignupForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("")
  const [SignUpUser] = useMutation<any>(SIGNUP_USER_MUTATION)
  const recipient = MailingAddress.useSelectMailingAddress()
  const [loading, setLoading] = useState(false)
  const handleSignUpUser = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    // reset error message, if any
    setErrorMessage("")

    const result = await SignUpUser({
      variables: { ...values, ...recipient.mailingAddress }
    }).catch((e) => {
      setErrorMessage("An Error Occured")
      console.log(e)
    })

    // @ts-ignore
    const email = result?.data?.createUser?.email
    setLoading(false)
    if (email) {
      // if success send to signin page with email query param to autofill email and show message
      router.push({
        pathname: "/signin",
        query: {
          created: true,
          email
        }
      })
    }

    actions.setSubmitting(false)
  }

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    setLoading(true)
    try {
      const verificationResponse = await verifyMailingAddress({
        ...recipient.mailingAddress
      })
      if (verificationResponse.data.status !== "failed") {
        handleSignUpUser(values, actions)
      } else {
        setErrorMessage("Mailing address failed verification")
        setLoading(false)
      }
    } catch (e) {
      console.log(e)
      setErrorMessage("An Error Occured")
      setLoading(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signUpValidationSchema}
    >
      {({ isSubmitting }: FormikProps<FormValues>) => (
        <Form>
          <Stack spacing="4">
            <Field name="fullName">
              {({ field, form }: FieldProps<any, FormValues>) => (
                <FormControl
                  id="fullName"
                  isInvalid={
                    Boolean(form.errors.fullName) && form.touched.fullName
                  }
                >
                  <FormLabel fontSize="xs" mb="1" pl="2">
                    Full name
                  </FormLabel>
                  <Input
                    {...field}
                    autoComplete="name"
                    onChange={(e) => {
                      field.onChange(e)
                      setErrorMessage("")
                    }}
                  />
                  <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  id="email"
                  isInvalid={Boolean(form.errors.email) && form.touched.email}
                >
                  <FormLabel fontSize="xs" mb="1" pl="2">
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    autoComplete="email"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setErrorMessage("")
                    }}
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  id="password"
                  isInvalid={
                    Boolean(form.errors.password) && form.touched.password
                  }
                >
                  <Flex align="baseline" justify="space-between">
                    <FormLabel fontSize="xs" mb="1" pl="2">
                      Password
                    </FormLabel>
                  </Flex>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setErrorMessage("")
                    }}
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <MailingAddress.Component {...recipient} />

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="md"
              isLoading={isSubmitting || loading}
              loadingText="Loading"
            >
              Create my account
            </Button>
            {errorMessage && <Alert message={errorMessage} />}
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
