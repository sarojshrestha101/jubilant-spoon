// @ts-ignore
import { Application } from "https://deno.land/x/oak/mod.ts";
// @ts-ignore
import { config } from "https://deno.land/x/dotenv/mod.ts";
// @ts-ignore
import { Logger, LoggerOptions } from "https://deno.land/x/deno_util/logger.ts";

const initialOptions = { level: 0, format: "%s", newLine: true };
const logger = new Logger(initialOptions as LoggerOptions);
const { PORT = 4000 } = config({ safe: true });

const app = new Application();
app.use((cxt: { response: { body: string } }) => {
  cxt.response.body = "Hello GraphQL";
});

logger.line(`🚀 Server is running on http://localhost:${PORT}/graphql`);
await app.listen({ port: Number(PORT) });
