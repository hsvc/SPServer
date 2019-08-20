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
const ps = require('python-shell')

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
var filename;
module.exports = function(app) {
        app.get('/',function(req,res){
                        res.end("Node-File-Upload");
        });

        /* Upload Func */
        app.post('/upload', function(req, res) {
                console.log(req.files.upload.originalFilename);

                fs.readFile(req.files.upload.path, function (err, data){
                        //var dirname="/root/SPServer/routes/uploads"; // on linux
                        var dirname="/root/Example/SPServer/CycleGAN-tensorflow-master/datasets/monet2photo/testB"
    			filename=req.files.upload.originalFilename;
	                    var newPath = dirname + "/" +   filename; // on linux

                        fs.writeFile(newPath, data, function (err) {
                        if(err){
                                res.json({'response':"Error"});
                        }else {
                                res.json({'response':"Saved"});
                                }
                        });
                });
	
                var options = {
                    mode: 'text',
                    // pythonPath: "C:\\Python34\\python.exe", //window path
                    pythonPath: "/usr/bin/python3",    //ubuntu path
                    pythonOptions: ['-u'],
                    scriptPath: './CycleGAN-tensorflow-master',    // 실행할 py 파일 path. 현재 nodejs파일과 같은 경로에 있어 생략
                    args: ['--dataset_dir=monet2photo','--phase=test', '--which_direction=BtoA']
                };
		console.log("processing...");
                ps.PythonShell.run('main.py', options, function (err, results) {
                    if (err) throw err;
                    // results is an array consisting of messages collected during execution
                    console.log('results: %j', results);
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
        app.get('/download', (req, res) => {

                upload(req, res, function (err) {
            
                    if (err) {
            
                        res.status(400).json({message: err.message})
            
                    } else {
//                        console.log(req);
//                        var path = `/routes/downloads/${req.files.image.originalFilename}`
//			var path=`/root/SPServer/routes/downloads/2.jpg` 
//                       res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
//			console.log(req);
//			var path =`/root/Example/SPServer/test/${req.files.image.originalFilename}`
			var path ="/root/Example/SPServer/test/BtoA_"+filename
			var img=fs.readFileSync(path);
			res.writeHead(200, {'Content-Type':'image/jpg'});
			res.end(img, 'binary');
                    }
                })
            })
};
