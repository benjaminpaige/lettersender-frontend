import { Flex } from "@chakra-ui/layout"

export default function MessageImages({ message }) {
  if (!message?.images || message.images.length === 0) return null
  return (
    <Flex>
      {message.images?.map((photo) => {
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
    </Flex>
  )
}
