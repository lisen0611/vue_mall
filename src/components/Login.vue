<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像-->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="VUE">
            </div>
            <!--登录表单 model表单数据对象 rules表单验证规则 plain消息提示 prop验证规则绑定-->
            <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="loginRules">
                <!--用户名-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <!--登录，重置-->
                <el-form-item class="bts">
                    <el-button type="primary" @click="login" :plain="true">登录</el-button>
                    <el-button type="info" @click="resetForm" :plain="true">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                /*登录表单数据*/
                loginForm: {
                    username: '',
                    password: ''
                },
                /*表单验证规则*/
                loginRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 6, message: '用户名长度为 3 到 6 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 5, max: 12, message: '密码长度为 5 到 12 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            /*登录*/
            login() {
                this.$refs.loginFormRef.validate(valid => {
                    if (valid) {
                        this.$http.post('login', this.loginForm).then(res => {
                            if (res.data.meta.status == 200) {
                                this.$message({
                                    message: res.data.meta.msg,
                                    type: 'success'
                                });
                                sessionStorage.setItem('token', res.data.data.token)
                                this.$router.replace('/home')
                            } else if (res.data.meta.status == 400) {
                                this.$message.error(res.data.meta.msg);
                            } else {
                                this.$message.error('登录失败');
                            }
                        })

                    } else {
                        this.$message.error('登录失败');
                    }
                })

            },
            /*重置数据*/
            resetForm() {
                this.$refs.loginFormRef.resetFields();
            }

        }

    }

</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .avatar_box {
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .bts {
        display: flex;
        justify-content: flex-end;
    }
</style>