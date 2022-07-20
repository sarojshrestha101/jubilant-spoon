import { opine } from "https://deno.land/x/opine@2.2.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import * as log from "https://deno.land/std@0.148.0/log/mod.ts";

const { PORT = 4000 } = config({ safe: true });

const app = opine();

app.get("/", (req, res) => {
  log.info(
    `${new Date().getTime()} ip:${req.ip} path:${req.url} method:${req.method}`
  );
  res
    .json({
      message: "Hello world",
    })
    .sendStatus(200);
});

app.listen(Number(PORT), () =>
  console.log("server has started on http://localhost:3000 🚀")
);
