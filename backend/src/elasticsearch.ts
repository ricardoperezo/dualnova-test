import { Client } from "@elastic/elasticsearch";

export const esClient = new Client({
  node: "http://localhost:9200",
});

export async function initializeElasticsearch() {
  try {
    const health = await esClient.cluster.health();
    console.log("Elasticsearch connected:", health.status);
  } catch (error) {
    console.error("Elasticsearch connection failed:", error);
  }
}
