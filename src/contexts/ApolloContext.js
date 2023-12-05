import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const ApolloContext = createContext();

const ApolloProviderWrapper = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  const client = new ApolloClient({
    uri: "https://graphqlpokemon.favware.tech/v7",
    cache: new InMemoryCache(),
  });

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: gql`
          {
            getAllPokemon {
              species
              weight
              height
              color
              abilities {
                first {
                  name
                }
              }
              backSprite
              types {
                name
              }
              baseStats {
                speed
                attack
                defense
              }
              legendary
              sprite
            }
          }
        `,
      });
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [!client]);

  return (
    <ApolloContext.Provider value={{ client, apiData, fetchData }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloContext.Provider>
  );
};

const useApollo = () => {
  const context = useContext(ApolloContext);
  if (!context) {
    throw new Error("useApollo must be used within an ApolloProviderWrapper");
  }
  return context;
};

export { ApolloProviderWrapper, useApollo };
