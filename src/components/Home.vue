<template>
    <div>
        Home组件
        <div>
            <el-button type="info" @click="loginOut" :plain="true">退出</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            loginOut() {
                sessionStorage.clear()
                this.$router.replace('/login')
                this.$message({
                    message: '退出成功！',
                    type: 'success'
                });
            },
        }
    }
</script>

<style scoped>

</style>