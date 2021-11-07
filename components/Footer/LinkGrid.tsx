import { Box, SimpleGrid, Stack } from "@chakra-ui/react"
import Link from "next/link"
import { FooterHeading } from "./FooterHeading"
import { µLinkGrid } from "./types"

export const LinkGrid: React.FC<µLinkGrid.Props> = (props) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">Product</FooterHeading>
      <Stack>
        <Link href="/how-it-works">How it works</Link>
        <Link href="/pricing">Pricing</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Legal</FooterHeading>
      <Stack>
        <Link href="/terms">Terms</Link>
      </Stack>
    </Box>
  </SimpleGrid>
)
