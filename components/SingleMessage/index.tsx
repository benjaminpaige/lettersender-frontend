import { useRef } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { MessageForm } from "../MessageForm"
import {
  SINGLE_MESSAGE_QUERY,
  UPDATE_MESSAGE_MUTATION,
  ALL_MESSAGES_QUERY
} from "../../graphql"
import { Loading } from "../Loading"
import { useRouter } from "next/router"

export default function SingleMessage({ id, edit }) {
  const { data, error, loading } = useQuery(SINGLE_MESSAGE_QUERY, {
    variables: { id }
  })

  if (loading) return <Loading />
  return edit ? (
    <EditableMessageForm initialValues={data.Message} id={id} />
  ) : (
    <ViewableMessageForm initialValues={data.Message} id={id} />
  )
}

const EditableMessageForm = ({ initialValues, id }) => {
  const fileInputRef = useRef(null)
  const router = useRouter()

  const [updateMessage, { error }] = useMutation(UPDATE_MESSAGE_MUTATION)

  const onSubmit = async (values, actions) => {
    let variables = { ...values, id }
    if (values.image === "") delete variables.image

    await updateMessage({
      variables,
      refetchQueries: [
        { query: ALL_MESSAGES_QUERY },
        { query: SINGLE_MESSAGE_QUERY, variables: { id } }
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
      fileInputRef={fileInputRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      title="Edit Message"
      buttonText="Submit"
    />
  )
}

const ViewableMessageForm = ({ initialValues, id }) => {
  const router = useRouter()

  const onSubmit = () => {
    router.push({
      pathname: `/message/${id}`,
      query: { edit: true }
    })
  }
  return (
    <MessageForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title="Message"
      buttonText="Edit"
      disableInputs
      showPhotoUpload={false}
      showUploadedPhotos
    />
  )
}
