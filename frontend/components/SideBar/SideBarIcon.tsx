import { IconButton } from "@chakra-ui/react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

interface SideBarIconProps {
  toggleSideBar: () => void
  sideBarCollapsed: boolean
}

export const SideBarIcon = ({
  sideBarCollapsed,
  toggleSideBar
}: SideBarIconProps) => {
  const ariaLabel = `${sideBarCollapsed ? "open" : "close"} sidebar`
  return (
    <IconButton
      variant="solid"
      aria-label={ariaLabel}
      fontSize="36"
      isRound
      top="6"
      left={sideBarCollapsed ? "15" : "260"}
      position="absolute"
      icon={sideBarCollapsed ? <BiChevronRight /> : <BiChevronLeft />}
      onClick={toggleSideBar}
      zIndex="10"
    />
  )
}
