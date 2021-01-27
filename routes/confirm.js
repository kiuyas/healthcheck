// ============================================================
//  健康チェックシートアプリ
//  by kiuyas(https://github.com/kiuyas)
// ============================================================
// ------------------------------
//  確認・印刷画面処理
// ------------------------------
var express = require('express');
var router = express.Router();
var data = require('./data.js');

/**
 * POST / の処理
 */
router.post('/', function(req, res, next) {
    data.data = req.body;
    data.jpYear = '令和' + (data.data.year - 2018);
    data.pagetitle = `${data.titlePrefix}${data.title}(${data.jpYear}年${data.data.month}月)${data.data.name}`;
    data.data.date = data.jpYear + '年' + data.data.month + '月';
    data.data.score1 = calc1(data.data);
    data.data.judge1 = judge1(data.data.score1);
    data.data.score2 = calc2(data.data);
    data.data.judge2 = judge2(data.data.score2);
    data.data.score3 = calc3(data.data.judge1, data.data.judge2);
    data.data.printDate = getDateTimeString();
    res.render('confirm', data);
});

/**
 * 評価1の計算
 * @param {*} d パラメータ
 * @returns 計算結果
 */
function calc1(d) {
    var score = 0;
    for(var i = 0; i < data.textsA1.length; i++) {
        score += data.scoreA[d['opt1_' + i]];
    }
    return score;
}

/**
 * 評価1の判定
 * @param {*} score 点数
 * @returns 判定結果
 */
function judge1(score) {
    if (score >= 0 && score <= 4) {
        return 0;
    } else  if (score >= 5 && score <= 10) {
        return 1;
    } else  if (score >= 11 && score <= 20) {
        return 2;
    }
    return 3;
}

/**
 * 評価2の計算
 * @param {*} d パラメータ
 * @returns 計算結果
 */
function calc2(d) {
    var score = 0;
    for(var i = 0; i < data.textsB1.length; i++) {
        score += data.scoreB[d['opt2_' + i]];
    }
    return score;
}

/**
 * 評価2の判定
 * @param {number} score 点数
 * @returns 判定結果
 */
function judge2(score) {
    if (score == 0) {
        return 0;
    } else  if (score >= 1 && score <= 2) {
        return 1;
    } else  if (score >= 3 && score <= 5) {
        return 2;
    }
    return 3;
}

/**
 * 総合評価の判定
 * @param {*} judge1 評価1の判定
 * @param {*} judge2 評価2の判定
 * @returns 判定結果
 */
function calc3(judge1, judge2) {
    var arr = [
        [0, 0, 2, 4],
        [0, 1, 3, 5],
        [0, 2, 4, 6],
        [1, 3, 5, 7],
    ];

    return arr[judge1][judge2];
}

/**
 * 日時文字列の取得
 * @returns 日時文字列(yyyy/MM/dd HH:mm:ss)
 */
function getDateTimeString() {
    var d = new Date();
    var z = function(v) {
        // ゼロ埋めで2桁にする
        return v < 10 ? '0' + v : v;
    }

    return d.getFullYear() + '/' + z(d.getMonth() + 1) + '/' + z(d.getDate()) + " " 
        + z(d.getHours()) + ":" + z(d.getMinutes()) + ":" + z(d.getSeconds()); 
}

module.exports = router;
