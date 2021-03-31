import Link from "next/link"
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { formatMoney } from "../../utils"

const ALL_MESSAGES_QUERY = gql`
  query ALL_MESSAGES_QUERY {
    allMessages {
      id
      content
      photos {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

export default function Messages() {
  const { data, error, loading } = useQuery(ALL_MESSAGES_QUERY)
  console.log(data, error, loading)
  if (loading) return <p>Loading</p>
  return data?.allMessages?.map((message) => {
    return (
      <div key={message.id}>
        {/* <Title> */}
        <Link href={`/messages/${message.id}`}>
          <p style={{ padding: "1em" }}>{message.content}</p>
        </Link>
        {/* </Title> */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {message.photos?.map((photo) => {
            return (
              <img
                src={photo.image.publicUrlTransformed}
                key={photo.id}
                style={{ maxWidth: "320px", maxHeight: "320px", margin: "2em" }}
              />
            )
          })}
        </div>
        <p>{formatMoney(2400)}</p>
      </div>
    )
  })
}
