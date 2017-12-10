const express = require('express');
//express() 是一个由 express 模块导出的入口（top-level）函数。
const app = express();

app.set('port', process.env.PORT || 3000);
//主页
  app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Meadowlark Travel');
    console.log(typeof app.locals);//object

  });
//about
  app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About Meadowlark Travel');
  });

//404 500的定制要放在后面
//通配符*可能会导致某些路径永远无法匹配
//定制404页面
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404-Not Found');
});

//定制500页面
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
})


app.listen(app.get('port'),() => {
  console.log('Express started on http://localhost:' + app.get('port') +
    '; press Ctrl+c to terminate...');
});
