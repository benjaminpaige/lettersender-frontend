import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Message = list({
  // TODO
  // access:
  fields: {
    content: text({
      isRequired: true,
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'MessageImage.message',
      ui: {
        displayMode: 'cards',
        cardFields: ['image'],
        inlineCreate: {
          fields: ['image'],
        },
        inlineEdit: {
          fields: ['image'],
        },
      },
    }),
    // just an example of a select option
    // status: select({
    //   options: [
    //     { label: 'Draft', value: 'DRAFT' },
    //     { label: 'Confirmed', value: 'CONFIRMED' },
    //   ],
    //   defaultValue: 'DRAFT',
    // }),
  },
});
