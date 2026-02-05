import fg_army1 from '../assets/fg_army1.jpg'
import fg_army2 from '../assets/fg_army2.jpg'
import fg_black1 from '../assets/fg_black1.jpg'
import fg_black2 from '../assets/fg_black2.jpg'
import fg_blue1 from '../assets/fg_blue1.jpg'
import fg_blue2 from '../assets/fg_blue2.jpg'
import fg_grey1 from '../assets/fg_grey1.jpg'
import fg_grey2 from '../assets/fg_grey2.jpg'
import fg_orange1 from '../assets/fg_orange1.jpg'
import fg_orange2 from '../assets/fg_orange2.jpg'
import fg_red1 from '../assets/fg_red1.jpg'
import fg_red2 from '../assets/fg_red2.jpg'
import fg_violet1 from '../assets/fg_violet1.jpg'
import fg_violet2 from '../assets/fg_violet2.jpg'
import fg_mili1 from '../assets/fg_mili1.jpg'
import fg_mili2 from '../assets/fg_mili2.jpg'
import fg_bluee1 from '../assets/fg_bluee1.jpg'
import fg_bluee2 from '../assets/fg_bluee2.jpg'
import fg_red1_1 from '../assets/fg_red1.1.jpg'
import fg_red1_2 from '../assets/fg_red1.2.jpg'

import bean_army1 from '../assets/bean_army1.jpg'
import bean_army2 from '../assets/bean_army2.jpg'
import bean_black1 from '../assets/bean_black1.jpg'
import bean_black2 from '../assets/bean_black2.jpg'
import bean_brown1 from '../assets/bean_brown1.jpg'
import bean_brown2 from '../assets/bean_brown2.jpg'
import bean_green1 from '../assets/bean_green1.jpg'
import bean_green2 from '../assets/bean_green2.jpg'
import bean_grey1 from '../assets/bean_grey1.jpg'
import bean_grey2 from '../assets/bean_grey2.jpg'
import bean_indigo1 from '../assets/bean_indigo1.jpg'
import bean_indigo2 from '../assets/bean_indigo2.jpg'
import bean_purple1 from '../assets/bean_purple1.jpg'
import bean_purple2 from '../assets/bean_purple2.jpg'
import bean_red1 from '../assets/bean_red1.jpg'
import bean_red2 from '../assets/bean_red2.jpg'
import inspired1 from '../assets/inspired1.jpeg'
import inspired2 from '../assets/inspired2.jpeg'
import neverfly1 from '../assets/neverfly1.jpeg'
import neverfly2 from '../assets/neverfly2.jpeg'
import nvblack1 from '../assets/nvblack1.jpg'
import nvblack2 from '../assets/nvblack2.jpg'
import _1percent2 from '../assets/1percent2.jpeg'
import nonamee from '../assets/nonamee.jpeg'
import highway from '../assets/highway.jpeg'
import jesus from '../assets/jesus.jpeg'
import tactical_camo from '../assets/tactical_camo.jpeg'
import tactical_camo2 from '../assets/tactical_camo2.jpeg'
import tactical_gray from '../assets/tactical_gray.jpeg'
import tactical_gray2 from '../assets/tactical_gray2.jpeg'
import tactical_navyblue from '../assets/tactical_navyblue.jpeg'
import tactical_navyblue2 from '../assets/tactical_navyblue2.jpeg'
import Signaturecap_black from '../assets/Signaturecap_black.jpeg'
import Signaturecap_black2 from '../assets/Signaturecap_black2.jpeg'
import Signaturecap_black3 from '../assets/Signaturecap_black3.jpeg'
import Signaturecap_pink from '../assets/Signaturecap_pink.jpeg'
import Signaturecap_pink2 from '../assets/Signaturecap_pink2.jpeg'
import Signaturecap_pink3 from '../assets/Signaturecap_pink3.jpeg'
import Signaturecap_gray from '../assets/Signaturecap_gray.jpeg'
import Signaturecap_gray2 from '../assets/Signaturecap_gray2.jpeg'
import Signaturecap_gray3 from '../assets/Signaturecap_gray3.jpeg'
import Signaturecap_red from '../assets/Signaturecap_red.jpeg'
import Signaturecap_red2 from '../assets/Signaturecap_red2.jpeg'
import Signaturecap_red3 from '../assets/Signaturecap_red3.jpeg'
import signred from '../assets/signred.jpeg'
import signblack from '../assets/signblack.jpeg'


