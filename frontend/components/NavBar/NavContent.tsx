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

interface NavContentProps extends FlexProps {
  isLoggedIn: boolean
}

const MobileNavContext = ({ isLoggedIn, ...flexProps }: NavContentProps) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="nav-content__mobile"
        {...flexProps}
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
        <Button
          as="a"
          href={isLoggedIn ? "/logout" : "/login"}
          color={mode("blue.600", "blue.300")}
          fontWeight="bold"
          w="full"
          mt="5"
        >
          {isLoggedIn ? "Sign Out" : "Sign In"}
        </Button>
        <Button
          as="a"
          href={isLoggedIn ? "/dashboard" : "/signup"}
          colorScheme="blue"
          w="full"
          size="lg"
          mt="5"
        >
          {isLoggedIn ? "Dashboard" : "Sign up for free"}
        </Button>
      </NavMenu>
    </>
  )
}

const DesktopNavContent = ({ isLoggedIn, ...flexProps }: NavContentProps) => {
  return (
    <Flex
      className="nav-content__desktop"
      align="center"
      justify="space-between"
      {...flexProps}
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
          href={isLoggedIn ? "/logout" : "/login"}
          color={mode("blue.600", "blue.300")}
          fontWeight="bold"
        >
          {isLoggedIn ? "Sign Out" : "Sign In"}
        </Box>
        <Button
          as="a"
          href={isLoggedIn ? "/dashboard" : "/signup"}
          colorScheme="blue"
          fontWeight="bold"
        >
          {isLoggedIn ? "Dashboard" : "Sign up for free"}
        </Button>
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent
}
