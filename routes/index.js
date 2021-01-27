// ============================================================
//  健康チェックシートアプリ
//  by kiuyas(https://github.com/kiuyas)
// ============================================================
// ------------------------------
//  入力画面処理
// ------------------------------
var express = require('express');
var router = express.Router();
var data = require('./data.js');

/**
 * GET / の処理
 */
router.get('/', function (req, res, next) {
    res.render('index', data);
});

module.exports = router;
