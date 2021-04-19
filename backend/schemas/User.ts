import { list } from '@keystone-next/keystone/schema';
import { text, password, checkbox, select } from '@keystone-next/fields';

export const User = list({
  // access:
  // ui:
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
  },
});
