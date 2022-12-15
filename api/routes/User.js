const express = require('express');
const router = express.Router();

const { postUser, patchUser } = require("../controllers/user"); 

router.post("/", postUser);
router.patch("/", patchUser);

module.exports = router;