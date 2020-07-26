<template>
    <div id="app">
        <el-container class="home-container">
            <el-header>
                <div>
                    <img src="../assets/logo.png" alt="">
                    <span>电商管理系统</span>
                </div>
                <el-button type="info" @click="loginOut" :plain="true">退出</el-button>
            </el-header>
            <el-container>
                <el-aside :width="collapse ? '64px' : '200px'">
                    <!--一级菜单-->
                    <el-menu
                            background-color="#333744"
                            text-color="#fff"
                            active-text-color="#409eff"
                            :collapse="collapse"
                            :collapse-transition="false"
                            :router="true">
                        <el-button type="primary" @click="changeCollapse">{{msg}}</el-button>
                        <el-submenu v-for="item in menuList" v-bind:key="item.id" :index="item.id+''">
                            <template slot="title">
                                <!--图标-->
                                <i class="el-icon-location"></i>
                                <!--文本-->
                                <span>{{item.authName}}</span>
                            </template>
                            <!--二级菜单-->
                            <el-menu-item v-for="subItem in item.children"
                                          v-bind:key="subItem.id"
                                          :index="'/' + subItem.path">
                                <template slot="title">
                                    <!--图标-->
                                    <i class="el-icon-menu"></i>
                                    <!--文本-->
                                    <span>{{subItem.authName}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>


    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                menuList: [],
                msg: '折叠',
                collapse: false
            }
        },
        created() {
            this.getMenuList()
        },
        methods: {
            loginOut() {
                sessionStorage.clear()
                this.$router.replace('/login')
                this.$message({
                    message: '退出成功！',
                    type: 'success'
                });
            },
            getMenuList() {
                this.$http.get('menus').then(res => {
                    console.log(res)
                    if (res.data.meta.status == 200) {
                        this.menuList = res.data.data
                    }
                })
            },
            changeCollapse() {
                this.collapse = !this.collapse
                if (!this.collapse)
                    this.msg = '折叠'
                else
                    this.msg = '展开'
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;

        div {
            display: flex;
            align-items: center;

            img {
                width: 60px;
                height: 60px;
            }

            span {
                margin-left: 15px;
            }
        }
    }

    .el-aside {
        background-color: #333744;

        .el-menu {
            border: none;

            .el-button {
                width: 100%;
            }
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

</style>