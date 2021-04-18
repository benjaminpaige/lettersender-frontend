import SingleMessage from "@/components/SingleMessage"

export default function SingleMessagePage({ query: { id, edit } }) {
  return <SingleMessage id={id} edit={edit} />
}
