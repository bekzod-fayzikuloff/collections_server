import { config } from "./config";
import { Client } from "@opensearch-project/opensearch";
import { INDEXES, ITEMS } from "./constants";
import { getAll } from "./dto";
import { Item } from "./models/items";

const { OPEN_SEARCH: openSearchConfig } = config;

export const openSearchClient = new Client({
  node: openSearchConfig.node,
  auth: {
    username: openSearchConfig.username,
    password: openSearchConfig.password,
  },
});

export const setupIndexes = async () => {
  await openSearchClient.indices.delete({ index: INDEXES });
  await openSearchClient.indices.create({ index: ITEMS });

  const items = await getAll(Item, {
    include: [
      {
        all: true,
      },
    ],
  });
  for (const item of items) {
    await openSearchClient.index({
      index: ITEMS,
      body: {
        ...item.toJSON(),
      },
    });
  }
};
