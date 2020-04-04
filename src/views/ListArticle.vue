<template>
	<div>
		<el-table :data="articles">
			<el-table-column prop="title" label="文章标题" width="140">
			</el-table-column>
			<el-table-column prop="content" label="文章内容" width="220">
			</el-table-column>
			<el-table-column prop="editDate" label="日期">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
			<template slot-scope="scope">
				<el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
				<el-button @click="remote(scope.row.id)" type="text" size="small">删除</el-button>
			</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'ListArticle',
		data() {
			return {
				articles: []
			};
		},
		methods: {
			edit(id){
				this.$router.push(`/articles/${id}/edit`); 
			},
			remote(id){
				this.$http.delete(`articles/${id}`).then(res => {
					console.log(res);
					this.$message({ //弹出消息
						message: '文章删除成功',
						type: 'success'
					});
				})
				this.get();
			},
			get(){ //刷新页面
				this.$http.get('articles').then(res => {
					this.articles = res.data;
				})
			}
		},
		created() {
			this.get();
		}
	};
</script>
