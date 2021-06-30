import { relationship } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const CartItem = list({
  fields: {
    message: relationship({ ref: "Message" }),
    user: relationship({ ref: "User.cart" }),
  },
});
