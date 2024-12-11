<template>
  <!-- <PageHeader /> -->
  <div class="section-wrapper">
    <section class="mb-20 gap-10">
      <div class="title-underline mb-10 font-semibold">
        <h4 class="mb-3" v-if="newsItem && newsItem.title">
          {{ newsItem.title }}
        </h4>
        <div class="date mb-3" v-if="newsItem && newsItem.releaseAt">
          {{ formatDate(newsItem.releaseAt) }}
        </div>
        <!-- <div>{{ newsItem.content }}</div> -->
      </div>
      <div
        class="bulltin w-full"
        v-if="newsItem && newsItem.content"
        v-html="newsItem.content"
      ></div>
    </section>
    <div class="btn">
      <button class="page1" @click="toPrev()">回上一頁</button>
      <button class="page1" @click="toNext()">閱讀下一篇</button>
    </div>
  </div>
</template>
<script>
import newsSrv from '@/service/news.js'
import { announcementStore } from '@/stores/Announcement'
import { storeToRefs } from 'pinia'

export default {
  components: {},

  data() {
    return {
      newsItem: {},
      newsList: [], // 保存取得的新聞列表
      currentIndex: null, // 當前顯示的新聞的索引
      type: null,
      // newsList: [],
      // itemsPerPage: 10,
      // loading: false,
      // itemsPerPage: 10, // 每頁顯示的資料數
      // totalItems: null,
      currentPage: 1,
      // pageCount: '10',
      totalPages: null,
      originalIndex: null
      // loading: false
    }
  },
  created() {
    const store = announcementStore()
    const { currentType } = storeToRefs(store)
    const { currentPage } = storeToRefs(store)
    const { totalPages } = storeToRefs(store)
    //在這裡把page資訊拿出來

    // console.log('儲存在 store 中的頁數是:', currentPage.value);
    this.currentPage = currentPage.value
    this.totalPages = totalPages.value

    if (currentType) {
      console.log(currentType)
      this.type = currentType
    }
    this.getnewsItem()
  },
  computed: {
    // 根據當前頁碼計算顯示的新聞列表
    paginatedNewsList() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.newsList.slice(start, end)
    }
  },
  mounted() {
    this.getAnnouncementList(true)

    const currentIndex = parseInt(this.$route.query.currentIndex, 10)
    const newsId = this.$route.query.id
    // 假設要走最麻煩的上一頁
    this.originalIndex = currentIndex
    this.originalPage = this.currentPage
    // 使用 currentIndex 和 newsId 做相關處理
    console.log('Current Index:', currentIndex) // 這裡應該顯示正確的 index
    console.log('News ID:', newsId)

    // 假設你有一個 newsList，你可以透過 currentIndex 來顯示對應的新聞

    //   if (this.newsList && this.newsList.length > currentIndex && currentIndex >= 0) {
    //     this.newsItem = this.newsList[currentIndex];
    //     console.log('this.newsItem:', this.newsItem);
    // } else {
    //     console.error('Invalid index or newsList is empty');
    // }

    // 從路由的 query 中獲取 currentIndex
    // const { currentIndex } = this.$route.query;
    // if (currentIndex) {
    //   this.currentIndex = parseInt(currentIndex);
    // }
  },
  watch: {
    // page(n) {
    //   this.getAnnouncementList()
    // }
  },
  methods: {
    async getAnnouncementList(action) {
      this.loading = true
      //在這裡打包page的值
      const obj = {
        sortBy: 'release_at',
        sortDirection: 'DESC',
        type: this.type,
        currentPage: this.currentPage,
        pageSize: 10
      }
      try {
        const response = await newsSrv.getAnnouncementList(obj)
        if (response.data && response.data.rtnCode === '0000') {
          this.newsList = response.data.data
          const store = announcementStore()
          const currentPage = this.currentPage
          store.updatePagination(currentPage)

          if (action === 'nextPage') {
            this.$router.push({
              path: '/newsView',
              query: {
                id: this.newsList[0].announcementsId, // 根據下一篇文章的 id 更新
                currentIndex: 0
              }
            })
          }
          setTimeout(() => {
            this.getnewsItem()
          }, 100) // 500 毫秒延遲
        }
      } catch (error) {
        console.error('取得新聞列表失敗:', error)
      } finally {
        this.loading = false
      }
    },
    getnewsItem() {
      const id = this.$route.query.id
      newsSrv
        .getAnnouncement(id)
        .then((res) => {
          if (res.isSuccess) {
            this.newsItem = res.data
            // this.getAnnouncementList()
            // console.log(this.newsItem)
            console.log(this.newsItem.content)
          } else {
            console.error(
              '資料載入失敗, rtnCode:',
              res.data ? res.data.rtnCode : '無法讀取rtnCode'
            )
            // console.error('資料載入失敗, isSuccess:', res.isSuccess);
          }
        })
        .catch((error) => {
          console.error('請求失敗', error)
        })
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      const isUtc =
        !dateStr.includes('Z') &&
        !dateStr.includes('+') &&
        !dateStr.includes('-')
      if (isUtc) {
        date.setHours(date.getHours() + 8)
      }
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const formattedDateTime = `${year}/${month}/${day}`
      return formattedDateTime
    },
    changePage(newPage) {
      if (newPage > 0 && newPage <= this.totalPages) {
        this.currentPage = newPage
      }
    },
    toPrev() {
      this.$router.push('/news')
      query: {
        currentPage: this.currentPage
      }
    },
    // toNext() {
    //   if (this.currentIndex < this.newsList.length - 1) {
    //     this.currentIndex++;
    //     this.newsItem = this.newsList[this.currentIndex];
    //   } else {
    //     alert("已經是最後一頁");
    //   }
    // },
    toNext() {
      // 從路由的 query 參數中獲取當前的 currentIndex
      const currentIndex = parseInt(this.$route.query.currentIndex)
      console.log('click!')

      // 檢查是否還有下一篇文章
      if (currentIndex < this.newsList.length - 1) {
        const nextIndex = currentIndex + 1
        console.log('check')

        // 先進行路由跳轉
        this.$router.push({
          path: '/newsView',
          query: {
            id: this.newsList[nextIndex].announcementsId, // 根據下一篇文章的 id 更新
            currentIndex: nextIndex
          }
        })
        console.log('push')

        // 使用 setTimeout 延遲 500 毫秒後執行 getnewsItem
        setTimeout(() => {
          this.getnewsItem()
        }, 100) // 500 毫秒延遲
      } else {
        // 在這裡處理上面拿到的 page 值
        console.log('111')
        if (this.currentPage < this.totalPages) {
          console.log('222')
          this.currentPage++

          this.getAnnouncementList('nextPage')
        } else {
          alert('已經是最後一頁')
        }
      }
    }

    // 上一頁
    // toPrev() {
    //   if (this.currentIndex > 0) {
    //     this.currentIndex--;
    //     this.newsItem = this.newsList[this.currentIndex];
    //   } else {
    //     alert("已經是第一頁");
    //   }
    // }

    //   toPrev() {
    //     if (this.currentIndex === 0) {
    //     // 如果是第一篇，跳轉到 /news 頁面
    //     this.$router.push('/news');
    //   } else {
    //     // 如果不是第一篇，切換到上一篇
    //     this.currentIndex--; // 減少當前索引
    //     this.newsItem = this.newsList[this.currentIndex]; // 更新當前的新聞項目
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
.date {
  font-size: 16px;
  font-weight: 400;
  color: #6e6e6e;
}
.page1 {
  border-width: 1px;
  border-color: #6e6e6e;
  border-radius: 4px;
  padding: 12px 24px 12px 24px;
  font-size: 16px;
}
.btn {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;
}
.bulltin {
  display: block;
  word-wrap: break-word; /* 遇到單詞過長時換行 */
  word-break: break-word; /* 支援中英文內容自動斷行 */
  // list-style: inside;
}


</style>
