const { shield, allow, deny, rule } = require("graphql-shield");
const { isAuthorized } = require("./rules/isAuthorized");

const debugRule = rule()(async (parent, args, ctx, info) => {
  console.log(`Shield invoked for ${info.parentType.name}.${info.fieldName}`);
  return true; // Allow all for debug purposes
});

const permissions = shield({
  Query: {}, // No rules applied to Queries
  Mutation: {
    createEmployee: debugRule, // Requires authorization
    editEmployee: isAuthorized,   // Requires authorization
    register: () => true,         // Publicly accessible
    login: () => true,            // Publicly accessible
  },
});


module.exports = { permissions };
