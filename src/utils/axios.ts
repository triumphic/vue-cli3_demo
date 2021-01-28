import axios from 'axios'
import { store } from './index'
// axios默认配置
axios.defaults.headers.post['Content-Type'] = 'application/json,charset=utf-8'
axios.defaults.timeout = 1000 * 60 * 60 * 24
axios.defaults.baseURL = '/api/meos'

// 添加请求拦截器
axios.interceptors.request.use((config: any) => {
  const project_id = store.state.project_id
  const { pd, user_id, person_id } = store.state.userInfo
  // 公共参数
  const params = { user_id, pd, person_id }
  Object.assign(params, project_id ? { project_id } : {})
  // 运维系统需要额外的参数
  if (config.url && config.url.includes('EMS_SaaS_Web')) {
    Object.assign(params, {
      puser: {
        userId: user_id,
        loginDevice: 'PC',
        pd
      }
    })
  }
  // 合并参数
  if (config.headers.mergeParams !== false) {
    config.method === 'post'
      ? config.data = Object.assign(params, config.data)
      : config.params = Object.assign(params, config.params)
  }
  return config
}, (error: any) => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use((response: any) => {
  // 如果responseType='blob'  则是下载文件
  if (response.request.responseType === 'blob') {
    const { content } = response
    let fileName = ''
    let mimeType = ''
    if (response.config.data) {
      if (Object.prototype.toString.call(response.config.data) === '[Object Object]') {
        fileName = response.config.data.fileName || ''
        mimeType = response.config.data.mimeType
      } else {
        const configData = JSON.parse(response.config.data)
        fileName = configData.fileName || configData.filename || ''
        mimeType = JSON.parse(response.config.data).mimeType
      }
    }
    const blob = mimeType ? new Blob([content], { type: mimeType }) : new Blob([content]) // 构造一个blob对象来处理数据
    // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
    // IE10以上支持blob但是依然不支持download
    if ('download' in document.createElement('a')) {
      // 支持a标签download的浏览器
      const link = document.createElement('a') // 创建a标签
      link.download = fileName // a标签添加属性
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click() // 执行下载
      URL.revokeObjectURL(link.href) // 释放url
      document.body.removeChild(link) // 释放标签
    } else {
      // 其他浏览器
      navigator.msSaveBlob(blob, fileName)
    }
  }
  return response
}, (error: any) => {
  return Promise.reject(error)
})

export default axios
