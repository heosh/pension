var mysql_odbc = require('../db/db_conn');
var conn = mysql_odbc.connection();
var fs = require('fs');

const getRoomParams = body => {
        return {
            name: body.name,
            maxpeople: body.maxpeople,
            service: body.service,
            description: body.description,
            check_in: body.check_in,
            check_out: body.check_out,
            main_img : body.main_img
        }
    };

const fileRename = (roomId, roomName) => {
    // 새로 생성된 room의 경우 이미지 이름이 undefined 되어 있어 rename해줌
    var path = './public/images/room';
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            //console.log(file)
            if(file.startsWith('undefined')){
                var nowName = path + "/" + file;
                var newName;
                if(file.endsWith('_0.jpg'))
                {
                    newName = path + "/" + file.replace("undefined", roomName);

                }else{
                    newName = path + "/" + file.replace("undefined", roomId);
                }
                
                fs.renameSync(nowName, newName, (err) => {
                    if(err) {
                        console.log("fileRename Err!! " + err)
                    }else{
                        console.log("file rename complete: " + nowName + " -> " + newName);
                    }
                })
            }
        })
        if(err)
        {
            console.log(err);
        }
    });


};

const roomController = {
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        console.log('redirectPath='+redirectPath)
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
      },

    index: (req, res, next) => {
        console.log("room index in");
        res.locals.menu = "room";
        req.session.menu = "room";
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

    show: (req, res, next) => {
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

    edit: (req, res, next) => {
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
        console.log(req.body)
        console.log("---------")
        console.log(req.files)
       
        let roomParams = getRoomParams(req.body)

        if(roomParams.name == null)
        {
            console.log('name is null!!')
            res.send();
        }
        else{
            // 방 이름 중복체크
            var sql = 'select * from rooms where name = ?'
            conn.query(sql, req.body.name, (err, rows, fields) => {
                if (err) throw error;
                if(rows.length > 0)
                {
                    res.body = req.body;
                    res.send('<script type="text/javascript">alert("이미 해당 이름으로 된 방이 존재합니다."); document.location.href="javascript:history.back()";</script>');
                }
            });
            // rooms data insert
            sql = 'insert into rooms set ?'
            roomParams.main_img = 'images/room/' + roomParams.name + '_0.jpg';
            conn.query(sql, roomParams, (err, rows, fields) => {
                if (!err) {
                    console.log('insert success');
                    console.log('insert id- '+ rows.insertId)
                    fileRename(rows.insertId, roomParams.name)
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