import { config } from "./config";
import { Client } from "@opensearch-project/opensearch";

const { OPEN_SEARCH: openSearchConfig } = config;

export const openSearchClient = new Client({
  node: openSearchConfig.node,
  auth: {
    username: openSearchConfig.username,
    password: openSearchConfig.password,
  },
});
