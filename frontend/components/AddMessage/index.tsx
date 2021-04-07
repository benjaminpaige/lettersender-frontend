import { useRef } from "react"
import { useMutation } from "@apollo/client"
import Router from "next/router"
import {
  Box,
  Button,
  FormControl,
  Input,
  Heading,
  Textarea,
  Stack,
  StackDivider,
  VStack,
  FormErrorMessage
} from "@chakra-ui/react"
import {
  Formik,
  Form,
  Field,
  FormikProps,
  FieldProps,
  FormikHelpers
} from "formik"
import { FieldGroup } from "./FieldGroup"
import { ALL_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION } from "../../graphql"
import { addMessageValidationSchema } from "../../utils"

interface FormValues {
  content: string
  image: string
  recipientName: string
  recipientAddress: string
  status: "DRAFT" | "PENDING" | "SENT"
}

const initialValues = {
  content: "",
  image: "",
  recipientName: "",
  recipientAddress: "",
  status: "DRAFT"
}

const AddMessage = () => {
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION)
  const fileInputRef = useRef(null)

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    let variables = values
    if (values.image === "") delete variables.image

    const { data, errors } = await createMessage({
      variables,
      refetchQueries: [{ query: ALL_MESSAGES_QUERY }]
    })

    if (!errors) {
      actions.resetForm()
      if (fileInputRef?.current?.value) {
        fileInputRef.current.value = null
      }
      Router.push({
        pathname: `/message/${data.createMessage.id}`
      })
    }
    actions.setSubmitting(false)
  }

  return (
    <Box px={{ base: "4", md: "10" }} py="16" maxWidth="3xl" mx="auto">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={addMessageValidationSchema}
      >
        {({ isSubmitting, setFieldValue, values }: FormikProps<FormValues>) => {
          return (
            <Form>
              <Stack spacing="4" divider={<StackDivider />}>
                <Heading size="lg" as="h1" paddingBottom="4">
                  Add Message
                </Heading>

                <FieldGroup title="Recipient">
                  <VStack width="full" spacing="6">
                    {/* recipientName */}
                    <Field name="recipientName">
                      {({ field, form }: FieldProps<any, FormValues>) => (
                        <FormControl
                          isInvalid={
                            Boolean(form.errors.recipientName) &&
                            form.touched.recipientName
                          }
                        >
                          <FormControl id="add-user-recipientName">
                            <Input
                              {...field}
                              placeholder="Recipients name here"
                            />
                          </FormControl>

                          <FormErrorMessage>
                            {form.errors.recipientName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </VStack>
                </FieldGroup>

                <FieldGroup title="Address">
                  <VStack width="full" spacing="6">
                    {/* recipientAddress */}
                    <Field name="recipientAddress">
                      {({ field, form }: FieldProps<any, FormValues>) => (
                        <FormControl
                          isInvalid={
                            Boolean(form.errors.recipientAddress) &&
                            form.touched.recipientAddress
                          }
                        >
                          <FormControl id="add-user-recipientAddress">
                            <Input
                              {...field}
                              placeholder="Recipients address here"
                            />
                          </FormControl>

                          <FormErrorMessage>
                            {form.errors.recipientAddress}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </VStack>
                </FieldGroup>

                <FieldGroup title="Message">
                  <VStack width="full" spacing="6">
                    {/* content */}
                    <Field name="content">
                      {({ field, form }: FieldProps<any, FormValues>) => (
                        <FormControl
                          isInvalid={
                            Boolean(form.errors.content) && form.touched.content
                          }
                        >
                          <FormControl id="add-user-content">
                            <Textarea
                              {...field}
                              size="lg"
                              placeholder="your message content here"
                            />
                          </FormControl>

                          <FormErrorMessage>
                            {form.errors.content}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </VStack>
                </FieldGroup>

                <FieldGroup title="Photo">
                  <Stack width="full">
                    <Field name="image">
                      {({ form }: FieldProps<any, FormValues>) => {
                        return (
                          <FormControl
                            isInvalid={
                              Boolean(form.errors.image) && form.touched.image
                            }
                          >
                            <Input
                              ref={fileInputRef}
                              type="file"
                              name="image"
                              accept=".jpg,.jpeg,.png"
                              onChange={(event) => {
                                setFieldValue(
                                  "image",
                                  event.currentTarget.files[0]
                                )
                              }}
                              id="add-message-image-input"
                              style={{ border: "none", padding: 0 }}
                            />

                            <FormErrorMessage>
                              {form.errors.image}
                            </FormErrorMessage>
                          </FormControl>
                        )
                      }}
                    </Field>
                  </Stack>
                </FieldGroup>
              </Stack>
              <FieldGroup mt="3">
                <Button
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  w="100%"
                  type="submit"
                >
                  Submit
                </Button>
              </FieldGroup>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default AddMessage
