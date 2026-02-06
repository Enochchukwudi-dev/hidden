// Use the prebuilt .avif images from the public /images folder
// Prefer 1024 where available, otherwise fall back to 768, then 480
const fg_army1 = '/images/fg_army1-768.avif'
const fg_army2 = '/images/fg_army2-768.avif'
const fg_black1 = '/images/fg_black1-768.avif'
const fg_black2 = '/images/fg_black2-768.avif'
const fg_blue1 = '/images/fg_blue1-768.avif'
const fg_blue2 = '/images/fg_blue2-768.avif'
const fg_grey1 = '/images/fg_grey1-768.avif'
const fg_grey2 = '/images/fg_grey2-768.avif'
const fg_orange1 = '/images/fg_orange1-768.avif'
const fg_orange2 = '/images/fg_orange2-768.avif'
const fg_red1 = '/images/fg_red1-768.avif'
const fg_red2 = '/images/fg_red2-768.avif'
const fg_violet1 = '/images/fg_violet1-768.avif'
const fg_violet2 = '/images/fg_violet2-768.avif'
const fg_mili1 = '/images/fg_mili1-768.avif'
const fg_mili2 = '/images/fg_mili2-768.avif'
const fg_bluee1 = '/images/fg_bluee1-768.avif'
const fg_bluee2 = '/images/fg_bluee2-768.avif'
const fg_red1_1 = '/images/fg_red1.1-768.avif'
const fg_red1_2 = '/images/fg_red1.2-768.avif'

const bean_army1 = '/images/bean_army1-768.avif'
const bean_army2 = '/images/bean_army2-768.avif'
const bean_black1 = '/images/bean_black1-768.avif'
const bean_black2 = '/images/bean_black2-768.avif'
const bean_brown1 = '/images/bean_brown1-768.avif'
const bean_brown2 = '/images/bean_brown2-768.avif'
const bean_green1 = '/images/bean_green1-768.avif'
const bean_green2 = '/images/bean_green2-768.avif'
const bean_grey1 = '/images/bean_grey1-768.avif'
const bean_grey2 = '/images/bean_grey2-768.avif'
const bean_indigo1 = '/images/bean_indigo1-768.avif'
const bean_indigo2 = '/images/bean_indigo2-768.avif'
const bean_purple1 = '/images/bean_purple1-768.avif'
const bean_purple2 = '/images/bean_purple2-768.avif'
const bean_red1 = '/images/bean_red1-768.avif'
const bean_red2 = '/images/bean_red2-768.avif'
const inspired1 = '/images/inspired1-1024.avif'
const inspired2 = '/images/inspired2-1024.avif'
const neverfly1 = '/images/neverfly1-1024.avif'
const neverfly2 = '/images/neverfly2-768.avif'
const nvblack1 = '/images/nvblack1-1024.avif'
const nvblack2 = '/images/nvblack2-1024.avif'
const _1percent2 = '/images/1percent2-1024.avif'
const nonamee = '/images/nonamee-1024.avif'
const highway = '/images/highway-1024.avif'
const jesus = '/images/jesus-1024.avif'
const tactical_camo = '/images/tactical_camo-1024.avif'
const tactical_camo2 = '/images/tactical_camo2-1024.avif'
const tactical_gray = '/images/tactical_gray-1024.avif'
const tactical_gray2 = '/images/tactical_gray2-1024.avif'
const tactical_navyblue = '/images/tactical_navyblue-1024.avif'
const tactical_navyblue2 = '/images/tactical_navyblue2-1024.avif'
const Signaturecap_black = '/images/Signaturecap_black-1024.avif'
const Signaturecap_black2 = '/images/Signaturecap_black2-1024.avif'
const Signaturecap_black3 = '/images/Signaturecap_black3-1024.avif'
const Signaturecap_pink = '/images/Signaturecap_pink-1024.avif'
const Signaturecap_pink2 = '/images/Signaturecap_pink2-1024.avif'
const Signaturecap_pink3 = '/images/Signaturecap_pink3-1024.avif'
const Signaturecap_gray = '/images/Signaturecap_gray-1024.avif'
const Signaturecap_gray2 = '/images/Signaturecap_gray2-1024.avif'
const Signaturecap_gray3 = '/images/Signaturecap_gray3-1024.avif'
const Signaturecap_red = '/images/Signaturecap_red-1024.avif'
const Signaturecap_red2 = '/images/Signaturecap_red2-1024.avif'
const Signaturecap_red3 = '/images/Signaturecap_red3-1024.avif'
const signred = '/images/signred-1024.avif'
const signblack = '/images/signblack-1024.avif' 


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
