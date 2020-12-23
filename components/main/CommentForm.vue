<template>
    <el-form 
        ref="form" 
        :model="controls" 
        :rules="rules"
        @submit.native.prevent="onSubmit">
        <h1>Add comment</h1>
        <el-form-item label="Name" prop="name">
            <el-input v-model.trim="controls.name" />
        </el-form-item>
        <el-form-item label="Text comment" prop="text">
            <el-input 
                type="textarea"
                resize="none"
                :rows="2"
                v-model.trim="controls.text" />
        </el-form-item>
        <el-form-item>
            <el-button 
                type="primary" 
                round
                :loading="loading"
                native-type="submit">
                Add comment
            </el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            rules: {
                name: [
                    { required: true, message: 'Please input name', trigger: 'blur' }
                ],
                text: [
                    { required: true, message: 'Please input text', trigger: 'blur' }
                ],
            },
            controls: {
                name: '',
                text: ''
            },
            loading: false
        }
    },
    methods: {
        onSubmit() {
            this.$refs['form'].validate(valid => {
                if ( valid ) {
                    this.loading = true;
                    const formData = {
                        name: this.controls.name,
                        text: this.controls.text,
                        postId: ''
                    };
                    try {
                        this.$emit('created');
                        this.$message.success('Comment addedd');
                    } catch (err) {
                        this.loading = false;
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>