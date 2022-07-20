import { Server } from "https://deno.land/std@0.148.0/http/server.ts";
import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
// const { PORT = 4000 } = config({ safe: true });

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = { Query: { hello: () => `Hello World!` } };

const app = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP<Request>({
          schema: makeExecutableSchema({ resolvers, typeDefs }),
          graphiql: true,
        })(req)
      : new Response("Not Found", { status: 404 });
  },
  // port: Number(PORT),
  hostname: "0.0.0.0",
});

console.log("Server Running!");
app.listenAndServe();
