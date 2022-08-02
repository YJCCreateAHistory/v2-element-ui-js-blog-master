<template>
  <div class="home">
    <banner isHome="true"></banner>
    <div class="site-content animate">
      <!--通知栏-->
      <div class="notify">
        <div class="search-result" v-if="hideSlogan">
          <span v-if="searchWords">搜索结果："{{ searchWords }}" 相关文章</span>
          <span v-else-if="category">分类 "{{ category }}" 相关文章</span>
        </div>
        <quote v-else>{{ notice }}</quote>
      </div>
      <!-- <div v-if="hideSlogan">
        <imgWall></imgWall>
      </div> -->
      <!--焦点图-->
      <div class="top-feature" v-if="!hideSlogan">
        <section-title>
          <div style="display: flex;align-items: flex-end;">
            聚焦<small-ico></small-ico>
          </div>
        </section-title>
        <div class="feature-content">
          <div class="feature-item" v-for="item in features" :key="item.title">
            <Feature :data="item"></Feature>
          </div>
        </div>
      </div>
      <!--文章列表-->
      <main class="site-main" :class="{ search: hideSlogan }">
        <section-title v-if="!hideSlogan">推荐</section-title>
        <template v-for="item in articleList">
          <post :post="item" :key="item.id"></post>
        </template>
      </main>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/banner";
import Feature from "@/components/feature";
import sectionTitle from "@/components/section-title";
import Post from "@/components/post";
import SmallIco from "@/components/small-ico";
import Quote from "@/components/quote";
import imgWall from "@/components/img-wall";
import { fetchFocus, fetchList } from "../api";
import { PostRequest } from "../api/http";
export default {
  name: "Home",
  props: ["cate", "words"],
  data() {
    return {
      //查询条件
      query: {
        size: 8,
        current: 1,
        //排序字段
        orderBy: "isTop",
        //排序类型
        orderType: "DESC",
        params: {
          id: "",
          title: "",
          classId: "",
          className: "",
          keyword: "",
        },
      },
      temp: {
        dataSize: 0,
      },
      features: [
        {
          id: 1,
          name:'/category/全部',
          title: "全部文章",
          img: "https://s3.bmp.ovh/imgs/2022/07/30/f29c4f843ed54ec0.jpg",
        },
        {
          id: 2,
          title: "关于我",
          name:'/about',
          img: "https://s3.bmp.ovh/imgs/2022/07/30/a0de55f8bb6c8b25.jpg",
        },
        {
          id: 3,
          title: "关于我们",
          name:'/aboutus',
          img: "https://s3.bmp.ovh/imgs/2022/07/30/e5e9eb3940c9ac83.jpg",
        },
      ],
      loading: false,
      postList: [],
      articleList: [],
    };
  },
  components: {
    Banner,
    Feature,
    sectionTitle,
    Post,
    SmallIco,
    Quote,
    imgWall
  },
  watch: {
    // 监控路由
    $route: function(val) {
      // console.log(val)
      if (val.params.cate) {
        this.getDataList(val.params.cate);
        return;
      }
      if (val.params.words) {
        this.getDataList("", val.params.words);
        return;
      }
      this.query.params.className = "";
      this.query.params.keyword = "";
      this.getDataList();
    },
  },
  computed: {
    searchWords() {
      return this.$route.params.words;
    },
    category() {
      return this.$route.params.cate;
    },
    hideSlogan() {
      return this.category || this.searchWords;
    },
    notice() {
      return this.$store.getters.notice || "人生如风一样逝去";
    },
  },
  methods: {
    // fetchFocus() {
    //   fetchFocus()
    //     .then((res) => {
    //       this.features = res.data || [];
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // mock数据
    // fetchList() {
    //   fetchList()
    //     .then((res) => {
    //       this.postList = res.data.items || [];
    //       this.currPage = res.data.page;
    //       this.hasNextPage = res.data.hasNextPage;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 文章列表
    getDataList(val, keyword) {
      let that = this;
      this.loading = true;
      if (val) {
        this.query.params.className = val;
      }
      if (keyword) {
        this.query.params.className = keyword;
      }
      // 点击归档获取className
      PostRequest("/blog/list", this.query.params)
        .then((data) => {
          // console.log(data ,1111)
          if (data.records.length) {
            this.articleList = data.records || [];
            that.temp.dataSize = data.total;
            this.loading = false;
          }
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
  },
  mounted() {
    // 拿到路由参数
    let cate = this.$route.params.cate;
    let words = this.$route.params.words;
    // console.log(cate, words);
    if (cate) {
      this.getDataList(cate);
      return;
    }
    if (words) {
      this.getDataList("", words);
      return;
    }
    // 挂载获取数据
    this.getDataList();
  },
};
</script>
<style scoped lang="less">
.site-content {
  .notify {
    margin: 60px 0;
    border-radius: 3px;
    & > div {
      padding: 20px;
    }
  }

  .search-result {
    padding: 15px 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    border: 1px dashed #ddd;
    color: #828282;
  }
}

.top-feature {
  width: 100%;
  height: auto;
  margin-top: 30px;

  .feature-content {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;

    .feature-item {
      width: 32.9%;
    }
  }
}

.site-main {
  padding-top: 80px;

  &.search {
    padding-top: 0;
  }
}

.more {
  margin: 50px 0;
  .more-btn {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #adadad;
    border: 1px solid #adadad;
    border-radius: 20px;
    margin: 0 auto;
    cursor: pointer;
    &:hover {
      color: #8fd0cc;
      border: 1px dashed #8fd0cc;
    }
  }
}

/******/
@media (max-width: 800px) {
  .top-feature {
    display: none;
  }

  .site-main {
    padding-top: 40px;
  }

  .site-content {
    .notify {
      margin: 30px 0 0 0;
    }

    .search-result {
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
}

/******/
</style>
