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
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
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
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="电话"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        >
                </el-table-column>
                <el-table-column
                        prop="role_name"
                        label="权限"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="mg_state"
                        label="状态"
                        width="100">
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
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" content="编辑" placement="top" :hide-after="hideTime">
                            <el-button type="primary" @click="showEditDialogVisible(scope.row.id)" size="mini" icon="el-icon-edit"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="删除角色" placement="top" :hide-after="hideTime">
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteUser(scope.row.id)"></el-button>
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
        <!--添加用户提示框-->
        <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="30%"
                @close="addDialogClosed"
        >
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addFormRef">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!--修改用户信息提示框-->
        <el-dialog
                title="修改用户信息"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDialogClose"
        >
            <el-form :model="editForm" :rules="addFormRules" ref="editFormRef">
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            let checkEmail = (rule, value, cb) => {
                const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
                if (regEmail.test(value))
                    return cb()
                else
                    cb(new Error('请输入正确的邮箱！'))
            }
            let checkMobile = (rule, value, cb) => {
                const regMobile = /^1\d{10}$/
                if (regMobile.test(value))
                    return cb()
                else
                    cb(new Error('请输入正确的手机号码！'))
            }
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 2
                },
                userList: [],
                total: 0,
                hideTime: 2000,
                addDialogVisible: false,
                editDialogVisible:false,
                addForm: {
                    username: '',
                    password: '',
                    mobile: '',
                    email: ''
                },
                editForm:{

                },
                /*表单验证规则*/
                addFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 6, message: '用户名长度为 3 到 6 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 5, max: 12, message: '密码长度为 5 到 12 个字符', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    mobile: [{required: true, message: '请输入手机号码', trigger: 'blur'},
                        {validator: checkMobile, trigger: ['blur','change']}]
                }
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
            },
            //监听添加用户对话框关闭
            addDialogClosed () {
                this.$refs.addFormRef.resetFields()
            },
            //监听修改用户对话框关闭
            editDialogClose(){
                this.$refs.editFormRef.resetFields()
            },
            /*展示修改对话框*/
            showEditDialogVisible(id){
                this.editDialogVisible = true
                this.$http.get('users/'+id).then( res =>{
                    if(res.data.meta.status == 200){
                       this.editForm = res.data.data
                    }
                    else
                        return this.$message.error(res.data.meta.msg)
                })
            },
            //添加用户
            addUser(){
                this.$refs.addFormRef.validate(valid => {
                    if (valid) {
                        this.$http.post('users', this.addForm).then(res => {
                            if (res.data.meta.status == 201) {
                                this.$message({
                                    message: res.data.meta.msg,
                                    type: 'success'
                                });
                                this.addDialogVisible = false
                                this.getUserList()
                            } else if (res.data.meta.status == 400) {
                                this.$message.error(res.data.meta.msg);
                            } else {
                                this.$message.error('添加失败');
                            }
                        })

                    } else {
                        this.$message.error('添加失败');
                    }
                })
            },
            //编辑用户
            editUser(){
                this.$refs.editFormRef.validate(valid => {
                    if (valid) {
                        this.$http.put(
                            'users/'+this.editForm.id,{
                            email:this.editForm.email,
                            mobile:this.editForm.mobile
                        }).then(res => {
                            if (res.data.meta.status == 200) {
                                this.$message({
                                    message: res.data.meta.msg,
                                    type: 'success'
                                });
                                this.editDialogVisible = false
                                this.getUserList()
                            } else if (res.data.meta.status == 500) {
                                this.$message.error(res.data.meta.msg);
                            } else {
                                this.$message.error('添加失败');
                            }
                        })

                    } else {
                        this.$message.error('添加失败');
                    }
                })
            },
            deleteUser(id) {
                this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete('users/'+id).then(res=>{
                        if (res.data.meta.status == 200) {
                            this.$message({
                                message: res.data.meta.msg,
                                type: 'success'
                            });
                            this.getUserList()
                        } else if (res.data.meta.status == 500) {
                            this.$message.error(res.data.meta.msg);
                        } else {
                            this.$message.error('添加失败');
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });

            }
        },
        created() {
            this.getUserList()
        }

    }
</script>

<style scoped>

</style>