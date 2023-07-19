import { config } from "./config";
import { Client } from "@elastic/elasticsearch";
import { ITEMS } from "./constants";

const { ELASTIC_SEARCH: elasticSearchConfig } = config;

export const elasticClient = new Client({
  cloud: {
    id: elasticSearchConfig.cloudId as string,
  },
  auth: {
    username: elasticSearchConfig.username,
    password: elasticSearchConfig.password,
  },
});

export const createIndex = async (indexName: string) => {
  await elasticClient.indices.create({ index: indexName });
};

export const putNewDoc = async (index: string, document: any) => {
  return await elasticClient.index({
    index,
    document: {
      ...document,
    },
  });
};

export const deleteDocumentById = async (index: string, id: string) => {
  return await elasticClient.deleteByQuery({
    index,
    body: {
      query: {
        match: { id },
      },
    },
  });
};

export const addItemRelation = async (id: string, fieldName: string, relation: any[]) => {
  return await elasticClient.updateByQuery({
    index: ITEMS,
    refresh: true,
    body: {
      query: {
        match: { id },
      },
      script: {
        source: `ctx._source['${fieldName}'].addAll(params.relation)`,
        lang: "painless",
        params: {
          relation: [...relation],
        },
      },
    },
  });
};
