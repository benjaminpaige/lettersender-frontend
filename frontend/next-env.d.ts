/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="react-places-autocomplete" />
/// <reference types="google.maps" />

declare module "google.maps"

declare namespace Schemas {
  declare interface User {
    firstName: string
    lastName: string
    email: string
    password: string
    dateJoined: string
    darkMode: boolean
    allowMarketingTips: boolean
    allowMarketingUpdates: boolean
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
  }
}
