module.exports = {
  client: {
    includes: ["./**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "food-app-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
