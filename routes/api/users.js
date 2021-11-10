const express = require("express");
const router = express.Router();
const { registration, login, logout, verify } = require("../../controllers");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");

const { joiSchema } = require("../../model/user.js");
router.post(
  "/registration",
  validation(joiSchema),
  controllerWrapper(registration)
);

router.get("/verify/:verifyToken", controllerWrapper(verify));
router.post("/login", validation(joiSchema), controllerWrapper(login));
router.get("/logout", authenticate, controllerWrapper(logout));

const { Transaction } = require("../../model");


router.delete("/:transactionId", async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { transactionId } = req.params;
    const result = await Transaction.findByIdAndDelete({ _id: transactionId, owner: _id, });
    if (!result) {
      res
        .status(404)
        .send({ error: `Contact by id=${transactionId} is not found` });
    }
    res.json({
      status: "success",
      code: 200,
      message: "Success remove",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
