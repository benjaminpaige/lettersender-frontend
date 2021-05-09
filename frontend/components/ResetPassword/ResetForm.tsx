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
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import { signInValidationSchema } from "@/utils"
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { useMutation } from "@apollo/client"
import { SIGNIN_USER_MUTATION, CURRENT_USER_QUERY } from "@/graphql"
import Link from "next/link"

interface FormValues {
  email: string
  password: string
  token: string
}

export const ResetForm = () => {
  const [SignInUser] = useMutation(SIGNIN_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
  const [showPassword, setShowPassword] = useState(false)
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
    email: router?.query?.email ? router.query.email : "",
    token: router?.query?.token ? router.query.token : "",
    password: ""
  }

  const hasToken = Boolean(router?.query?.token)
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={signInValidationSchema}
    >
      {({ isSubmitting }: FormikProps<FormValues>) => (
        <Form>
          {hasToken && (
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
                        id="signin_email_address"
                        placeholder="Email address"
                      />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }: FieldProps<any, FormValues>) => (
                  <FormControl
                    isInvalid={
                      Boolean(form.errors.password) && form.touched.password
                    }
                  >
                    <Flex justify="space-between">
                      <FormLabel>Password</FormLabel>
                    </Flex>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <LockIcon />
                      </InputLeftElement>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setErrorMessage("")
                        }}
                        id="signin_password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                      />
                      <InputRightElement>
                        <IconButton
                          bg="transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Show Password"
                          icon={
                            showPassword ? (
                              <BsFillEyeFill />
                            ) : (
                              <BsFillEyeSlashFill />
                            )
                          }
                        />
                      </InputRightElement>
                    </InputGroup>
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
                Reset Password
              </Button>
            </Stack>
          )}
          {!hasToken && (
            <>
              <Alert status="error">
                <AlertIcon />
                No token found. Please use link provided in email
              </Alert>
              <Box mt="2" color={mode("blue.500", "gray.200")}>
                <Link href="/request-reset">Request password reset link</Link>
              </Box>
            </>
          )}
        </Form>
      )}
    </Formik>
  )
}
