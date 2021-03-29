import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Message = list({
  // TODO
  // access:
  ui: {
    listView: {
      initialColumns: ['content', 'photos'],
    },
  },
  fields: {
    content: text({
      isRequired: true,
      ui: {
        displayMode: 'textarea',
      },
    }),
    photos: relationship({
      ref: 'MessageImage.message',
      many: true,
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
