<template>
    <div class="page-wrap">
        <el-breadcrumb separator="/" class="mb">
            <el-breadcrumb-item :to="{ path: '/admin/list' }">Posts</el-breadcrumb-item>
            <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form 
            ref="form" 
            :model="controls" 
            :rules="rules"
            @submit.native.prevent="onSubmit">
            <el-form-item label="Text format .md or .html" prop="text">
                <el-input 
                    type="textarea" 
                    v-model.trim="controls.text"
                    resize="none"
                    :rows="10" />
            </el-form-item>
            <div class="mb">
                <small class="mr">
                    <i class="el-icon-time"></i>
                    <span>
                        {{ new Date(post.date).toLocaleString() }}
                    </span>
                </small>
                <small>
                    <i class="el-icon-view"></i>
                    <span>
                        {{ post.views }}
                    </span>
                </small>
            </div>
            <el-form-item>
                <el-button 
                    type="primary" 
                    round
                    :loading="loading"
                    native-type="submit">
                    Update
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    head() {
        return {
            title: `Post | ${this.post.title}` 
        }
    },
    validate({ params }) {
        return !!params.id;
    },
    async asyncData({ store, params }) {
        const post = await store.dispatch('post/fetchAdminById', params.id);
        return { post }
    },
    data() {
        return {
            rules: {
                text: [
                    { required: true, message: 'Please input text', trigger: 'blur' }
                ],
            },
            controls: {
                text: '',
            },
            loading: false
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if ( valid ) {
                    this.loading = true;
                    const formData = {
                        text: this.controls.text,
                        id: this.post._id
                    }
                    try {
                        await this.$store.dispatch('post/update', formDate);
                        this.$message.success('Post updated');
                        this.loading = false;
                    } catch(err) {
                        this.loading = false;
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .page-wrap {
        width: 600px;
    }
    .mr {
        margin-right: 1rem;
    }
</style>