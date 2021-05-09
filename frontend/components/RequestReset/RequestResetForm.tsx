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
import { requestResetValidationSchema } from "@/utils"
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
import {
  SEND_PASSWORD_RESET_LINK_MUTATION,
  CURRENT_USER_QUERY
} from "@/graphql"

interface FormValues {
  email: string
}

export const RequestResetForm = () => {
  const [requestPasswordReset] = useMutation(
    SEND_PASSWORD_RESET_LINK_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    }
  )
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    await requestPasswordReset({ variables: values })

    actions.setSubmitting(false)
    setSubmitted(true)
  }

  // if coming from signup page user email query param as default email value
  const initialValues = {
    email: router?.query?.email ? router.query.email : ""
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={requestResetValidationSchema}
    >
      {({ isSubmitting }: FormikProps<FormValues>) => (
        <Form>
          <Stack spacing="6">
            {!submitted && (
              <>
                <Field name="email">
                  {({ field, form }: FieldProps<any, FormValues>) => (
                    <FormControl
                      isInvalid={
                        Boolean(form.errors.email) && form.touched.email
                      }
                    >
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <EmailIcon />
                        </InputLeftElement>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
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
                  Request Password Reset
                </Button>
              </>
            )}

            {submitted && (
              <Alert status="info">
                <AlertIcon />
                If that account exists you will receive an email with reset
                instructions
              </Alert>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
