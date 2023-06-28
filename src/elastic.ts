import { Client } from "@elastic/elasticsearch";
import { config } from "./config";

const { ELASTIC: elasticConfig } = config;

export const elasticClient = new Client({
  node: elasticConfig.node,
});
