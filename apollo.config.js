module.exports = {
  client: {
    service: {
      name: 'expenses-tracker',
      url: 'http://localhost:3001/graphql'
    },
    includes: ['./client/src/**/*.{ts,tsx,js,jsx,graphql,gql}']
  }
};
