import Link from "next/link"
import { useQuery } from "@apollo/client"
import { ALL_MESSAGES_QUERY } from "../../graphql"
import { formatMoney } from "../../utils"
import MessageImages from "../MessageImages"
import Loading from "../Loading"

export default function Messages() {
  const { data, error, loading } = useQuery(ALL_MESSAGES_QUERY)

  if (loading) return <Loading />
  return data?.allMessages?.map((message) => {
    return (
      <div key={message.id}>
        <Link href={`/message/${message.id}`}>
          <p style={{ padding: "1em" }}>{message.content}</p>
        </Link>
        <MessageImages message={message} />
        <p>{formatMoney(2400)}</p>
      </div>
    )
  })
}
