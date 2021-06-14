var mysql_odbc = require('../db/db_conn');
var conn = mysql_odbc.connection();

const getRoomParams = body =>{
        return {
            name: body.name,
            maxpeople: body.maxpeople,
            amenity: body.amenity,
            service: body.service,
            description: body.description,
            check_in: body.check_in,
            check_out: body.check_out
        }
    };

const roomController = {
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        console.log('redirectPath='+redirectPath)
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
      },

    index: async (req, res, next) => {
        console.log("room index in");
        console.log(req.session.userId);
        var sql = "select * from rooms order by id";
        conn.query(sql, (err, rows, fields) => {
            if (!err) {
                console.log('select success');
                console.log(rows);
                res.render("room/index", {roomList: rows, userId: req.session.userId});
            } else {
                console.log('err : ' + err);
                res.send();
            }
        });
    },

    show: async (req, res, next) => {
        console.log("room show in id: " + req.params.id);
        var sql = "select * from rooms where id = ?";
        conn.query(sql, req.params.id, (err, rows, fields) => {
            if (!err) {
                console.log('select success');
                console.log(rows);
                res.render("room/info", {roomList: rows, userId: req.session.userId});
            } else {
                console.log('err : ' + err);
                res.send();
            }
        });
    },

    edit: async (req, res, next) => {
        console.log("room edit in id: " + req.params.id);
        var id = req.params.id;
        var sql = "select * from rooms where id = ?";
        conn.query(sql, id, (err, rows, fields) => {
            if (!err) {
                console.log('select success');
                console.log(rows);
                res.render("room/edit", {roomData: rows});
            } else {
                console.log('err : ' + err);
                res.send();
            }
        });
        //res.render("room/edit");
    },

    new: (req, res, nex) => {
        res.render("room/new");
    },

    create: (req, res, next) => {
        console.log('room create in');
        let roomParams = getRoomParams(req.body)
        console.log(roomParams)
        console.log(req.files);
        if(roomParams.name == null)
        {
            console.log('name is null!!')
            res.send();
        }
        else{
            var sql = 'insert into rooms set ?'
            conn.query(sql, roomParams, (err, rows, fields) => {
                if (!err) {
                    console.log('insert success');
                    console.log('insert id- '+ rows.insertId)
                    res.locals.redirect = `/room/${rows.insertId}`;
                    next();
                } else {
                    console.log('err : ' + err);
                    res.send();
                }
            });
        }
    },

    delete: (req, res, next) => {
        console.log('room delete in')
        console.log(req.params)
        var roomId = req.params.id
        if(roomId == null)
        {
            console.log('[room delete] roomId is null!')
            res.send()
        }
        else
        {
            var sql = 'delete from rooms where id=?'
            conn.query(sql, roomId, (err, rows, fields) => {
                if(!err) {
                    console.log('delete success');
                    res.locals.redirect = `/room`;
                    next();
                } else {
                    console.log('err : ' + err);
                    res.send();
                }
            })
        }
    },

    upload: (req, res, next) => {
        res.json(req.files);
        console.log("----");
        console.log(req.files);
        console.log("----");
    },

    update: (req, res, next) => {
        console.log("----");
        console.log(req.files);
        console.log('room update in');
        let roomParams = getRoomParams(req.body)
        console.log(roomParams)
        var roomId = req.body.id;
        if(roomId == null)
        {
            console.log('[room update] roomId is null!');
            res.send();
        }
        else
        {
            conn.query('select * from rooms where id= ?', roomId, (err, rows, fields) => {
                if(rows.length > 0) //업데이트할 room data가 있는지 확인
                {
                    var sql = 'update rooms set ? where id= ?';
                    conn.query(sql, [roomParams, roomId], (err, rows, fields) => {
                        if (!err) {
                            console.log('update success');
                            console.log(`/room/${roomId}`);                            
                            res.locals.redirect = `/room/${roomId}`;
                            next();
                        } else {
                            console.log('err update room info: ' + err);
                            res.send();
                        }
                    });
                }
                else
                {
                    console.log('update roomid is not exist');
                    res.send();
                }
            });
        }
    }
};

module.exports = roomController;