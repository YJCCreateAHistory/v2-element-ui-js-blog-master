import {PostRequest, GetRequest } from "../api/http"

// 博文列表
export const getArticleList = (params)=>{
    PostRequest('/blog/list', params)
}
// 博文详情
export const getArticleDetail = (id)=>{
    PostRequest('/blog/list', id)
}
// 站点
export const getSiteInfo = (params)=>{
    PostRequest('/site/info', params)
}
// 社交
export const getSocials = ()=>{
    GetRequest('/socials/info')
}
// 关于
export const getAbout = ()=>{
    GetRequest('/about/info')
}
// 博文分类
export const getClasses = ()=>{
    PostRequest('/blog/classes')
}