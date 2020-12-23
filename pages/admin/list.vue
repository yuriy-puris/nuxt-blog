<template>
	<el-table
		:data="posts"
		style="width: 100%">
		<el-table-column 
			prop="title"
			label="Name"
		/>
		<el-table-column
			label="Date"
			width="180">
			<template slot-scope="{ row: {date} }">
				<i class="el-icon-time"></i>
				<span style="margin-left: 10px">{{ new Date(date).toLocaleString() }}</span>
			</template>
		</el-table-column>
		<el-table-column label="Views">
			<template slot-scope="{ row: {views} }">
				<i class="el-icon-view"></i>
				<span style="margin-left: 10px">{{ views }}</span>
			</template>
		</el-table-column>
		<el-table-column
			label="Comments"
			width="180">
			<template slot-scope="{ row: {comments} }">
				<i class="el-icon-message"></i>
				<span style="margin-left: 10px">{{ comments.length }}</span>
			</template>
		</el-table-column>
		<el-table-column
			label="Actions">
			<template slot-scope="{row}">
				<el-tooltip effect="dark" content="Edit" placement="top">
					<el-button
						icon="el-icon-edit"
						circle
						type="primary"
						@click="handleEdit(row._id)" />
				</el-tooltip>
				<el-tooltip effect="dark" content="Delete" placement="top">
					<el-button
						icon="el-icon-delete"
						circle
						type="danger"
						@click="handleDelete(row._id)" />
				</el-tooltip>
			</template>
			</el-table-column>
	</el-table>
</template>

<script>
export default {
    layout: 'admin',
	middleware: ['admin-auth'],
	async asyncData({ store }) {
		const posts = await store.dispatch('post/fetchAdmin');
		return { posts };
	},
	data() {
		return {
			// posts: []
		}
	},
	methods: {
		handleEdit(id) {
			this.$router.push(`/admin/post/${id}`);
		},
		async handleDelete(id) {
			try {
				await this.$confirm('Delete post ?', '', {
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancel',
					type: 'warning'
				})
				await this.$store.dispatch('post/remove', id);
				this.posts = this.posts.filter(post => post._id !== id);
				this.$message.success('Post deleted');
			} catch (e) {
				console.error(e);
			}
		}
	}
}
</script>

<style lang="scss" scoped>

</style>