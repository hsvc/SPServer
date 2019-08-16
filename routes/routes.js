/*
node js 라우팅 설정
라우팅 : HTTP 요청 메소드(get, post) 등 요청에 응답 방법 결정
get: 페이지 url으로 응답
post: post요청에 대한 응답
put
delete
*/

var fs = require('fs');
const multer = require('multer')
const fileType = require('file-type')
const express = require('express')

const upload = multer({
        dest:'images/', 
        limits: {fileSize: 10000000, files: 1},
        fileFilter:  (req, file, callback) => {
        
            if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
    
                return callback(new Error('Only Images are allowed !'), false)
            }
    
            callback(null, true);
        }
    }).single('image')

module.exports = function(app) {
        app.get('/',function(req,res){
                        res.end("Node-File-Upload");
        });

        /* Upload Func */
        app.post('/upload', function(req, res) {
                console.log(req.files.upload.originalFilename);

                fs.readFile(req.files.upload.path, function (err, data){
                        var dirname="/root/SPServer/routes/uploads"; // on linux
                        var newPath = dirname + "/" +   req.files.upload.originalFilename; // on linux

                        fs.writeFile(newPath, data, function (err) {
                        if(err){
                                res.json({'response':"Error"});
                        }else {
                                res.json({'response':"Saved"});
                                }
                        });
                });
        });

        app.get('/uploads/:file', function (req, res){
                file = req.params.file;
                var dirname="/root/SPServer/routes/uploads"; // on linux
                var img = fs.readFileSync(dirname + "/" + file); // on linux

                res.writeHead(200, {'Content-Type': 'image/jpg' });
                res.end(img, 'binary');
        });

        /* Download Func */
        app.post('/download', (req, res) => {

                upload(req, res, function (err) {
            
                    if (err) {
            
                        res.status(400).json({message: err.message})
            
                    } else {
                        console.log(req.files.image.originalFilename);
                        let path = `/routes/downloads/${req.files.image.originalFilename}`
                        res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
                    }
                })
            })

};
