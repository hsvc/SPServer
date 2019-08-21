/*
node js 라우팅 설정
라우팅 : HTTP 요청 메소드(get, post) 등 요청에 응답 방법 결정

get: 페이지 url으로 응답
post: post요청에 대한 응답
put
delete
*/

const fs = require('fs');
const multer = require('multer')
const fileType = require('file-type')
const express = require('express')
const ps = require('python-shell')
// Absolute Path, change when you use this code !
const absPath="/root/SPServer"

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
                        res.end(currentPath);
        });

        /* Upload Func */
        app.post('/upload', function(req, res) {
                console.log(req.files.upload.originalFilename);
                /* Monet */
                fs.readFile(req.files.upload.path, function (err, data){
                    filename=req.files.upload.originalFilename;
                    // make file to implement (monet, vangogh, cezanne, plain)
                    fs.writeFileSync(absPath + "/CycleGAN-tensorflow-master/datasets/vangogh2photo/testB/vangogh_"+filename, data);
                    fs.writeFileSync(absPath + "/CycleGAN-tensorflow-master/datasets/cezanne2photo/testB/cezanne_"+filename, data);
                    fs.writeFileSync(absPath + "/test/"+filename, data);
                    fs.writeFile(absPath + "/CycleGAN-tensorflow-master/datasets/monet2photo/testB/monet_"+filename, data, function (err) {
                        if(err){
                            res.json({'response':"Error"});
                        }else {
                            res.json({'response':"Saved"});
                            }
                    });
                });
                console.log("read file fin")
                // Monet 
                var options = {
                    mode: 'text',
                    pythonPath: "/usr/bin/python3",    //ubuntu path
                    pythonOptions: ['-u'],
                    scriptPath: './CycleGAN-tensorflow-master',    // 실행할 py 파일 path. 현재 nodejs파일과 같은 경로에 있어 생략
                    args: ['--dataset_dir=monet2photo','--phase=test', '--which_direction=BtoA']
                };
                ps.PythonShell.run('main.py', options, function (err, results) {
                    if (err) throw err;
                    // results is an array consisting of messages collected during execution
                    console.log('monet results: %j', results);
                });
                // Van gogh
                options = {
                    mode: 'text',
                    pythonPath: "/usr/bin/python3",    //ubuntu path
                    pythonOptions: ['-u'],
                    scriptPath: './CycleGAN-tensorflow-master',    // 실행할 py 파일 path. 현재 nodejs파일과 같은 경로에 있어 생략
                    args: ['--dataset_dir=vangogh2photo','--phase=test', '--which_direction=BtoA']
                };
                ps.PythonShell.run('main.py', options, function (err, results) {
                    if (err) throw err;
                    // results is an array consisting of messages collected during execution
                    console.log('vangogh results: %j', results);
                });
                // Cezanne
                options = {
                    mode: 'text',
                    pythonPath: "/usr/bin/python3",    //ubuntu path
                    pythonOptions: ['-u'],
                    scriptPath: './CycleGAN-tensorflow-master',    // 실행할 py 파일 path. 현재 nodejs파일과 같은 경로에 있어 생략
                    args: ['--dataset_dir=cezanne2photo','--phase=test', '--which_direction=BtoA']
                };
                ps.PythonShell.run('main.py', options, function (err, results) {
                    if (err) throw err;
                    // results is an array consisting of messages collected during execution
                    console.log('cezanne results: %j', results);
                });

        });

        // app.get('/uploads/:file', function (req, res){
        //         file = req.params.file;
        //         var dirname=absPath+"/routes/uploads"; // on linux
        //         var img = fs.readFileSync(dirname + "/" + file); // on linux

        //         res.writeHead(200, {'Content-Type': 'image/jpg' });
        //         res.end(img, 'binary');
        // });

        /* Download Func */
        app.get('/download/monet', (req, res) => {
                upload(req, res, function (err) {
                    if (err) {
                        res.status(400).json({message: err.message})
                    } else {
                    var path =absPath+"/test/BtoA_monet_"+filename
                    var img=fs.readFileSync(path);
                    res.writeHead(200, {'Content-Type':'image/jpg'});
                    res.end(img, 'binary');
                    }
                })
                // after download, files are deleted
                fs.unlink(absPath+"/CycleGAN-tensorflow-master/datasets/monet2photo/testB/monet_"+filename, function(err){
                    if( err ) throw err;
                    console.log('origin monet : file deleted');
                });
                fs.unlink(absPath+"/test/BtoA_monet_"+filename, function(err){
                    if( err ) throw err;
                    console.log('test monet : file deleted');
                });

            })

        app.get('/download/vangogh', (req, res) => {
                upload(req, res, function (err) {
                    if (err) {
                        res.status(400).json({message: err.message})
                    } else {
                    var path =absPath+"/test/BtoA_vangogh_"+filename
                    var img=fs.readFileSync(path);
                    res.writeHead(200, {'Content-Type':'image/jpg'});
                    res.end(img, 'binary');
                    }
                })
                // after download, files are deleted
                fs.unlink(absPath+"/CycleGAN-tensorflow-master/datasets/vangogh2photo/testB/vangogh_"+filename, function(err){
                    if( err ) throw err;
                    console.log('origin vangogh : file deleted');
                });
                fs.unlink(absPath+"/test/BtoA_vangogh_"+filename, function(err){
                    if( err ) throw err;
                    console.log('test vangogh : file deleted');
                });

            })
        app.get('/download/cezanne', (req, res) => {
                upload(req, res, function (err) {
                    if (err) {
                        res.status(400).json({message: err.message})
                    } else {
                    var path =absPath+"/test/BtoA_cezanne_"+filename
                    var img=fs.readFileSync(path);
                    res.writeHead(200, {'Content-Type':'image/jpg'});
                    res.end(img, 'binary');
                    }
                })
                // after download, files are deleted
                fs.unlink(absPath+"/CycleGAN-tensorflow-master/datasets/cezanne2photo/testB/cezanne_"+filename, function(err){
                    if( err ) throw err;
                    console.log('origin cezanne : file deleted');
                });
                fs.unlink(absPath+"/test/BtoA_cezanne_"+filename, function(err){
                    if( err ) throw err;
                    console.log('test cezanne : file deleted');
                });

            })
        
        app.get('/download/plain', (req, res) => {
                upload(req, res, function (err) {
                    if (err) {
                        res.status(400).json({message: err.message})
                    } else {
                    var path =absPath+"/test/"+filename
                    var img=fs.readFileSync(path);
                    res.writeHead(200, {'Content-Type':'image/jpg'});
                    res.end(img, 'binary');
                    }
                })
                fs.unlink(absPath+"/test/"+filename, function(err){
                    if( err ) throw err;
                    console.log('plain : file deleted');
                });

            })
};
