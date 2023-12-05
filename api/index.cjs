const express = require('express')
const router = express.Router()



router.use('/robots', require('./robots.cjs'))
router.use('/tasks', require('./tasks.cjs'))
router.use('/owners', require('./owners.cjs'))



module.exports = router