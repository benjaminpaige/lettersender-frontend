import { useUser } from '@/hooks/useUser'
import * as Chakra from '@chakra-ui/react'


const CartItem = ({cartItem}) => {
    return (
        <Chakra.Flex py="2" my="2" px={{ base: "4", md: "8" }} backgroundColor={Chakra.useColorModeValue("gray.100", "gray.600")} borderRadius="md"> 
            <Chakra.Box fontSize="small">
                <Chakra.Text>{cartItem.letter.recipientName}</Chakra.Text>
                <Chakra.Text>{cartItem.letter.addressLine1}</Chakra.Text>
                <Chakra.Text>{cartItem.letter.addressLine2}</Chakra.Text>
                    <Chakra.Text>{`${cartItem.letter.locality} ${cartItem.letter.state} ${cartItem.letter.postcode}`}</Chakra.Text>
            </Chakra.Box>
            <Chakra.Spacer/>
            <Chakra.Box>
                <Chakra.Button size="xs" variant="outline">
                    X
                </Chakra.Button>
            </Chakra.Box>
        </Chakra.Flex>
    )
}

const Cart = () => {
    const me = useUser()
    if(!me.user) return null

    return (
        <Chakra.Box mx="auto" maxW="2xl" py="2" px={{ base: "4", md: "8" }} minH="400px">
            <Chakra.Heading as="h1" size="xl" my="8">Cart</Chakra.Heading>
            {me.user.cart.map(cartItem => {
                return <CartItem key={cartItem.id} cartItem={cartItem}/>
            })}
            <Chakra.Divider py="2"/>
            <Chakra.Flex py="2">
            <Chakra.Heading as="h3" size="md">Total</Chakra.Heading>
            <Chakra.Spacer/>
            <Chakra.Heading as="h3" size="md">${2*me.user.cart.length}</Chakra.Heading>
            </Chakra.Flex>
        </Chakra.Box>
    )
}

export default Cart 