export const products = [
  { id:1, title:'CAMO YELLOW TRUCKER', price:15000, image:fg_army1, images:[fg_army1, fg_army2], rating:5 },
  { id:2, title:'CLASSIC BLACK TRUCKER', price:15000, image:fg_black1, images:[fg_black1, fg_black2], rating:4.5 },
  { id:3, title:'SKY BLUE TRUCKER', price:15000, image:fg_blue1, images:[fg_blue1, fg_blue2], rating:5 },
  { id:4, title:'SILVER GREY TRUCKER', price:15000, image:fg_grey1, images:[fg_grey1, fg_grey2], rating:4, soldOut: true },
  { id:5, title:'BURNT ORANGE TRUCKER', price:15000, image:fg_orange1, images:[fg_orange1, fg_orange2], rating:4.5 },
  { id:6, title:'DEEP RED TRUCKER', price:15000, image:fg_red1, images:[fg_red1, fg_red2], rating:5 },
  { id:21, title:'FG 1% BETTER TEE WHITE', price:30000, image:_1percent2, images:[_1percent2, neverfly1], rating:4 },
  { id:33, title:'FG 1% BETTER TEE BLACK', price:30000, image:nonamee, images:[nonamee, inspired1], rating:4 },
  { id:8, title:'FOREST CAMO TRUCKER', price:15000, image:fg_mili1, images:[fg_mili1, fg_mili2], rating:4.5 },
  { id:9, title:'ROYAL PURPLE TRUCKER', price:15000, image:fg_bluee1, images:[fg_bluee1, fg_bluee2], rating:5 },
  { id:10, title:'BRIGHT RED TRUCKER', price:15000, image:fg_red1_1, images:[fg_red1_1, fg_red1_2], rating:4.5 },
  { id:11, title:'CHARCOAL GREY BEANIE', price:20000, image:bean_army1, images:[bean_army1, bean_army2], rating:5, soldOut: true},
  { id:12, title:'JET BLACK BEANIE', price:20000, image:bean_black1, images:[bean_black1, bean_black2], rating:4, soldOut: true },
  { id:23, title:'FG LOGO TEE', price:30000, image:highway, images:[highway], rating:4 },
  { id:14, title:'LIGHT GREEN BEANIE', price:20000, image:bean_green2, images:[bean_green1, bean_green2], rating:5 },
  { id:15, title:'LIGHT GREY BEANIE', price:20000, image:bean_grey1, images:[bean_grey1, bean_grey2], rating:4 },
  { id:16, title:'NAVY BLUE BEANIE', price:20000, image:bean_indigo1, images:[bean_indigo1, bean_indigo2], rating:4.5 },
  { id:20, title:'FG 2FLY 2PRAY TEE WHITE', price:30000, image:neverfly2, images:[neverfly1, neverfly2], rating:4 },
  { id:18, title:'WINE RED BEANIE', price:20000, image:bean_red1, images:[bean_red1, bean_red2], rating:4 },
  { id:19, title:'FG FEAR OF AVERAGE TEE', price:30000, image:inspired2, images:[inspired2, inspired1], rating:4 },
  { id:34, title:'FG  2FLY 2PRAY TEE BLACK', price:30000, image:nvblack2, images:[nvblack2, nvblack1], rating:4 },
  { id:17, title:'DEEP PURPLE BEANIE', price:20000, image:bean_purple1, images:[bean_purple1, bean_purple2], rating:5 },
  { id:7, title:'BURGUNDY CAMO TRUCKER', price:15000, image:fg_violet1, images:[fg_violet1, fg_violet2], rating:4 },
  { id:22, title:'FG HIGHWAY TO HEAVEN TEE', price:30000, image:jesus, images:[jesus], rating:5 },
  { id:13, title:'EARTH BROWN BEANIE', price:20000, image:bean_brown1, images:[bean_brown1, bean_brown2], rating:4.5, soldOut: true },
  { id:24, title:'FG TACTICAL CAP (CARMO)', price:22000, image:tactical_camo, images:[tactical_camo, tactical_camo2], rating:5},
  { id:25, title:'FG TACTICAL CAP (GREY)', price:20000, image:tactical_gray, images:[tactical_gray, tactical_gray2], rating:5},
  { id:26, title:'FG TACTICAL CAP (NAVY BLUE)', price:20000, image:tactical_navyblue, images:[tactical_navyblue, tactical_navyblue2], rating:5},
  { id:27, title:'FG SIGNATURE CAP (BLACK)', price:20000, image:Signaturecap_black, images:[Signaturecap_black, Signaturecap_black2, Signaturecap_black3], rating:5},
  { id:28, title:'FG SIGNATURE CAP (PINK)', price:20000, image:Signaturecap_pink, images:[Signaturecap_pink, Signaturecap_pink2, Signaturecap_pink3], rating:5},
  { id:29, title:'FG SIGNATURE CAP (GRAY)', price:20000, image:Signaturecap_gray, images:[Signaturecap_gray, Signaturecap_gray2, Signaturecap_gray3], rating:5},
  { id:32, title:'FG SIGNATURE CAP (RED)', price:20000, image:Signaturecap_red, images:[Signaturecap_red, Signaturecap_red2, Signaturecap_red3], rating:5},
  { id:30, title:'FG SIGNATURE BEANIE (RED)', price:10000, image:signred, images:[signred], rating:5},
  { id:31, title:'FG SIGNATURE BEANIE (BLACK)', price:10000, image:signblack, images:[signblack], rating:5},

 
]

export default products;
