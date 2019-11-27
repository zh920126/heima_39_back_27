<template>
  <div class="login">
   <div class="container">
    <div class="avatar">
       <img src="@/assets/avatar.jpg" alt="">
    </div>
      <el-form :model="userinfo" :rules="rules" ref="userinfo" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="userinfo.username" prefix-icon="icon-user-check"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="userinfo.password" type='password' prefix-icon="icon-key"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" class="login-btn" @click="submitLogin">登录</el-button>
  </el-form-item>
</el-form>
   </div>
  </div>
</template>

<script>
// 引入用户登录的api
import { Login } from '@/apis/users.js'
export default {
  data () {
    return {
      userinfo: {
        username: '10086',
        password: '123'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '用户名长度不小于3个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '密码长度为3-16位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitLogin () {
      // 调用element-ui的验证方法对输入的用户名和密码进行验证
      // element-ui的表单验证有validate函数 里面有个回调函数valid，会对用户设置的rules进行验证,验证成功才发送axios请求，不成功就直接返回  不发送请求
      this.$refs.userinfo.validate(async valid => {
        // async始终到在await所在的那一层的函数上
        if (valid) {
          // 验证成功才能使用api进行登录
          let res = await Login(this.userinfo)
          console.log(res)
          if (res.data.message === '登录成功') {
            // 登录成功后提示用户已登录成功
            this.$message.success(res.data.message)
            // 同时将token存储到本地内存‘
            localStorage.setItem('heima_39_back_27_2', res.data.data.token)
            // 然后进行路由的跳转，跳转到首页面
            this.$router.push({ path: '/index' })
          } else {
            // 提示用户登录失败
            this.$message.warning(res.data.message)
          }
        } else {
          // 给用户提示错误信息
          this.$message.warning('用户名或密码不正确，请重新登录')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
