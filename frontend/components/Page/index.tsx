import { useState } from "react"
import { useRouter } from "next/router"
import { Flex, Box } from "@chakra-ui/react"
import { DashboardLayout } from "@/components/Layouts"

export default function Page({ children }) {
  const router = useRouter()

  const inDashBoard = router.pathname.startsWith("/dashboard")

  if (inDashBoard) {
    return <DashboardLayout>{children}</DashboardLayout>
  }
  return (
    <Flex>
      <Box flex="1">{children}</Box>
    </Flex>
  )
}
