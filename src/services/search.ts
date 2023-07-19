import { elasticClient } from "../elastic";
import { ITEMS, ITEMS_FIELDS } from "../constants";

export const filterItems = async (query: string) => {
  const response = await elasticClient.search({
    index: ITEMS,
    body: {
      query: {
        multi_match: {
          query: query,
          fields: ITEMS_FIELDS,
          fuzziness: "AUTO",
          fuzzy_transpositions: true,
          max_expansions: 50,
          auto_generate_synonyms_phrase_query: true,
        },
      },
    },
  });
  return response.hits.hits;
};
