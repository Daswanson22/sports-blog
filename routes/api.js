const express = require("express")
const router  = express.Router()

const { postNewEmail, getArticleRequest } = require("../controllers/apiController")

router.post("/newEmail", postNewEmail)

module.exports = router