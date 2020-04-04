const express = require('express')
const app = express()

//允许跨域, 前端和后端的端口不同
app.use(require('cors')())
app.use(express.json()) //识别客户端的json

const dbconfig = require('./dbconfig.js')

app.get('/', async( req, res ) => {
	res.send('index')
})

//查看文章
app.get('/api/articles', async (req, res) => {
	var sql = 'select * from article'
	dbconfig.sqlConnect(sql, [], (err, result) => {
		if(err) {
			console.log(`获取数据失败: ${err.message}`)
		}
		const article = JSON.parse(JSON.stringify(result))
		res.send(article)	
	})
})

//增加文章
app.post('/api/articles', async (req, res) => {
	var sql ="insert into article (id, editDate, username, title, content) values (?,?,?,?,?)"
	var params = req.body;
	dbconfig.sqlConnect(sql, [params.id, params.editDate, params.username, params.title, params.body], (err,result) =>{
		if(err){
			console.log(`添加数据失败: ${err.message}`)
		}
		const article = result;
		res.send(article);
	}) 
})

// 查找文章详情
app.get('/api/articles/:id', async(req, res) =>{
	var sql = 'select * from article where id=?'
	dbconfig.sqlConnect(sql, req.params.id, (err, result) => {
		if (err){
			console.log(`获取失败 ${err.message}`);
		}
		const article = JSON.parse(JSON.stringify(result).replace(/^\[|\]$/g,''))
		res.send(article);
	})
})

//删除文章
app.delete('/api/articles/:id', async(req, res) => {
	var sql = 'delete from article where id=?'
	dbconfig.sqlConnect(sql, req.params.id, (err, result) => {
		if (err){
			console.log(`删除失败 $err.message`);
		}
		res.send({
			status: true
		})
	})
})

// 修改文章 put/patch /post
app.put('/api/articles/:id', async (req, res) =>{
	var sql = 'update article set editDate=?, title=?, content=? where id='+ req.params.id
	var params = req.body
	dbconfig.sqlConnect(sql, [params.editDate, params.title , params.content], (err, result) => {
		if (err){
			console.log(`更新失败 ${err.message}`);
		}
		const article = result;
		res.send(article);
	})
})

app.listen(3001, () => {
	console.log('http://localhost:3001/')
})