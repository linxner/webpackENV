import './css/normalize.css'
import './css/style.less'
// import './js/main'
import wechatShare from './js/share'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper'

wechatShare()
var MySwiper = new Swiper('.box')
console.log(MySwiper)