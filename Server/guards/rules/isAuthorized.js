const { rule } = require('graphql-shield');
const { verifyToken } = require('../../utils/hashPassword');

const isAuthorized = rule()(async (parent, args, ctx, info) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    console.error("Authorization header missing");
    return false;
  }

  const token = authorization.replace("Bearer", "").trim();
  try {
    const { userId } = verifyToken(token);
    return !!userId;
  } catch (err) {
    console.error("Invalid token:", err.message);
    return false;
  }
});

module.exports = { isAuthorized };