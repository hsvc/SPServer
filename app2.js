const ps = require('python-shell');



let options = {

    mode: 'text',

    // pythonPath: "C:\\Python34\\python.exe", //window path

    pythonPath: "/usr/bin/python3",    //ubuntu path

    pythonOptions: ['-u'],

    scriptPath: './CycleGAN-tensorflow-master',    // 실행할 py 파일 path. 현재 nodejs파일과 같은 경로에 있어 생략

    args: ['--dataset_dir=monet2photo','--phase=test', '--which_direction=BtoA']

};



ps.PythonShell.run('main.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
  });