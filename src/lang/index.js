import VueI18n from 'vue-i18n'
import Vue from 'vue'
import  Cookies from 'js-cookie'
import locale from 'element-ui/lib/locale';
import  elementEnLocale from 'element-ui/lib/locale/lang/en'
import  elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import  enLocale from './en'
import  zhLocale from './zh'
Vue.use(VueI18n);
const messages={
  en:{
    ...elementEnLocale,
    ...enLocale
  },
  zh:{
    ...elementZhLocale,
    ...zhLocale
  }
};

const i18n=new VueI18n({
  locale: Cookies.get('language') || 'en', // set locale
  messages,
})
locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换
export default i18n
/*
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)
// console.log('zhLocale',zhLocale,{...elementEnLocale,...enLocale})
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en', // set locale
  messages // set locale messages
})

export default i18n
*/
