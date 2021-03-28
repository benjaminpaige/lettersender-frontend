import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User, Message, MessageImage } from './schemas';
import { insertSeedData } from './seed-data';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-firemail';

const sessionsConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long is the user signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['firstName', 'lastName', 'email', 'password'],
    // TODO add in intial rolres here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data'))
          await insertSeedData(keystone);
      },
      // ADD data seeding here
    },
    lists: createSchema({
      User,
      Message,
      MessageImage,
      // Schema items here
    }),
    ui: {
      // show the ui only for people who pass this test.
      isAccessAllowed: ({ session }) => {
        console.log(session);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionsConfig), {
      User: 'id email firstName lastName',
    }),
    // Add session values here
  })
);
