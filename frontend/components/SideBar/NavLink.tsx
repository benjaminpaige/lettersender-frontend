import {
  HStack,
  Icon,
  Link as ChakraLink,
  LinkProps,
  Text
} from "@chakra-ui/react"
import Link from "next/link"

interface NavLinkProps extends LinkProps {
  isActive?: boolean
  label: string
  icon: any
}

export const NavLink = (props: NavLinkProps) => {
  const { icon, isActive, label, href = "/", ...rest } = props
  return (
    <Link href={href}>
      <ChakraLink
        display="block"
        py={2}
        px={3}
        borderRadius="md"
        transition="all 0.3s"
        fontWeight="medium"
        lineHeight="1.5rem"
        aria-current={isActive ? "page" : undefined}
        _hover={{
          bg: "blue.500",
          color: "white"
        }}
        _activeLink={{
          bg: "blue.700",
          color: "white"
        }}
        {...rest}
      >
        <HStack spacing={4}>
          <Icon as={icon} boxSize="20px" />
          <Text as="span">{label}</Text>
        </HStack>
      </ChakraLink>
    </Link>
  )
}
