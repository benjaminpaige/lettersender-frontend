import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { BsSearch } from "react-icons/bs"
import { RiAddFill } from "react-icons/ri"

export const TableActions = () => {
  const router = useRouter()
  return (
    <Stack
      spacing="4"
      direction={{ base: "column", md: "row" }}
      justify="space-between"
    >
      <HStack>
        <FormControl minW={{ md: "320px" }} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Search for a message</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input
              rounded="base"
              type="search"
              placeholder="Search for a message..."
            />
          </InputGroup>
        </FormControl>
        <Select rounded="base" size="sm" placeholder="Status">
          <option>Draft</option>
          <option>Pending</option>
          <option>Sent</option>
        </Select>
      </HStack>
      <ButtonGroup size="sm" variant="outline">
        <Button
          onClick={() => router.push("/add-message")}
          iconSpacing="1"
          leftIcon={<RiAddFill fontSize="1.25em" />}
        >
          New message
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
