/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */
import axios from 'axios'
import { Toast } from 'vant'
// import { setLocal } from '@/common/js/utils'
// import router from '../router'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//172.26.253.38:8889/api/' : '//172.26.253.38:8889/api/'
// axios.defaults.baseURL = '172.26.253.38:8889/api/'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  // if (res.data.code == '500') {
  //   Toast.fail('服务端异常！')
  //   return Promise.reject(res)
  // }
  if (res.data.code != '0') {
    // if (res.data.message) Toast.fail(res.data.message)
    // if (res.data.code == 416) {
    //   router.push({ path: '/login' })
    // }
    // if (res.data && window.location.hash == '#/login') {
    //   setLocal('token', res.data)
    //   axios.defaults.headers['token'] = res.data
    // }
    // return Promise.reject(res.data)
    Toast.fail(res.data.msg)
  }

  return res.data
})

export default axios
