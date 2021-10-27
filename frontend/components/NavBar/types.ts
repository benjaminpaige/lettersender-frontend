import { HTMLChakraProps } from "@chakra-ui/system"
import { IconType } from "react-icons/lib"

export namespace µNavBar {
  export interface Link {
    label: string
    href?: string
    children?: Array<{
      label: string
      description?: string
      href: string
      Icon?: IconType
    }>
  }
}

export namespace µSubMenu {
  export interface Props {
    link: µNavBar.Link
  }
}

export namespace µNavLink {
  export interface Props extends HTMLChakraProps<"a"> {
    active?: boolean
  }
}

export namespace µSubMenuItem {
  export interface Props extends HTMLChakraProps<"a"> {
    title: string
    Icon?: IconType
    children: React.ReactNode
    href: string
  }
}

export namespace µToggle {
  export interface IconProps {
    active: boolean
  }

  export interface ButtonProps {
    isOpen: boolean
    onClick(): void
  }
}
