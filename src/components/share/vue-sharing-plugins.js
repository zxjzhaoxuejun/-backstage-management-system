import ShareLinks from './share-links'
import ShareItem from './share-item'

export default {
  install: (Vue, options) => {
    Vue.component(ShareItem.name, ShareItem)

    Vue.prototype.$SocialSharing = {
      options: {
        networks: options ? Object.assign(
          ShareLinks,
          options.networks
        ) : ShareLinks
      }
    }
  }
}

export { ShareItem }
