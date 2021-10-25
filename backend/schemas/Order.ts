import { integer, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Order = list({
    ui: {
        listView: {
            initialColumns: ['total', 'charge', 'user'],
        },
        labelField: "total"
        },
  fields: {
      total: integer(),
      items: relationship({ref: 'OrderItem.order', many: true}),
      user: relationship({ref: 'User.orders'}),
      charge: text()
  }
});
