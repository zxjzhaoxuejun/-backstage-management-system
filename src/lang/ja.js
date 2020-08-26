export default {
  route: {
    dashboard: 'トップ',
    goods: 'Goods'
  },
  navbar: {
    dashboard: 'トップ',
    github: 'GitHub',
    logOut: 'ログアウト',
    user: 'プロフィール',
    theme: 'テーマ変更',
    size: '画面サイズ',
    setting: 'Setting'
  },
  login: {
    title: 'ユーザログイン',
    logIn: 'ログイン',
    username: 'ユーザ名',
    password: 'パスワード',
    join: 'Join Free',
    newTips: 'New to Myyshopify?',
    forgotpassword: 'Forgot password?'
  },
  goods: {
    warning: '新規作成と編集画面は keep-alive を使えないです。keep-alive の include はrouteのキャッシュは使えないです。そのため、component name を使ってキャッシュさせるようにします。このようなキャッシュ機能を作りたい場合，localStorageを使う手があります。もしくは keep-alive の includeを使って、全ページキャッシュする方法はあります。'
  },
  tagsView: {
    refresh: '更新',
    close: '閉じる',
    closeOthers: 'その他閉じる',
    closeAll: 'すべて閉じる'
  },
  settings: {
    title: 'システムテーマ',
    theme: 'テーマ色',
    tagsView: 'Tags-View 開く',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  importList: {
    selectAll: 'Select All'
  }
}
