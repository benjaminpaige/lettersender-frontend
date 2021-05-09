import { useState } from "react"
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
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
import { Router, useRouter } from "next/router"

type FormValues = {
  email: string
  firstName: string
  lastName: string
  password: string
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
}

export const SignupForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("")
  const [SignUpUser] = useMutation<any>(SIGNUP_USER_MUTATION)
  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    // reset error message, if any
    setErrorMessage("")

    const result = await SignUpUser({
      variables: values
    }).catch((e) => {
      setErrorMessage("An Error Occured")
      console.log(e)
    })

    // @ts-ignore
    const email = result?.data?.createUser?.email
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={signUpValidationSchema}
    >
      {({ isSubmitting }: FormikProps<FormValues>) => (
        <Form>
          <Stack spacing="4">
            <Field name="firstName">
              {({ field, form }: FieldProps<any, FormValues>) => (
                <FormControl
                  id="firstName"
                  isInvalid={
                    Boolean(form.errors.firstName) && form.touched.firstName
                  }
                >
                  <FormLabel mb={1}>First name</FormLabel>
                  <Input
                    {...field}
                    autoComplete="given-name"
                    onChange={(e) => {
                      field.onChange(e)
                      setErrorMessage("")
                    }}
                  />
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="lastName">
              {({ field, form }: FieldProps<any, FormValues>) => (
                <FormControl
                  id="lastName"
                  isInvalid={
                    Boolean(form.errors.lastName) && form.touched.lastName
                  }
                >
                  <FormLabel mb={1}>Last name</FormLabel>
                  <Input
                    {...field}
                    autoComplete="family-name"
                    onChange={(e) => {
                      field.onChange(e)
                      setErrorMessage("")
                    }}
                  />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  id="email"
                  isInvalid={Boolean(form.errors.email) && form.touched.email}
                >
                  <FormLabel mb={1}>Email</FormLabel>
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
                    <FormLabel mb={1}>Password</FormLabel>
                    <Box
                      as="a"
                      href="#"
                      fontWeight="semibold"
                      fontSize="sm"
                      color={mode("blue.600", "blue.200")}
                    >
                      Forgot Password?
                    </Box>
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

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="md"
              isLoading={isSubmitting}
              loadingText="Loading"
            >
              Create my account
            </Button>
            {errorMessage && (
              <Alert status="error">
                <AlertIcon />
                {errorMessage}
              </Alert>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
