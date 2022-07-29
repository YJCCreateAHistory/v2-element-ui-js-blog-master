const Mock = require('mockjs');
export default [
    // 站点信息
    {
        url: '/site',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: {
                    avatar: 'https://s3.bmp.ovh/imgs/2022/07/29/05e94cc3f8eb8585.jpg',
                    slogan: 'The way up is not crowded, and most chose ease.',
                    name: 'xc-blog',
                    domain: 'https://www.fengziy.cn',
                    notice: '念天地之悠悠，独怆然而涕下',
                    desc: '一个It技术的探索者'
                }
            }
        }
    },
    // 站点社交信息
    {
        url: '/social',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: [
                    {
                        id: 1,
                        title: '掘金',
                        icon: 'iconjuejin',
                        color: '#1AB6FF ',
                        href: 'https://juejin.cn/user/1500172650291319'
                    },
                    {
                        id: 2,
                        title: 'Gitee',
                        icon: 'icongitee',
                        color: '#d81e06',
                        href: 'https://gitee.com/Cjy_Zy'
                    },
                    {
                        id: 3,
                        title: 'GitHub',
                        icon: 'icongithub',
                        color: '',
                        href: 'https://github.com/YJCCreateAHistory'
                    },
                    {
                        id: 4,
                        title: 'CSDN',
                        icon: 'iconcsdn',
                        color: 'red',
                        href: 'https://blog.csdn.net/qq_47195235?spm=1000.2115.3001.5343'
                    }
                ]
            }
        }
    }
]