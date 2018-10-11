import gql from "graphql-tag";
import { ApolloLink, Observable, MockedProvider } from "apollo-link";
import { inMemoryCache } from "apollo-cache-inmemory";
import {
  ApolloClient,
  DefaultOptions,
  withWarning,
  FetchPolicy,
  QueryOptions
} from "apollo-client";
import MockComponent from "../setupTests";
import { ClientForm } from "../components";

describe("ApolloClient", () => {
  describe("constructor", () => {
    it("will throw an error if link is not passed in", () => {
      expect(() => {
        const client = new ApolloClient({ cache: new InMemoryCache() });
      }).toThrowErrorMatchingSnapshot();
    });

    it("will throw an error if cache is not passed in", () => {
      expect(() => {
        const client = new ApolloClient({ link: new ApolloLink.empty() });
      });
    });
  });
});
