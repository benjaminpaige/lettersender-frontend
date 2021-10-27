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
import { çNavBar } from "./constants"
import { APP_NAME } from "../../config"

interface NavContentProps extends FlexProps {
  isSignedIn: boolean
  handleSignOut: () => void
}

const MobileNavContext = ({
  isSignedIn,
  handleSignOut,
  ...flexProps
}: NavContentProps) => {
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
        {çNavBar.links.map((link, idx) =>
          link.children ? (
            <Submenu.Mobile key={idx} link={link} />
          ) : (
            <NavLink.Mobile key={idx} href={link.href}>
              {link.label}
            </NavLink.Mobile>
          )
        )}
        {isSignedIn ? (
          <Button
            onClick={handleSignOut}
            color={mode("blue.600", "blue.300")}
            fontWeight="bold"
            w="full"
            mt="5"
          >
            Sign Out
          </Button>
        ) : (
          <Button
            as="a"
            href="/signin"
            color={mode("blue.600", "blue.300")}
            fontWeight="bold"
            w="full"
            mt="5"
          >
            Sign In
          </Button>
        )}

        <Button
          as="a"
          href={isSignedIn ? "/dashboard" : "/signup"}
          colorScheme="blue"
          w="full"
          size="lg"
          mt="5"
        >
          {isSignedIn ? "Dashboard" : "Sign up for free"}
        </Button>
      </NavMenu>
    </>
  )
}

const DesktopNavContent = ({
  isSignedIn,
  handleSignOut,
  ...flexProps
}: NavContentProps) => {
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
        {çNavBar.links.map((link, idx) => (
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
        {isSignedIn ? (
          <Box
            as="button"
            onClick={handleSignOut}
            color={mode("blue.600", "blue.300")}
            fontWeight="bold"
          >
            Sign Out
          </Box>
        ) : (
          <Box
            as="a"
            href={isSignedIn ? "/logout" : "/signin"}
            color={mode("blue.600", "blue.300")}
            fontWeight="bold"
          >
            {isSignedIn ? "Sign Out" : "Sign In"}
          </Box>
        )}

        <Button
          as="a"
          href={isSignedIn ? "/dashboard" : "/signup"}
          colorScheme="blue"
          fontWeight="bold"
        >
          {isSignedIn ? "Dashboard" : "Sign up for free"}
        </Button>
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent
}
