import Link from "next/link"
import NavStyles from "./styles/NavStyles"

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/send">Send</Link>
      <Link href="/messages">Messages</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
      <Link href="/people">People</Link>
      <Link href="/photos">Photos</Link>
      <Link href="/cart">Cart</Link>
    </NavStyles>
  )
}
