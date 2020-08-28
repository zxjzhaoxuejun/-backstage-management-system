<template>

  <div class="share-mode">
    <ShareItem
      share-method="facebook"
      url="https://news.vuejs.org/issues/180"
      title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
      description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
      quote="The hot reload is so fast it\'s near instant. - Evan You"
      hashtags="vuejs,vite"
    >
      <i class="fa fa-facebook-square" />
    </ShareItem>

    <ShareItem
      share-method="twitter"
      url="https://news.vuejs.org/issues/180"
      title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
      hashtags="vuejs,vite"
      twitter-user="74747838"
      @close="share_network_close"
    >
      <i class="fa fa-twitter-square" />
    </ShareItem>

    <ShareItem
      share-method="pinterest"
      url="https://news.vuejs.org/issues/180"
      title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
      media="https://image.dhgate.com/f2/albu/g9/M00/16/C9/rBVaWF57I5SAJcK0AAL1USUMwPg485.jpg"
    >
      <i class="fa fa-pinterest" />
    </ShareItem>

    <ShareItem
      share-method="email"
      url="https://news.vuejs.org/issues/180"
      title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
      description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
      @open="share_network_open"
      @close="share_network_close"
    >
      <i class="fa fa-envelope-square" />
    </ShareItem>
  </div>
</template>

<script>
import ShareItem from './components/ShareItem'
export default {
  components: { ShareItem },
  data() {
    return {

    }
  },
  methods: {
    share_network_open(val) {
      console.log('打开' + val)
    },
    share_network_close(val) {
      console.log('关闭' + val)
    }
  }
}
</script>

<style scoped lang="scss">
.share-mode{
    font-size: 16px;

    a{
        margin-right: 6px;
        cursor: pointer;

        i{
            color: #aaa;
        }

        &:hover{
            i{
                color: #337ab7;
            }
        }
    }
}
</style>
