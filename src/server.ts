import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './config';
let server: Server;

async function main() {
  try {
    await mongoose
      .connect(config.database_uri as string)
      .then(() => console.log('Successfully, connected with database.'));

    app.listen(config.port, () => {
      console.log(`App is running on port ${config.port}.`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// for asynchronous error
process.on('unhandledRejection', () => {
  console.log('👿 Un-Handle Rejection Detected. Shutting Down the Server...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// for synchronous error
process.on('uncaughtException', () => {
  console.log('👿 Un-Caught Exception Detected. Shutting Down the Server...');
  process.exit(1);
});
