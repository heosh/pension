var express = require('express');
const router = require("express").Router();
var mysql_odbc = require('../db/db_conn');
var conn = mysql_odbc.connection();



/* page처리한뒤 리스트로 뿌림 */
router.get('/page/:page',function(req,res,next)
{
    var page = req.params.page;

    var sql = "select idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board";

       
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('board/page', {title: ' 게시판 리스트', rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
        console.log(rows.length-1); 
       
    });
   
});
  

router.get('/page',function(req,res,next){
    res.redirect('/board/page/1');
});


/* GET write page. */
router.get('/write',function(req,res,next){
    res.render('board/write',{title : "게시판 글쓰기"});
});

 /* POST write page. */
 router.post('/write', function(req,res,next){
    var name = req.session.userId;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,passwd];
 
 
    var sql = "insert into board(name, title, content, regdate, modidate, passwd,hit) values(?,?,?,now(),now(),0,0)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/board/page');
    });
});


 /* GET view page. */
 router.get('/view/:idx',function(req,res,next)
 {
 var idx = req.params.idx;
     var sql = "select idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
         "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board where idx=?";
 
     var sql2 = "update board set hit = hit + 1 WHERE idx = " + req.params.idx;
 
         conn.query(sql,[idx], function(err,row)
     {
         if(err) console.error(err);   
         res.render('board/view', {title:"글 상세보기", row:row[0] , userId : req.session.userId});
         console.log("현재 userId:",req.session.userId);
     });
 
     conn.query(sql2,[idx], function(err,row)
     {
         if(err) console.error(err);   
         console.log("조회수처리됨");
     });
 
 });


/* GET update page. */
router.get('/update/:idx',function(req,res,next)
{
var idx = req.params.idx;
    var sql = "select idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board where idx=?";

          conn.query(sql,[idx], function(err,row)
    {
        if(err) console.error(err);   
        res.render('board/update', {title:"글수정", row:row[0] , userId : req.session.userId});
        console.log("현재 userId:",req.session.userId);
    });
});



/* POST update page. */
router.post('/update',function(req,res,next)
{
    var idx = req.body.idx;
    var title = req.body.title;
    var content = req.body.content;
    var datas = [title,content,idx];
 
 
    var sql = "update board set title=?,content=?, modidate=now() where idx=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        {
            res.send('<script>alert("글을 수정하였습니다.");location.href="/board/page";</script>');
            console.log(datas);
        }
    });
});




/* POST delete page. */
router.post('/delete',function(req,res,next)
{
    var idx = req.body.idx;
    var passwd = req.body.passwd;
    var datas = [idx,passwd];


    var sql = "delete from board where idx=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        {
            res.redirect('/board/page/');
        }
    });
});

 module.exports = router;