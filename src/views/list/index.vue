<template>
  <div class="list-mode">
    <div v-for="item in listData" :key="item.id" class="list-item" @click="goDetail(item.id)">
      <img class="img" :alt="item.title" :src="item.art_thumb">
      <h3>{{ item.art_title }}</h3>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/list'
export default {
  data() {
    return {
      listData: [],
      params: {
        page: 1,
        size: 8
      }
    }
  },
  created() {
    this.getListData()
  },
  methods: {
    getListData() {
      getList(this.params).then(res => {
        console.log(res)
        this.listData = res.data.list.map(item => {
          item.art_thumb = `http://api.xyy51.cn/static/${item.art_thumb}`
          return item
        })
      })
    },
    goDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
