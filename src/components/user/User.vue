<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/users' }">用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--搜索和添加-->
        <el-card class="box-card">
            <el-row :gutter="100">
                <el-col :span="10">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!--表格-->
            <el-table
                    :data="userList"
                    style="width: 100%"
                    border>
                <el-table-column
                        type="index">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="role_name"
                        label="权限">
                </el-table-column>
                <el-table-column
                        prop="mg_state"
                        label="状态">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.mg_state"
                                @change="userStateChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作">
                    <template slot-scope="">
                        <el-tooltip effect="dark" content="编辑" placement="top" :hide-after="hideTime">
                            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="删除角色" placement="top" :hide-after="hideTime">
                            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="分配角色" placement="top" :hide-after="hideTime">
                            <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
        <!--提示框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>是否添加用户</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 2
                },
                userList: [],
                total: 0,
                hideTime: 2000,
                dialogVisible: false
            }
        },
        methods: {
            //获取用户列表
            getUserList() {
                this.$http.get('/users', {params: this.queryInfo}).then(res => {
                    if (res.data.meta.status == 200) {
                        this.userList = res.data.data.users
                        this.total = res.data.data.total
                    } else
                        this.$message.error('获取数据失败')
                })
            },
            //监听页码改变
            handleSizeChange(val) {
                this.queryInfo.pagesize = val
                this.getUserList()
            },
            //监听页面显示数量
            handleCurrentChange(val) {
                this.queryInfo.pagenum = val
                this.getUserList()
            },
            //用户状态改变
            userStateChange(e) {
                this.$http.put(`users/${e.id}/state/${e.mg_state}`).then(res => {
                    if (res.data.meta.status == 200) {
                        this.$message.success('更新状态成功')
                    } else {
                        e.mg_state = !e.mg_state
                        this.$message.error('更新状态失败')
                    }

                })
            }
        },
        created() {
            this.getUserList()
        }

    }
</script>

<style scoped>

</style>