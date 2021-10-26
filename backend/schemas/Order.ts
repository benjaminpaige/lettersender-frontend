import { integer, relationship, text, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Order = list({
    ui: {
        listView: {
            initialColumns: ['charge', 'total', 'user'],
        },
        labelField: "charge"
        },
  fields: {
      total: integer(),
      items: relationship({ref: 'OrderItem.order', many: true}),
      user: relationship({ref: 'User.orders'}),
      charge: text(),
    //   label: virtual({
    //       graphQLReturnType: 'String',
    //       resolver: function(item) {
    //         return 'Maybe some custom label here eventually idk'
    //       }
    //   })
  }
});
