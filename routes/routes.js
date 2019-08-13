/*
node js 라우팅 설정
라우팅 : HTTP 요청 메소드(get, post) 등 요청에 응답 방법 결정

get: 페이지 url으로 응답
post: post요청에 대한 응답
put
delete

*/

var fs = require('fs');

module.exports = function(app) {
	app.get('/',function(req,res){
			res.end("Node-File-Upload");
	});

	app.post('/upload', function(req, res) {
			console.log("무엇이 문 제 !");
			console.log(req.files.image.originalFilename);
			console.log(req.files.image.path);
			fs.readFile(req.files.image.path, function (err, data){
					//var dirname="/root/SPServer/routes/file-upload"; // on linux
					var dirname="C:\\and\\SPServer\\routes\\file-upload"; // on window
					//var newPath = dirname + "/uploads/" +   req.files.image.originalFilename; // on linux
					var newPath = dirname + "\\uploads\\" +   req.files.image.originalFilename; // on window

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
		//var dirname="/root/SPServer/routes/file-upload"; // on linux
		var dirname="C:\\and\\SPServer\\routes\\file-upload"; // on window
		//var img = fs.readFileSync(dirname + "/uploads/" + file); // on linux
		var img = fs.readFileSync(dirname + "\\uploads\\" + file); // on window
		res.writeHead(200, {'Content-Type': 'image/jpg' });
		res.end(img, 'binary');
	});
};
	