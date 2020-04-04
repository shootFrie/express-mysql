const mysql = require('mysql')

module.exports = {
	//数据库
	config: {
		host: 'localhost',
		user: 'root',
		password: '000000',
		database: 'article',
		port: 3306
	},
	
	//连接数据库,连接池
	sqlConnect : function(sql, sqlArr, callback){
		var pool = mysql.createPool(this.config)
		pool.getConnection( (err,conn) => {
			if(err){
				console.log(`连接失败: ${err.message}`);
				return ;
			}
			console.log('连接成功');
			
			//事件驱动回调
			conn.query(sql, sqlArr, callback);
			
			//释放连接
			conn.release();
		})
	}
}
