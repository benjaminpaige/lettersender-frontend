import {
  chakra,
  HTMLChakraProps,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { forwardRef } from "react"
import { µNavLink } from "./types"

const DesktopNavLink = forwardRef<HTMLAnchorElement, µNavLink.Props>(
  (props, ref) => {
    const { active, ...rest } = props
    return (
      <chakra.a
        ref={ref}
        display="inline-block"
        px="4"
        py="6"
        fontWeight="semibold"
        aria-current={active ? "page" : undefined}
        color={mode("gray.600", "gray.400")}
        transition="all 0.2s"
        {...rest}
        _hover={{ color: "gray.500" }}
        _active={{ color: "blue.600" }}
        _activeLink={{
          color: "blue.600",
          fontWeight: "bold"
        }}
      />
    )
  }
)
DesktopNavLink.displayName = "DesktopNavLink"

export const MobileNavLink: React.FC<µNavLink.Props> = ({
  active,
  ...props
}) => {
  return (
    <chakra.a
      aria-current={active ? "page" : undefined}
      w="full"
      display="flex"
      alignItems="center"
      height="14"
      fontWeight="semibold"
      borderBottomWidth="1px"
      {...props}
    />
  )
}

export const NavLink = {
  Mobile: MobileNavLink,
  Desktop: DesktopNavLink
}
