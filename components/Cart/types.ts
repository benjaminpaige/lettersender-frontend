export namespace µMisc {
  export interface CartItem {
    id: string
    letter: Schemas.Letter
  }

  export interface CartItemLetter {}
}

export namespace µRemoveCartItem {
  export interface Props {
    cartItemId: string
  }

  export type HandleRemoveFromCart = () => void
}

export namespace µCartItem {
  export interface Props {
    cartItem: µMisc.CartItem
  }
}
