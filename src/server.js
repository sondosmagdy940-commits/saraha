import http from "node:http";
import app from "./main.js";
import { env } from "./common/config/env.js";
import { logger } from "./pkg/logger/logger.js";

const server = http.createServer(app);
server.listen(env.port, () => {
    logger.info(`server is running on port ${env.port}`);
  });

async function shutdown() {
    server.close(async () => {
        await mongoose.disconnect();
        process.exit(0)
    })
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);