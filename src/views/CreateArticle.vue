<template>
	<div>
		<el-form @submit.native.prevent="saveArticle" ref="form" :model="articles" label-width="80px">
			<el-form-item label="文章标题">
				<el-input v-model="articles.title"></el-input>
			</el-form-item>
			
			<el-form-item label="文章内容">
				<el-input type="textarea" v-model="articles.body"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :plain="true" native-type="submit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				articles : {
					id: '',
					editDate:'',
					username: 'ME',
					title: '',
					body: ""
				}
			}
		},
		methods: {
			saveArticle() {
				this.articles.editDate = this.getNowTime(); 
				this.articles.id = this.RndNum();
				this.$http.post('articles', this.articles).then(res =>{
					console.log(res.data);
					this.$message({ //弹出消息
						message: '文章创建成功',
						type: 'success'
					});
					this.$router.push('/articles/index'); // 跳转列表
				}).catch(err => {
					this.$message.error('连接失败' + err.data)
				})
			},
			getNowTime(){
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				var hour =  date.getHours();
				var minutes = date.getMinutes();
				if (month >= 1 && month <=9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = '0' + strDate;
				}
				if(hour >= 0 && hour <= 9){
					hour = '0' + hour;
				}
				if(minutes >= 0 && minutes <= 9){
					minutes = '0' + minutes;
				}
				var currentdate = year + '-' + month + '-' + strDate + ' ' + hour + ':' + minutes;
				return currentdate;
			},
			RndNum(){
				var num = "";
				for(var i=0; i<6; i++){
					num += Math.floor(Math.random()*10);
				}
				return num;
			}
		},
	}
</script>
