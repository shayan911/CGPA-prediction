const { json } = require('express');
var express = require('express');
const { send } = require('process');
var router = express.Router();
const { spawn } = require('child_process');
const { join } = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', dataToSend: "" });
});
router.get('/2', function (req, res, next) {
  res.render('model2', { title: 'Express', dataToSend: "" });
});
router.get('/3', function (req, res, next) {
  res.render('model3', { title: 'Express', dataToSend: "" });
});

router.post('/', function (req, res, next) {

  const gradesList = Object.values(req.body)
  console.log(gradesList)
  const gradeConversion = { "a": 4,"a+":4,"a-":3.7,"b": 3,"b+":3.4,"b-":2.7,"c": 2,"c+":2.4,"c-":1.7,"d": 9,"d+":1.4,"d-":1,"f":0 }
  Object.keys(gradeConversion).map(grade => {
    gradesList.map(formGrade => {
      if (grade == formGrade) {
        const index = gradesList.indexOf(formGrade)
        gradesList[index] = gradeConversion[grade]
      }
    })
  })
  const jsonGradeList = JSON.stringify(gradesList)
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['model.py', jsonGradeList]);


  // python.stderr.on('data', (data) => {
  //   console.log(data.toString());
  // });
  // collect data from script

  
  python.stdout.on('data', (data) => {

  
   dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);

  // send data to browser
  res.render('index', { title: 'Express', dataToSend: dataToSend });
  });
});



router.post('/2', function (req, res, next) {

  const gradesList = Object.values(req.body)
  console.log(gradesList)
  const gradeConversion = { "a": 4,"a+":4,"a-":3.7,"b": 3,"b+":3.4,"b-":2.7,"c": 2,"c+":2.4,"c-":1.7,"d": 9,"d+":1.4,"d-":1,"f":0 }
  Object.keys(gradeConversion).map(grade => {
    gradesList.map(formGrade => {
      if (grade == formGrade) {
        const index = gradesList.indexOf(formGrade)
        gradesList[index] = gradeConversion[grade]
      }
    })
  })
  const jsonGradeList = JSON.stringify(gradesList)
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['model2.py', jsonGradeList]);
  // collect data from script
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.render('model2', { title: 'Express', dataToSend: dataToSend });
  });
});


router.post('/3', function (req, res, next) {

  const gradesList = Object.values(req.body)
  console.log(gradesList)
  const gradeConversion = { "a": 4,"a+":4,"a-":3.7,"b": 3,"b+":3.4,"b-":2.7,"c": 2,"c+":2.4,"c-":1.7,"d": 9,"d+":1.4,"d-":1,"f":0 }
  Object.keys(gradeConversion).map(grade => {
    gradesList.map(formGrade => {
      if (grade == formGrade) {
        const index = gradesList.indexOf(formGrade)
        gradesList[index] = gradeConversion[grade]
      }
    })
  })
  const jsonGradeList = JSON.stringify(gradesList)
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['model3.py', jsonGradeList]);
  // collect data from script
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.render('model3', { title: 'Express', dataToSend: dataToSend });
  });
});

module.exports = router;
