import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  useDisclosure,
  VisuallyHidden,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { Logo } from "../Logo"
import { NavLink } from "./NavLink"
import { NavMenu } from "./NavMenu"
import { Submenu } from "./Submenu"
import { ToggleButton } from "./ToggleButton"
import { links } from "./_data"
import { APP_NAME } from "../../config"

const MobileNavContext = (props: FlexProps) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="nav-content__mobile"
        {...props}
      >
        <Box>
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
        <Box
          style={{ transform: "translateX(-14px)" }}
          as="a"
          rel="home"
          mx="auto"
          mt="2"
        >
          <Logo />
        </Box>
      </Flex>
      <NavMenu animate={isOpen ? "open" : "closed"}>
        {links.map((link, idx) =>
          link.children ? (
            <Submenu.Mobile key={idx} link={link} />
          ) : (
            <NavLink.Mobile key={idx} href={link.href}>
              {link.label}
            </NavLink.Mobile>
          )
        )}
        <Button colorScheme="blue" w="full" size="lg" mt="5">
          Try for free
        </Button>
      </NavMenu>
    </>
  )
}

const DesktopNavContent = (props: FlexProps) => {
  return (
    <Flex
      className="nav-content__desktop"
      align="center"
      justify="space-between"
      {...props}
    >
      <Box as="a" href="#" rel="home">
        <VisuallyHidden>{APP_NAME}</VisuallyHidden>
        <Logo />
      </Box>
      <HStack
        as="ul"
        id="nav__primary-menu"
        aria-label="Main Menu"
        listStyleType="none"
      >
        {links.map((link, idx) => (
          <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
            {link.children ? (
              <Submenu.Desktop link={link} />
            ) : (
              <NavLink.Desktop href={link.href}>{link.label}</NavLink.Desktop>
            )}
          </Box>
        ))}
      </HStack>
      <HStack spacing="8" minW="240px" justify="space-between">
        <Box
          as="a"
          href="#"
          color={mode("blue.600", "blue.300")}
          fontWeight="bold"
        >
          Sign In
        </Box>
        <Button as="a" href="#" colorScheme="blue" fontWeight="bold">
          Sign up for free
        </Button>
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent
}
