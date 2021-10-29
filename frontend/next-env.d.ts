/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="react-places-autocomplete" />
/// <reference types="google.maps" />

declare module "google.maps"

declare namespace Schemas {
  declare interface OrderItem {
    id: string;
    recipientName: string
    addressLine1: string
    addressLine2?: string
    postcode: string
    locality: string
    state: string
    price: number
    content: string
    order: Order
  }

  declare interface Order {
    id: string;
    total: number
    items: OrderItem[]
    user: User
    charge: string
  }

  declare interface CartItem {
    id: ID!
    letter: Letter;
    user: User;
  }

  declare interface User {
    firstName: string
    lastName: string
    email: string
    password: string
    dateJoined: string
    darkMode: boolean
    allowMarketingTips: boolean
    allowMarketingUpdates: boolean;
    letters: Letter[];
    cart: CartItem[];
    orders: Order[];
  }

  declare interface Letter {
    recipientName: string
    addressLine1: string
    addressLine2: string
    postcode: string
    locality: string
    state: string
    content: string
    user: User
    price: number
  }
}
