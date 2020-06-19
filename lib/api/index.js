const express = require('express');

const router = express.Router();
router.route('/').get((req, res) => {
	res.json({ text: 'hello world' });
});
module.exports = router;
