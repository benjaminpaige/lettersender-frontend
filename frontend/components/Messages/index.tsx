import Link from "next/link"
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { formatMoney } from "../../utils"

export const ALL_MESSAGES_QUERY = gql`
  query ALL_MESSAGES_QUERY {
    allMessages {
      id
      content
      images {
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
  if (loading) return <p>Loading</p>
  return data?.allMessages?.map((message) => {
    return (
      <div key={message.id}>
        <Link href={`/message/${message.id}`}>
          <p style={{ padding: "1em" }}>{message.content}</p>
        </Link>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {message.images.length > 0 &&
            message.images?.map((photo) => {
              return (
                <img
                  src={photo.image?.publicUrlTransformed}
                  key={photo.id}
                  style={{
                    maxWidth: "320px",
                    maxHeight: "320px",
                    margin: "2em"
                  }}
                />
              )
            })}
        </div>
        <p>{formatMoney(2400)}</p>
      </div>
    )
  })
}
