<template>
  <div class="list-detail">
    <ShareItem
      share-method="twitter"
      url="http://test.xyy51.cn/detail?id=128"
      title="64"
      hashtags="232起323展"
      twitter-user="3422起是必然的发展"
      @close="share_network_close"
    >
      <i class="fa fa-twitter-square" />
    </ShareItem>
    <div class="con" v-html="detail.art_content" />
  </div>
</template>

<script>
import ShareItem from '../../components/share/share-item'
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
        { vmid: 'image', name: 'twitter:image', content: this.img },
        { vmid: '1', property: 'og:type', content: 'web' },
        { vmid: '2', property: 'og:image', content: this.img },
        { vmid: '3', property: 'og:title', content: this.title },
        { vmid: '4', property: 'og:description', content: this.description },
        { vmid: '5', property: 'og:url', content: 'http://test.xyy51.cn/detail?id=128' }
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
    },
    share_network_close() {

    }
  }
}
</script>

<style scoped>

</style>
