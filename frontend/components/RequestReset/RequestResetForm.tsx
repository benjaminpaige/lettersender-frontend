import { useState } from "react"
import { useRouter } from "next/router"
import {
  Formik,
  Form,
  Field,
  FormikProps,
  FieldProps,
  FormikHelpers
} from "formik"
import { EmailIcon } from "@chakra-ui/icons"
import { signInValidationSchema } from "@/utils"
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Stack
} from "@chakra-ui/react"
import { useMutation } from "@apollo/client"
import { SIGNIN_USER_MUTATION, CURRENT_USER_QUERY } from "@/graphql"

interface FormValues {
  email: string
  password: string
}

export const RequestResetForm = () => {
  const [RequestPasswordReset] = useMutation(SIGNIN_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    // reset error message, if any
    setErrorMessage("")

    actions.setSubmitting(false)
  }

  // if coming from signup page user email query param as default email value
  const initialValues = {
    email: router?.query?.email ? router.query.email : ""
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={signInValidationSchema}
    >
      {({ isSubmitting }: FormikProps<FormValues>) => (
        <Form>
          <Stack spacing="6">
            <Field name="email">
              {({ field, form }: FieldProps<any, FormValues>) => (
                <FormControl
                  isInvalid={Boolean(form.errors.email) && form.touched.email}
                >
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <EmailIcon />
                    </InputLeftElement>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setErrorMessage("")
                      }}
                      id="request_pw_reset_email_address"
                      placeholder="Email address"
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
              Request password reset
            </Button>
            {errorMessage && (
              <Alert status="error">
                <AlertIcon />
                An Error Occured.
              </Alert>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
