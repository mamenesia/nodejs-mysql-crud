const mysql = require('mysql');
var express = require('express');
var router = express.Router();

const db = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'db_nodejs_crud',
  debug : false
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testconnect', (req, res, next)=>{
  if(db != null) {
    res.send('Connection success');
  } else {
    res.send('Connection failed');
  }
});

router.get('/select', (req, res, next)=> {
  db.query('SELECT * FROM tb_book', (err, rs)=>{
    res.render('select', { books:rs });
  });
});

router.get('/form', (req, res, next) => {
  res.render('form', { book: {} });
});

router.post('/form', (req, res, next) => {
  db.query('INSERT INTO tb_book SET ?', req.body, (err, rs) => {
    res.redirect('/select');
  });
});

router.get('/delete', (req, res, next) => {
  db.query('DELETE FROM tb_book WHERE id= ?', req.query.id, (err, rs) => {
    res.redirect('/select');
  });
});

router.get('/edit', (req, res, next) => {
  db.query('SELECT * FROM tb_book WHERE id= ?', req.query.id, (err, rs) =>{
    res.render('form', { book : rs[0] });
  });
});

router.post('/edit', (req, res, next) => {
  let param = [
    req.body,
    req.query.id
  ];

  db.query('UPDATE tb_book SET ? WHERE id= ?', param, (err, rs) => {
    res.redirect('/select');
  });
});


module.exports = router;
