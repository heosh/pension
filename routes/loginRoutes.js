var express = require('express');
const router = require("express").Router();
var mysql_odbc = require('../db/db_conn');
var conn = mysql_odbc.connection();

/* GET login page. */
router.get('/', function(req, res, next) {
 
  res.render('user/login');
});

/* POST login page. */
router.post('/', function (req, res, next) {
    var userId = req.body['userId'];
    var userPw = req.body['userPw'];
    
  
    conn.query('select * from user where id=? and password=?',[userId,userPw], function (err, rows, fields) {
        if (!err) {
            if (rows[0]!=undefined) {
              if (err) console.error("err : " + err);
              req.session.userId = userId;
              // req.session.userPw = userPw;
              // res.render('index', {userId : req.body.userId});
              res.send('<script>alert("로그인하였습니다.");location.href="/";</script>');
              console.log('Post:', req.session.userId);
            }else {
              res.send('<script>alert("아이디또는비밀번호를 다시확인하세요!!");location.href="/login";</script>');
            }
  
        } else {
            res.send('error : ' + err);
        }
    });
  });

  /* GET logout page. */
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.send('<script>alert("로그아웃되었습니다");location.href="/";</script>');
  });

 /* GET passwordchange page. */
router.get('/passwordchange', function (req, res, next) {
  res.render('user/passwordchange');
});


/* POST passwordchange page. */
router.post('/passwordchange', function (req, res, next) {
  var userId = req.body['userId'];
  var userPw = req.body['userPw'];
  var userPwNew = req.body['userPwNew'];
  conn.query('select * from user where id=? and password=?', [userId, userPw], function (err, rows, fields) {
      if (!err) {
          if (rows[0] != undefined) {
              conn.query('update user set password=? where id=?', [userPwNew, userId], function (err, rows, fields) {
                  if (!err) {
                      req.session.destroy();
                      res.send('<script>alert("비밀번호가 변경되었습니다.");location.href="/";</script>');
                  } else {
                      res.send('error : ' + err);
                  }
              });
          } else {
              res.send('<script>alert("아이디또는비밀번호를 다시확인하세요!!");location.href="/login/passwordchange";</script>');
          }

      } else {
          res.send('error : ' + err);
      }
  });

});

/* GET userdelete page. */
router.get('/userdelete', function (req, res, next) {
  res.render('user/userdelete');
});

/* POST userdelete page. */
router.post('/userdelete', function (req, res, next) {
  var userId = req.body['userId'];
  var userPw = req.body['userPw'];
  conn.query('select * from user where id=? and password=?', [userId, userPw], function (err, rows, fields) {
      if (!err) {
          if (rows[0] != undefined) {
              conn.query('delete from user where id=?', [userId], function (err, rows, fields) {
                  if (!err) {
                      req.session.destroy();
                      res.send('<script>alert("회원탈퇴에 성공하였습니다.");location.href="/";</script>');
                  } else {
                      res.send('error : ' + err);
                  }
              });
          } else {
              res.send('<script>alert("아이디또는비밀번호를 다시확인하세요!!");location.href="/login/userdelete";</script>');
          }

      } else {
          res.send('error : ' + err);
      }
  });

});


/* GET join page. */
router.get('/join',function(req,res,next ){
  res.render('user/join');

});


/* POST join page. */
router.post('/join',function(req,res,next){
  var userId = req.body['userId'];
  var userPw = req.body['userPw'];
  var userPwRe = req.body['userPwRe'];
  var name = req.body['username'];
  var phone =  req.body['phone'];
  var email = req.body['email'];

  conn.query('select* from user where id=?',[userId],function(err,data){
    if(data.length == 0){
        if (userPw == userPwRe) {
            conn.query('insert into user values(?,?,?,?,?)', [userId, userPw,name,phone,email], function (err, rows, fields) {
                if (!err) {
                    res.send('<script>alert("회원가입에 성공하였습니다");location.href="/";</script>');
                } else {
                    res.send('err : ' + err);
                }
            });
        }else{
            res.send('<script>alert("비밀번호를 확인해주세요");location.href="/login/join";</script>');
        }

    }else{
        res.send('<script>alert("이미존재하는 아이디입니다.");location.href="/login/join";</script>');
        console.log('아이디존재')
    
    }
}); 
});

/* POST idcheck page. */
router.post('/idcheck',function(req,res,next){
    var userId = req.body['userId'];

    conn.query('select* from user where id=?',[userId],function(err,data){
        if(data.length == 0){
            res.send('<script>alert("사용 가능한 아이디입니다.");location.href="/login/join";</script>');
        }else{
            res.send('<script>alert("이미존재하는 아이디입니다.");location.href="/login/join";</script>');
        }
 });
});



/* GET findpassword page. */
router.get('/findpassword',function(req,res,next ){
    res.render('user/findpassword');
  
  });
  

/* POST findpassowrd page. */
router.post('/findpassword',function(req,res,next){
    var userId = req.body['userId'];
    var email = req.body['email'];
    var sql = 'select id from user';
       

    conn.query('select id,email from user where id=? and email=?',[userId,email],function(err,rows,fields){
        if (!err) {
        if (rows[0] != undefined) {
            res.send('<script>location.href="/login/updatepassword";</script>');
        }else{
            res.send('<script>alert("아이디 또는 Email을 다시확인하세요!!");location.href="/login/findpassword";</script>'); 
            console.log("sql=",sql)
        }
        }else{
            res.send('err : ' + err);
        }
    })

});

/* GET udpatepassword page. */
router.get('/updatepassword',function(req,res,next ){
    res.render('user/updatepassword');
  
  });


/* GET udpatepassword page. */
router.post('/updatepassword',function(req,res,next){
    var userId = req.body['userId'];
    var userPw = req.body['userPw'];
    var userPwRe = req.body['userPwRe'];

    conn.query('select* from user where id=?',[userId],function(err,data){
            if (userPw == userPwRe) {
                conn.query('update user set password=? where id=?', [userPw, userId], function (err, rows, fields) {
                    if (!err) {
                        res.send('<script>alert("비밀번호변경 성공하였습니다");location.href="/";</script>');
                    } else {
                        res.send('err : ' + err);
                    }
                });
            }else{
                res.send('<script>alert("아이디 또는 비밀번호를 확인해주세요");location.href="/login/updatepassword";</script>');
            }
    
        
    }); 
}); 


/* GET myinfo page. */
router.get('/myinfo',function(req,res,next){

    var userId = req.session.userId;
        
    var sql = "select id,password,name,phone,email from user  where id = " + "'"+ req.session.userId +"'";

    conn.query(sql,[userId],function (err, row) {
        if (err) console.error("err : " + err);
        res.render('user/myinfo', {title: ' 내정보' ,row:row[0] ,userId : req.session.userId});
        console.log('@@@userId:',userId); 
       
    });
})




module.exports = router;
