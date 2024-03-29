import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react"
import { CURRENT_USER_QUERY } from "@/graphql"
import * as MailingAddress from "@/components/MailingAddress"

interface ChangeAddressModalProps {
  isOpen: boolean
  onClose: () => void
  updateUser: any
  id: string
}

export const ChangeAddressModal = ({
  isOpen,
  onClose,
  updateUser,
  id
}: ChangeAddressModalProps) => {
  const recipient = MailingAddress.useSelectMailingAddress()

  const onUpdate = () => {
    const variables = {
      id,
      addressLine1: recipient.mailingAddress.address,
      addressLine2: recipient.mailingAddress.address2,
      postcode: recipient.mailingAddress.postcode,
      locality: recipient.mailingAddress.locality,
      state: recipient.mailingAddress.state
    }
    updateUser({
      variables,
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      optimisticResponse: {
        updateComment: {
          id,
          __typename: "User",
          content: variables
        }
      }
    })
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter New Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MailingAddress.Component {...recipient} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onUpdate}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
