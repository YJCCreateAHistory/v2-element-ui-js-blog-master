module.exports = {
    devServer: {
        proxy:{
            '/api':{
                target:'http://101.42.252.67:5220',
                changOrigin:true,
                ws:true,
                pathRewrite:{
                    '^api':''
                }
            }
        }
    },
    lintOnSave: false
}
