import executeGraphQL from "../executeGraphQL";
import { Query, QueryFeedArgs } from "@/types/gql/graphql";

const GET_FEED_QUERY = `#graphql
query Feed($projectId: ID!, $pagination: Pagination, $filter: FeedFilter) {
  feed(projectId: $projectId, pagination: $pagination, filter: $filter) {
    data {
      id
      project {
        id
        name
        slug
        description
        visibility
        team {
          id
          name
          slug
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        repository {
          fullName
          url
          owner
        }
      }
      type
      content
      details
      metadata {
        branch
        compareUrl
      }
      createdAt
      updatedAt
    }
    meta {
      page
      limit
      pages
      total
    }
  }
}`;

const getFeed = (
  input: QueryFeedArgs,
  tokens?: {
    accessToken?: string;
    apiKey?: string;
  },
  url?: string,
) => {
  const headers: { Authorization?: string } = {
    ...(tokens?.accessToken
      ? { Authorization: `Bearer ${tokens.accessToken}` }
      : {}),
    ...(tokens?.apiKey ? { "x-api-key": tokens.apiKey } : {}),
  };

  return executeGraphQL<{ feed: Query["feed"] }, QueryFeedArgs>({
    url,
    query: GET_FEED_QUERY,
    variables: {
      ...input,
    },
    headers,
  });
};

export default getFeed;
