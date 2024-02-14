const express = require("express")
const router  = express.Router()

const { postNewEmail } = require("../controllers/apiController")

router.post("/newEmail", postNewEmail)

module.exports = router