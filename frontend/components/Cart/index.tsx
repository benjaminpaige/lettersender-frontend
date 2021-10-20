import { useUser } from '@/hooks/useUser'
import * as Chakra from '@chakra-ui/react'

const Cart = () => {
    const me = useUser()
    if(!me.user) return null

    console.log(me.user)
    return (
        <Chakra.Box mx="auto" maxW="2xl" py="2" px={{ base: "4", md: "8" }} minH="400px">
            <Chakra.Heading as="h1" size="xl" my="8">Cart</Chakra.Heading>
        </Chakra.Box>
    )
}

export default Cart 