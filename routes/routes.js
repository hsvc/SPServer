/*
node js 라우팅 설정
라우팅 : HTTP 요청 메소드(get, post) 등 요청에 응답 방법 결정

get: 페이지 url으로 응답
post: post요청에 대한 응답
put
delete

*/

var fs = require('fs');
var PythonShell = require('python-shell');
options = {
        mode: 'text',
        // pythonPath: 'path/to/python' - 개발 서버에 맞게 설정
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './CycleGAN-tensorflow',
        args: ['--dataset_dir=monet2photo', '--phase=test', '--which_direction=BtoA']
      };
       

module.exports = function(app) {
        app.get('/',function(req,res){
                        res.end("Node-File-Upload");
        });

        app.post('/upload', function(req, res) {
                        console.log(req.files.upload.originalFilename);

                        fs.readFile(req.files.upload.path, function (err, data){
                                        var dirname="/root/SPServer/routes/file-upload"; // on linux
                                        var newPath = dirname + "/uploads/" +   req.files.upload.originalFilename; // on linux

                                        fs.writeFile(newPath, data, function (err) {
                                                if(err){
                                                res.json({'response':"Error"});
                                                }else {
                                                res.json({'response':"Saved"});
                                                }
                                        });
                        });
                        


                        PythonShell.run('main.py', options, function (err) {
                                if (err) throw err;
                                // results is an array consisting of messages collected during execution
                                else  console.log('test success');
                              });
        
                });


        app.get('/uploads/:file', function (req, res){
                file = req.params.file;
                var dirname="/root/SPServer/routes/file-upload"; // on linux
                var img = fs.readFileSync(dirname + "/uploads/" + file); // on linux

                res.writeHead(200, {'Content-Type': 'image/jpg' });
                res.end(img, 'binary');
        });
};
