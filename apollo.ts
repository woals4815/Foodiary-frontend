import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-community/async-storage";
import { useEffect, useState } from "react";
import { LOCALSTORAGE_TOKEN } from "./constants";


let token;

AsyncStorage.getItem(LOCALSTORAGE_TOKEN, (error, result) => {
    token = result;
    return;
});
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
const httpLink = createHttpLink({
    uri: process.env.NODE_ENV === "production"
      ? ""
      : "http://localhost:4000/graphql",
});
const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        "x-jwt": authTokenVar() || "",
      }
    }
  });


export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar();
                        }
                    },
                    token: {
                        read() {
                            return authTokenVar();
                        }
                    }
                }
            }
        }
    })
})