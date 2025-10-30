import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "http";
import { typeDefs, resolvers } from "./schema";
import { initializeElasticsearch } from "./elasticsearch";
import { seedData } from "./seedData";

async function main() {
  await initializeElasticsearch();
  await seedData();

  const yoga = createYoga({
    schema: createSchema({
      typeDefs,
      resolvers,
    }),
  });

  const server = createServer(yoga);

  server.listen(4000, () => {
    console.log("GraphQL server running on http://localhost:4000/graphql");
  });
}

main();
