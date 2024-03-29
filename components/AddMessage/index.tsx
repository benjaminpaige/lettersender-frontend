import { useRef } from "react"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { FormikHelpers } from "formik"
import { MessageForm } from "../MessageForm"
import type { FormValues } from "../MessageForm"
import {
  ALL_MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  MESSAGES_PAGINATION_QUERY
} from "@/graphql"
import { addMessageValidationSchema } from "@/utils"
import { çAddMessage } from "./constants"

const AddMessage = () => {
  const [createMessage, { error }] = useMutation(CREATE_MESSAGE_MUTATION)
  const fileInputRef = useRef(null)
  const router = useRouter()

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    let variables = values
    if (values.image === "") delete variables.image

    // can't find this errors value on Mutation cb
    const { data } = await createMessage({
      variables,
      refetchQueries: [
        { query: ALL_MESSAGES_QUERY },
        { query: MESSAGES_PAGINATION_QUERY }
      ]
    })

    if (!error) {
      actions.resetForm()
      if (fileInputRef?.current?.value) {
        fileInputRef.current.value = null
      }
      router.push({
        pathname: `/dashboard/messages/`
      })
    }
    actions.setSubmitting(false)
  }

  return (
    <MessageForm
      initialValues={çAddMessage.initialValues}
      validationSchema={addMessageValidationSchema}
      onSubmit={onSubmit}
      fileInputRef={fileInputRef}
      title="Add Message"
      buttonText="Submit"
    />
  )
}

export default AddMessage
