export default {
  // 更改用户信息
  userInfo (state: any, params: Record<string, any>) {
    state.userInfo = params
  },
  // 更改项目
  project_id (state: any, params: any) {
    state.project_id = params
  },
  // 更改权限数组
  authId (state: any, params: Record<string, any>) {
    state.authId = params
  },
  // 更改面包屑数据
  changeBreadcrumb (state: any, params: any) {
    if (Array.isArray(params)) {
      state.breadcrumbArr = params || []
    } else {
      const sessionBreadcrumbArr = sessionStorage.getItem('breadcrumbArr')
      if (sessionBreadcrumbArr && sessionBreadcrumbArr != '[]') {
        state.breadcrumbArr = JSON.parse(sessionBreadcrumbArr)
        sessionStorage.removeItem('breadcrumbArr')
      }
      const findIndex = state.breadcrumbArr.findIndex((n: any) => n.path == params.path)
      if (findIndex === -1) return state.breadcrumbArr.push(params)
      state.breadcrumbArr.splice(findIndex + 1)
    }
  }
}
