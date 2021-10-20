import { useUser } from '@/hooks/useUser'
import * as Chakra from '@chakra-ui/react'


const CartItem = ({cartItem}) => {
    return (
        <Chakra.Box py="2" px={{ base: "4", md: "8" }} border="1px" borderRadius="md" my="2"> 
            <Chakra.Text>{cartItem.letter.recipientName}</Chakra.Text>
            <Chakra.Text>{cartItem.letter.addressLine1}</Chakra.Text>
        </Chakra.Box>
    )
}

const Cart = () => {
    const me = useUser()
    if(!me.user) return null

    console.log(me.user)
    return (
        <Chakra.Box mx="auto" maxW="2xl" py="2" px={{ base: "4", md: "8" }} minH="400px">
            <Chakra.Heading as="h1" size="xl" my="8">Cart</Chakra.Heading>
            {me.user.cart.map(cartItem => {
                return <CartItem key={cartItem.id} cartItem={cartItem}/>
            })}
        </Chakra.Box>
    )
}

export default Cart 