import { list } from '@keystone-next/keystone/schema';
import {
  text,
  password,
  checkbox,
  select,
  relationship,
} from '@keystone-next/fields';

export const User = list({
  ui: {
    listView: {
      initialColumns: ['email'],
    },
    labelField: "email"
  },
  fields: {
    firstName: text({ isRequired: true }),
    lastName: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password({ isRequired: true }),
    // todo add roles, cart and orders
    dateJoined: text(),
    darkMode: checkbox({ defaultValue: false }),
    allowMarketingTips: checkbox({ defaultValue: true }),
    allowMarketingUpdates: checkbox({ defaultValue: true }),
    status: select({
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Deleted', value: 'DELETED' },
      ],
      defaultValue: 'ACTIVE',
    }),
    messages: relationship({
      ref: 'Message.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    letters: relationship({
      ref: 'Letter.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
    }),
    orders: relationship({ ref: 'Order.user', many: true })
  },
});

