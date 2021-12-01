import { Home } from "@/components/Home"
import { signIn, useSession } from "next-auth/client"


var doBasicAuth = process.env.NEXT_PUBLIC_API_ENDPOINT.includes("dev-api.lettersender")

export default function HomePage() {
  const [session, loading] = useSession()

  if(doBasicAuth && loading) return <p>loading...</p>

  if(doBasicAuth && !session) {
    return (
      <div style={{textAlign: 'center'}}>
        {/* @ts-ignore */}
        <button onClick={signIn}>Sign in</button>
      </div>
    )
  }

  return <Home />
}
