const tryCatchWrapper = require("./try-catch-wrapper");
const { googleAuth, googleRedirect } = require("./auth.controller");

router.get("/google", tryCatchWrapper(googleAuth));

router.get("/google-redirect", tryCatchWrapper(googleRedirect));