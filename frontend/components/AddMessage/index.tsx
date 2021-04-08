import { useRef } from "react"
import { useMutation } from "@apollo/client"
import Router from "next/router"
import { FormikHelpers } from "formik"
import { MessageForm } from "../MessageForm"
import type { FormValues } from "../MessageForm"
import { ALL_MESSAGES_QUERY, CREATE_MESSAGE_MUTATION } from "../../graphql"
import { addMessageValidationSchema } from "../../utils"

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
        pathname: `/messages/`
      })
    }
    actions.setSubmitting(false)
  }

  return (
    <MessageForm
      initialValues={initialValues}
      validationSchema={addMessageValidationSchema}
      onSubmit={onSubmit}
      fileInputRef={fileInputRef}
      title="Add Message"
      buttonText="Submit"
    />
  )
}

export default AddMessage
