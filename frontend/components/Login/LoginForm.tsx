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
import { loginValidationSchema } from "@/utils"
import {
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

interface FormValues {
  emailAddress: string
  password: string
}

const initialValues = { emailAddress: "", password: "" }

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    // lets do something with the values
    await new Promise((resolve) => setTimeout(resolve, 1000))
    actions.setSubmitting(false)
    // error? -> actions.setFieldError('emailAddress', 'Account doesnt exists')

    // success? -> maybe router.push('/dashboard')

    console.log(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={loginValidationSchema}
    >
      {({ isSubmitting, errors }: FormikProps<FormValues>) => (
        <Form>
          <Stack spacing="6">
            <Field name="emailAddress">
              {({ field, form }: FieldProps<any, FormValues>) => (
                <FormControl
                  isInvalid={
                    Boolean(form.errors.emailAddress) &&
                    form.touched.emailAddress
                  }
                >
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <EmailIcon />
                    </InputLeftElement>
                    <Input
                      {...field}
                      id="login_email_address"
                      placeholder="Email address"
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {form.errors.emailAddress}
                  </FormErrorMessage>
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
                      id="login_password"
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
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
