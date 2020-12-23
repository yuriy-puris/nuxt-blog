<template>
  <el-card
    shadow="always"
    :style="{width: '500px'}">
        <el-form 
            ref="form" 
            :model="controls" 
            :rules="rules"
            @submit.native.prevent="onSubmit">
            <h2>Log In</h2>
            <el-form-item label="Login" prop="login">
                <el-input v-model.trim="controls.login" />
            </el-form-item>
            <div class="mb2">
                <el-form-item label="Password" prop="password">
                    <el-input v-model.trim="controls.password" type="password" />
                </el-form-item>
            </div>
            <el-form-item>
                <el-button 
                    type="primary" 
                    round
                    :loading="loading"
                    native-type="submit">
                    Log In
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    layout: 'empty',
    data() {
        return {
            rules: {
                login: [
                    { required: true, message: 'Please input name', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please input text', trigger: 'blur' },
                    { min: 6, message: 'Password must be at least 6 symbols', trigger: 'blur' }
                ],
            },
            controls: {
                login: '',
                password: ''
            },
            loading: false
        }
    },
    mounted() {
        const { message } = this.$route.query;

        switch (message) {
            case 'login':
                this.$message.info('Login to the system');
                break;
            case 'logout':
                this.$message.success('Logout successfull');
                break;
        }

    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if ( valid ) {
                    this.loading = true;

                    try {
                        const formData = {
                            login: this.controls.login,
                            password: this.controls.password
                        };
                        await this.$store.dispatch('auth/login', formData);
                        this.$router.push('/admin');
                    } catch (err) {
                        this.loading = false;
                    }
                }
            })
        }
    }
}
</script>

<style>

</style>