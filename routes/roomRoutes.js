"use strict";

const { render } = require("ejs");
const roomController = require("../controllers/roomController");
const router = require("express").Router();
const multer = require('multer');

//이미지 업데이트 경로 및 filename 지정
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/images/room') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        var fileList = req.files;
        console.log(fileList);
        var imgNum;
        for(var i = 0; i < 5; i++)
        {
          if(Object.keys(fileList)[i] == undefined) continue;
          var keyName = Object.keys(fileList)[i]
          console.log("keyName-"+keyName)
          imgNum = keyName
        }
        var roomName = req.body.name;
        var roomId = req.body.id;
        if(keyName = 0) roomId = roomName;
        //filename 형식을 roomname_num 형태로 변경
        var filename = roomId + "_" + imgNum + ".jpg";
        //console.log("**filename: "+filename)
      cb(null, filename) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
  })

const upload = multer({storage: storage})


router.get("/", roomController.index);
router.get("/new", roomController.new);
router.post("/create", upload.fields([{ name:'0'}, { name:'1'}, {name:'2'}, {name:'3'}, {name:'4'}]), roomController.create, roomController.redirectView);
router.post("/update", upload.fields([{ name:'0'}, { name:'1'}, {name:'2'}, {name:'3'}, {name:'4'}]), roomController.update, roomController.redirectView);
router.get("/:id/edit", roomController.edit);
router.delete("/:id/delete", roomController.delete, roomController.redirectView);

router.get("/:id", roomController.show);


router.post("/upload", upload.array('img'), roomController.upload);


module.exports = router;