<template>
  <div class="list-detail">
    <ShareItem
      share-method="twitter"
      url="http://test.xyy51.cn/detail?id=128"
      title="科技进步是时代发展的一种象征，互联网时代的今天，建站公司的兴起是必然的发展"
      hashtags="vuejs,vite"
      twitter-user="74747838"
      @close="share_network_close"
    >
      <i class="fa fa-twitter-square" />
    </ShareItem>
    <div class="con" v-html="detail.art_content" />
  </div>
</template>

<script>
import ShareItem from '../../components/share/ShareItem'
import { getInfo } from '@/api/list'

export default {
  components: {
    ShareItem
  },
  data() {
    return {
      detail: {},
      title: '',
      description: '',
      img: ''
    }
  },
  metaInfo() {
    return {
      title: this.title,
      meta: [
        { vmid: 'description', name: 'twitter:description', content: this.description },
        { vmid: 'title', name: 'twitter:title', content: this.title },
        { vmid: 'image', name: 'twitter:image', content: this.img }
      ]
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      const { id } = this.$route.query
      console.log(this.$route.query)
      getInfo({ id }).then(res => {
        console.log(res)
        res.data.art_thumb = `http://api.xyy51.cn/static/${res.data.art_thumb}`
        this.detail = res.data
        this.description = res.data.keywords
        this.title = res.data.art_title
        this.img = res.data.art_thumb
      })
    }
  }
}
</script>

<style scoped>

</style>
