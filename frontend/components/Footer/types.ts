import {
  TextProps,
  HeadingProps,
  ButtonGroupProps,
  SimpleGridProps,
  HTMLChakraProps
} from "@chakra-ui/react"

export namespace µCopyright {
  export interface Props extends TextProps {}
}

export namespace µFooterHeading {
  export interface Props extends HeadingProps {}
}

export namespace µLinkGrid {
  export interface Props extends SimpleGridProps {}
}

export namespace µSocialMediaLinks {
  export interface Props extends ButtonGroupProps {}
}

export namespace µSubscribeForm {
  export interface Props extends HTMLChakraProps<"form"> {}
}
