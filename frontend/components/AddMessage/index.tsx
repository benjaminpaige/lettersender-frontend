import { useMutation } from "@apollo/client"
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
import gql from "graphql-tag"
import { useEffect } from "react"
import { FieldGroup } from "./FieldGroup"

interface FormValues {
  content: string
  image: string
}

const initialValues = {
  content: "",
  image: ""
}

const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION($content: String!, $image: Upload) {
    createMessage(
      data: { content: $content, images: { create: { image: $image } } }
    ) {
      id
      content
    }
  }
`

const AddMessage = () => {
  const [createMessage, { data, error }] = useMutation(CREATE_MESSAGE_MUTATION)
  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    let variables = values
    if (values.image === "") delete variables.image
    console.log(variables)
    await createMessage({ variables })
    if (!error) actions.resetForm()
    actions.setSubmitting(false)
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Box px={{ base: "4", md: "10" }} py="16" maxWidth="3xl" mx="auto">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={addMessageValidationSchema}
      >
        {({ isSubmitting, setFieldValue, values }: FormikProps<FormValues>) => {
          return (
            <Form>
              <Stack spacing="4" divider={<StackDivider />}>
                <Heading size="lg" as="h1" paddingBottom="4">
                  Add Message
                </Heading>

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

                <FieldGroup title="image">
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
                              type="file"
                              name="image"
                              accept=".jpg,.jpeg,.png"
                              onChange={(event) => {
                                console.log(event.currentTarget.files[0])
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
