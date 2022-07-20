import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import {
  Logger,
  LoggerOptions,
} from "https://deno.land/x/deno_util@v0.0.3/logger.ts";

const initialOptions = { level: 0, format: "%s", newLine: true };
const logger = new Logger(initialOptions as LoggerOptions);
const { PORT = 4000 } = config({ safe: true });

const app = new Application();
app.use((cxt) => {
  cxt.response.body = "Hello GraphQL";
});

logger.info("Server is running");
await app.listen({ port: Number(PORT) });
