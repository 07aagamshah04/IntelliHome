const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies?.[cookieName];
    // console.log(req);
    if (!tokenCookieValue) {
      // console.log("Token cookie not found");
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      // console.log("Token validated and user payload set", userPayload);
    } catch (error) {
      console.log("Error validating token:", error);
    }

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
