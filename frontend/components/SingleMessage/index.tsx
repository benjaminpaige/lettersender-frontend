import { useRef } from "react"
import { useQuery } from "@apollo/client"
import { MessageForm } from "../MessageForm"
import { SINGLE_MESSAGE_QUERY } from "../../graphql"
import { Loading } from "../Loading"
import DisplayError from "../ErrorMessage"
import { useRouter } from "next/router"

export default function SingleMessage({ id, edit }) {
  const { data, error, loading } = useQuery(SINGLE_MESSAGE_QUERY, {
    variables: { id }
  })
  if (loading) return <Loading />
  if (error && error.message) return <DisplayError />
  return edit ? (
    <EditableMessageForm initialValues={data.Message} />
  ) : (
    <ViewableMessageForm initialValues={data.Message} id={id} />
  )
}

const EditableMessageForm = ({ initialValues }) => {
  const fileInputRef = useRef(null)
  return (
    <MessageForm
      fileInputRef={fileInputRef}
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
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
