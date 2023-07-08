import { openSearchClient } from "../opensearch";
import { ITEMS, ITEMS_FIELDS } from "../constants";

export const filterItems = async (query: string | undefined) => {
  const response = await openSearchClient.search({
    index: ITEMS,
    body: {
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: query,
                fields: ITEMS_FIELDS,
                fuzziness: "AUTO",
                fuzzy_transpositions: true,
                max_expansions: 50,
                auto_generate_synonyms_phrase_query: true,
              },
            },
          ],
        },
      },
    },
  });
  return response.body.hits.hits;
};
