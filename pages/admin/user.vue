<template>
	<el-form 
		ref="form" 
		:model="controls" 
		:rules="rules"
		@submit.native.prevent="onSubmit">
		<h2>Create user</h2>
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
						await this.$store.dispatch('auth/createUser', formData);
						this.$message.success('User created');
						this.controls.login = '';
						this.controls.password = '';
						this.loading = false;
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
	form {
		width: 600px;
	}
</style>