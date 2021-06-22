"use strict";

var mysql_odbc = require('../db/db_conn');
var conn = mysql_odbc.connection();

const getBookingParams = body => {
    return {
        userId: body.userId,
        roomId: body.roomId,
        in_date: body.in_date,
        out_date: body.out_date,
        inwon: body.inwon,
        barbecue: body.barbecue,
        price: body.price,
        request : body.request
    }
};

const todate = () => {
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();
    var day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();
    
    date = year + '-'+ month + '-'+ day;
    return date;
}


const bookingController = {
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        console.log('redirectPath='+redirectPath)
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
      },

    main: (req, res) => {
        console.log("booking in");
        res.locals.menu = "booking";
        req.session.menu = "booking";
        if(req.session.userId == undefined)
        {
            //로그인 화면으로
            res.send('<script type="text/javascript">alert("먼저 로그인해주시기 바랍니다."); document.location.href="/login";</script>'); 
        }
        else
        {
            res.render('booking/main');
        }
    },

    seldate: (req, res, next) => {
        console.log(req.body)
        var in_date = req.body.in_date;
        var out_date = req.body.out_date;
        console.log("room seldate in! date: " + in_date + "~" + out_date);
        //체크인 날짜가 체크아웃 날짜보다 이후일 때
        if(in_date >= out_date)
        {
            res.send('<script type="text/javascript">alert("체크아웃 날짜는 체크인 날짜 이후여야 합니다. 다시 선택해주세요."); document.location.href="javascript:history.back()";</script>'); 
        }
        else
        {
            if(in_date != undefined && out_date != undefined)
            {
                // 선택한 날짜에 예약 가능한 방 확인. booked가 1이면 이미 예약된 방, 0이면 예약 가능
                var sql = "select r.id, r.name, r.maxpeople, r.price, case when id in(select roomId from reservation where out_date < ? and in_date >= ?) then '1' else '0' end booked from rooms r order by id";
                conn.query(sql, [in_date, out_date], (err, rows, fields) => {
                    console.log(sql)
                    if (err){
                        console.log('err : ' + err);
                        res.send();
                    }
                    if(rows.length > 0)
                    {
                        res.body = req.body;
                        res.render("booking/detail", {in_date: in_date, out_date: out_date, roomBookingInfo: rows, userId: req.session.userId});   
                    }
                });
            }
            else
            {
                res.send('<script type="text/javascript">alert("날짜를 다시 선택해주세요."); document.location.href="javascript:history.back()";</script>');
            }
        }
    },

    create: (req, res, next) => {
        console.log('booking create in');
        console.log(req.body)
       
        let bookingParams = getBookingParams(req.body)

        if(bookingParams.roomId == null)
        {
            console.log('select room id is null!!')
            res.send('<script type="text/javascript">alert("예약하실 방은 선택해주세요."); document.location.href="javascript:history.back()";</script>');
        }
        else
        {
            // reservation data insert
            var sql = 'insert into reservation set ?'
            conn.query(sql, bookingParams, (err, rows, fields) => {
                if (!err) {
                    console.log('insert success');
                    console.log('insert id- '+ rows.insertId)
                    res.locals.redirect = `/booking/check`;
                    next();
                } else {
                    console.log('err : ' + err);
                    res.send();
                }
            });
        }
    },

    check: (req, res, next) => {
        console.log("booking check in");
        res.locals.menu = "booking2";
        console.log("userId: " + req.session.userId);
        var userId = req.session.userId;
        var sql = "select re.id reservId, u.id, re.roomId, r.name roomName, re.in_date, re.out_date, re.inwon, re.barbecue, re.request, r.price ";
            sql += "from reservation re join rooms r on r.id = re.roomId ";
            sql += "join user u on re.userId = u.id ";
        if(userId != 'admin')
        {
            // 사용자인 경우 필터값 추가. 사용자는 현재 날짜 이후의 예약 내역만 조회 가능하다.
            sql += "where u.id = '" + userId + "' ";
            sql += "and in_date >= '" + todate() + "' ";
        }
        console.log(sql);
        conn.query(sql, (err, rows, fields) => {
            if (!err) {
                console.log('[booking check] select success');
                console.log(rows);
                res.render("booking/check", {bookingList: rows, userId: userId});
            } else {
                console.log('err : ' + err);
                res.send();
            }
        });
    },

    delete: (req, res, next) => {
        console.log('booking delete in')
        console.log(req.params)
        var bookedId = req.params.id
        if(bookedId == null)
        {
            console.log('[booking delete] bookedId is null!')
            res.send()
        }
        else
        {
            var sql = 'delete from reservation where id=?'
            conn.query(sql, bookedId, (err, rows, fields) => {
                if(!err) {
                    console.log('delete success');
                    res.locals.redirect = "/booking/check";
                    next();
                } else {
                    console.log('err : ' + err);
                    res.send();
                }
            })
        }
    }
};


module.exports = bookingController;