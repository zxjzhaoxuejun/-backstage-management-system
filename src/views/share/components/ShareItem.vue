
<script>
import ShareLinks from './share-links'
const $window = typeof window !== 'undefined' ? window : null
export default {
  name: 'ShareItem',

  props: {
    /**
     * 分享平台名称
     */
    shareMethod: {
      type: String,
      required: true
    },

    /**
     * 分享链接
     */
    url: {
      type: String,
      required: true
    },

    /**
     *分享标题
     */
    title: {
      type: String,
      required: true
    },

    /**
     *分享描述 Description
     */
    description: {
      type: String,
      default: ''
    },

    /**
     * Facebook报价（仅限Facebook）quote
     */
    quote: {
      type: String,
      default: ''
    },

    /**
     * 逗号分隔的标签列表（Twitter和Facebook）Hashtags
     */
    hashtags: {
      type: String,
      default: ''
    },

    /**
     * Twitter用户（仅限Twitter）
     * @var string
     */
    twitterUser: {
      type: String,
      default: ''
    },

    /**
     * 引导至媒体（Pinterest，VK，微博和Wordpress）
     */
    media: {
      type: String,
      default: ''
    },

    /**
     * HTML tag used by the share component.
     */
    tag: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      popup: {
        width: 626,
        height: 436,
        top: 0,
        left: 0,
        window: undefined,
        interval: null
      }
    }
  },
  computed: {
    /**
     * Formatted shareMethod name.
     */
    key() {
      return this.shareMethod.toLowerCase()
    },
    /**
     * Create the url for sharing.
     */
    shareLink() {
      let link = this.rawLink

      /**
       * Twitter sharing shouldn't include empty parameter
       * Source: https://github.com/nicolasbeauvais/vue-social-sharing/issues/143
       */
      if (this.key === 'twitter') {
        if (!this.hashtags.length) link = link.replace('&hashtags=@h', '')
        if (!this.twitterUser.length) link = link.replace('@tu', '')
      }

      return link
        .replace(/@tu/g, '&via=' + encodeURIComponent(this.twitterUser))
        .replace(/@u/g, encodeURIComponent(this.url))
        .replace(/@t/g, encodeURIComponent(this.title))
        .replace(/@d/g, encodeURIComponent(this.description))
        .replace(/@q/g, encodeURIComponent(this.quote))
        .replace(/@h/g, this.encodedHashtags)
        .replace(/@m/g, encodeURIComponent(this.media))
    },
    /**
     * Network sharing raw sharing link.
     */
    rawLink() {
      const ua = navigator.userAgent.toLowerCase()

      /**
       * On IOS, SMS sharing link need a special formatting
       * Source: https://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme#Body-only
       */
      if (this.key === 'sms' && (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1)) {
        return ShareLinks[this.key].replace(':?', ':&')
      }

      return ShareLinks[this.key]
    },
    /**
     * Encoded hashtags for the current social network.
     */
    encodedHashtags() {
      if (this.key === 'facebook' && this.hashtags.length) {
        return '%23' + this.hashtags.split(',')[0]
      }

      return this.hashtags
    }
  },
  methods: {
    /**
     * Center the popup on multi-screens
     * http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen/32261263
     */
    resizePopup() {
      const width = $window.innerWidth || (document.documentElement.clientWidth || $window.screenX)
      const height = $window.innerHeight || (document.documentElement.clientHeight || $window.screenY)
      const systemZoom = width / $window.screen.availWidth

      this.popup.left = (width - this.popup.width) / 2 / systemZoom + ($window.screenLeft !== undefined ? $window.screenLeft : $window.screenX)
      this.popup.top = (height - this.popup.height) / 2 / systemZoom + ($window.screenTop !== undefined ? $window.screenTop : $window.screenY)
    },
    /**
     * Shares URL in specified network.
     */
    share() {
      this.resizePopup()

      // If a popup window already exist, we close it and trigger a change event.
      if (this.popup.window && this.popup.interval) {
        clearInterval(this.popup.interval)

        // Force close (for Facebook)
        this.popup.window.close()

        this.emit('change')
      }

      this.popup.window = $window.open(
        this.shareLink,
        'sharer',
        ',height=' + this.popup.height +
        ',width=' + this.popup.width +
        ',left=' + this.popup.left +
        ',top=' + this.popup.top +
        ',screenX=' + this.popup.left +
        ',screenY=' + this.popup.top
      )

      this.popup.window.focus()
      // Create an interval to detect popup closing event
      this.popup.interval = setInterval(() => {
        if (!this.popup.window || this.popup.window.closed) {
          clearInterval(this.popup.interval)

          this.popup.window = null

          this.emit('close')
        }
      }, 500)
      this.emit('open')
    },

    /**
     * Touches shareMethod and emits click event.
     */
    touch() {
      window.open(this.shareLink, '_blank')
      this.emit('open')
    },

    emit(name) {
      this.$root.$emit('share_network_' + name, this.key, this.url)
      this.$emit(name, this.key, this.url)
    }
  },
  render: function(createElement) {
    if (!ShareLinks[this.key]) {
      throw new Error('shareMethod ' + this.key + ' does not exist')
    }

    return createElement(this.tag, {
      class: 'share-method-' + this.key,
      on: {
        click: () => this[this.rawLink.substring(0, 4) === 'http' ? 'share' : 'touch']()
      }
    }, this.$slots.default)
  }

}
</script>

<style scoped>

</style>
