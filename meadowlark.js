const express = require('express');
//express() 是一个由 express 模块导出的入口（top-level）函数。
const app = express();

let handlebars = require('express-handlebars')
  .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//主页
  // app.get('/', (req, res) => {
  //   res.type('text/plain');
  //   res.send('Meadowlark Travel');
  //   console.log(typeof app.locals);//object
  //
  // });

  // 不用再指定内容类型和状态码了
  // 视图引擎会默认返回text/html的内容类型和200的状态码
  app.get('/', (req, res) => {
    res.render('home');

  });
//about
  app.get('/about', (req, res) => {
    // res.type('text/plain');
    // res.send('About Meadowlark Travel');
    res.render('about');
  });

//404 500的定制要放在后面
//通配符*可能会导致某些路径永远无法匹配
//定制404页面
// app.use((req, res) => {
//   res.type('text/plain');
//   res.status(404);
//   res.send('404-Not Found');
// });

//404catch-all处理器 中间件
app.use((req, res, next) => {
  res.status(404);
  res.render('404');
});

//定制500页面
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.type('text/plain');
//   res.status(500);
//   res.send('500 - Server Error');
// })
app.use((req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'),() => {
  console.log('Express started on http://localhost:' + app.get('port') +
    '; press Ctrl+c to terminate...');
});
