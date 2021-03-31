import {
  Box,
  Button,
  Checkbox,
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

interface FormValues {
  content: string
  photos: string[]
}

const initialValues = {
  content: "",
  photos: []
}

const AddMessage = () => {
  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    // using below to simulate loading state and field error from query
    await new Promise((resolve) => setTimeout(resolve, 2000))
    actions.setSubmitting(false)
    console.log(values)
  }

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

                <FieldGroup title="Content">
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

                <FieldGroup title="Other">
                  <Stack width="full" spacing="4">
                    <Field name="photos">
                      {({ field, form }: FieldProps<any, FormValues>) => {
                        console.log(field)
                        return (
                          <FormControl
                            isInvalid={
                              Boolean(form.errors.photos) && form.touched.photos
                            }
                          >
                            <Input
                              type="file"
                              name="photos"
                              onChange={(e) =>
                                setFieldValue("photos", [
                                  ...values.photos,
                                  e.currentTarget.files[0]
                                ])
                              }
                              id="add-message-photo-input"
                              {...field}
                            />

                            <FormErrorMessage>
                              {form.errors.photos}
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
