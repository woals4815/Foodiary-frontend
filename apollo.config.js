module.exports = {
  client: {
    includes: ["./**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "food-app-backend",
      url: "https://food-vicion-backend.herokuapp.com/graphql",
    },
  },
};
