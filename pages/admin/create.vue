<template>
    <el-form 
        ref="form" 
        :model="controls" 
        :rules="rules"
        @submit.native.prevent="onSubmit">
        <h1 class="mb">Create post</h1>
        <el-form-item label="Title" prop="title">
            <el-input v-model.trim="controls.title" />
        </el-form-item>
        <el-form-item label="Text format .md or .html" prop="text">
            <el-input 
                type="textarea" 
                v-model="controls.text"
                resize="none"
                :rows="10" />
        </el-form-item>

        <el-button
            class="mb"
            type="success"
            plain
            @click="previewDialog = true">
            Preview
        </el-button>
        <el-dialog
            title="Preview"
            :visible.sync="previewDialog">
            <div :key="controls.text">
                <vue-markdown>{{controls.text}}</vue-markdown>
            </div>
        </el-dialog>
        <el-upload
            class="mb"
            drag
            :auto-upload="false"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleImgChange"
            ref="upload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">jpg/png files</div>
        </el-upload>

        <el-form-item>
            <el-button 
                type="primary" 
                round
                :loading="loading"
                native-type="submit">
                Create
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    data() {
        return {
            rules: {
                title: [
                    { required: true, message: 'Please input title', trigger: 'blur' }
                ],
                text: [
                    { required: true, message: 'Please input text', trigger: 'blur' }
                ],
            },
            controls: {
                title: '',
                text: '',
            },
            loading: false,
            previewDialog: false,
            image: null
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if ( valid && this.image ) {
                    this.loading = true;
                    const formData = {
                        title: this.controls.title,
                        text: this.controls.text,
                        image: this.image
                    }
                    try {
                        await this.$store.dispatch('post/create', formData);
                        this.controls.text = '';
                        this.controls.title = '';
                        this.image = null;
                        this.$refs.upload.clearFiles();
                        this.$message.success('Post successfully created');
                    } catch(err) {
                        
                    } finally {
                        this.loading = false;
                    }
                } else {
                    this.$message.warning('Form not valid');
                }
            })
        },
        handleImgChange(file, fileList) {
            this.image = file.raw;
        }
    }
}
</script>

<style lang="scss" scoped>
    form {
        width: 600px;
    }
</style>