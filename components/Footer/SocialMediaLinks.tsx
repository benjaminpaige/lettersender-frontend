import { ButtonGroup, IconButton } from "@chakra-ui/react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { µSocialMediaLinks } from "./types"
import { çSocialMediaLinks } from "./constants"

export const SocialMediaLinks: React.FC<µSocialMediaLinks.Props> = (props) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    {çSocialMediaLinks.icons.map(({ Icon, label }) => {
      return (
        <IconButton
          as="a"
          href="#"
          aria-label={label}
          key={label}
          icon={<Icon fontSize="20px" />}
        />
      )
    })}
  </ButtonGroup>
)
