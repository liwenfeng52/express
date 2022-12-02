const express = require("express")
const db = require("./config/db")
// 要下载body-parser
const bodyParser = require("body-parser")
//导入封装数据
const app = express()
// 解释读取模块
const fs = require("fs")
const path = require("path")//因为文件没有导出需要path模板
//其他路由
// 设置许跨域
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})
//连接数据库
const daconfig = require("./config/db")
//让组页面有文字
app.get('/', function (req, res) {
  res.send("<h1>成功log</h1>")
})
//post路径问题
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// post
app.post("/post", function (req, res) {
  res.send("成功")
})
//读取文件
app.get("/getext", function (req, res) {
  //拼接文件路径 __dirname代表意识是在根路径上
  let url = path.join(__dirname, "public", "text", "text1.json")
  // let content = fs.readFileSync(url, "utf-8");
  //解析连接
  // let oldData = JSON.parse(content);
  // let Name = req.query.Name;
  // let price = req.query.price;
  // let id = Math.random().toString().slice(2, 5) + (new Date().getTime())
  // let obj = { name: Name, price, id }
  // oldData.result.push(obj)
  // let dataStr = JSON.stringify(oldData)
  fs.readFile(url, "utf-8", function (err, data) {
    if (err) {
      res.send({ code: 400, err })
    } else {
      res.send(JSON.parse(data))
    }
  })
})


// 接口信息
app.listen(3001, () => {
  console.log("http:127.0.0.1:3001");
  // console.log("http:localhost:3000");
})