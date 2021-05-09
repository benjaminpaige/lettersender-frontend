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
  Text,
  Stack,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { useMutation } from "@apollo/client"
import { SIGNIN_USER_MUTATION, CURRENT_USER_QUERY } from "@/graphql"

interface FormValues {
  email: string
  password: string
}

export const SignInForm = () => {
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

    const {
      data: { authenticateUserWithPassword }
    } = await SignInUser({
      variables: values
    })

    if (
      authenticateUserWithPassword.__typename ===
      "UserAuthenticationWithPasswordFailure"
    ) {
      setErrorMessage(authenticateUserWithPassword.message)
    } else {
      console.log(authenticateUserWithPassword.sessionToken)
      // $TODO: do something with the session token
      router.push("/dashboard")
    }
    actions.setSubmitting(false)
  }

  // if coming from signup page user email query param as default email value
  const initialValues = {
    email: router?.query?.email ? router.query.email : "",
    password: ""
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
            {router?.query?.created && (
              <Text align="center" color="tomato">
                Your account has been created, please sign in.
              </Text>
            )}
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
                    <Box
                      as="a"
                      color={mode("blue.600", "blue.200")}
                      fontWeight="semibold"
                      fontSize="sm"
                    >
                      Forgot Password?
                    </Box>
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
              Sign in
            </Button>
            {errorMessage && (
              <Alert status="error">
                <AlertIcon />
                Authentication failed.
              </Alert>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
