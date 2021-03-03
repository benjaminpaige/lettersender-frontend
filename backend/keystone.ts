import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-firemail';

const sessionsConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long is the user signed in
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // ADD data seeding here
  },
  lists: createSchema({
    // Schema items here
  }),
  ui: {
    // change this for roles
    isAccessAllowed: () => true,
  },
  // Add session values here
});
