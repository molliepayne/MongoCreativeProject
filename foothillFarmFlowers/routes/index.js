var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');
var flowers = [{
    name: 'China Aster: King Size Apricot',
    colors: 'pink, apricot, blush, orange',
    imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwd0114608/images/products/flowers/03465_01_king_size_apricot.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September',
    infoLink: 'https://www.johnnyseeds.com/flowers/aster/king-size-apricot-china-aster-seed-3465.html'
  },
  {
    name: 'Sunflower: ProCut® White Nite',
    colors: 'white, yellow, black',
    infoLink: 'https://www.johnnyseeds.com/flowers/sunflowers/tall-sunflowers/procut-white-nite-f1-sunflower-seed-3305.11.html',
    imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwcc89eaa6/images/products/flowers/03305_01_white_nite.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/aster/king-size-apricot-china-aster-seed-3465.11.html'
  }
  ,
    {
      name: 'Sunflower: ProCut® Plum',
      infoLink: 'https://www.johnnyseeds.com/flowers/sunflowers/tall-sunflowers/procut-plum-f1-sunflower-seed-3677.11.html',
      colors: 'cream, red, black, yellow',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw123aa39a/images/products/flowers/03677_01_procutplum.jpg?sw=387&cx=322&cy=0&cw=1094&ch=1094',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Zinnia: Oklahoma Salmon ',
      colors: 'pink, blush',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw2e5dc912/images/products/flowers/3667_01_oklahomasalmon.jpg?sw=387&cx=368&cy=142&cw=1054&ch=1054',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/zinnias/oklahoma-series/oklahoma-salmon-zinnia-seed-3667.11.html'
    },
    {
      name: 'Basil: Mrs. Burns Lemon',
      colors: 'green',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw5fe00045/images/products/herbs/00774_01_mrs_burnslemon.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September',
    infoLink: 'https://www.johnnyseeds.com/herbs/basil/citrus-basil/mrs.-burns-lemon-basil-seed-774.11.html'
    },
    {
      name: 'Queen Anne\'s lace',
      colors: 'black, purple, pink, white',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw5a026d7f/images/products/flowers/01968_01_dara.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September',
    infoLink: 'https://www.johnnyseeds.com/flowers/ammi-false-queen-annes-lace/dara-ammi-seed-1968.11.html'
    },
    {
      name: 'Yarrow: Colorado Mix',
      colors: 'red, pink, blush, orange, yellow, apricot, white',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw5f7345d2/images/products/flowers/03878g_01_colorado.jpg?sw=387&cx=346&cy=38&cw=1138&ch=1138',
    bloomMonths: 'July, August, September',
    infoLink: 'https://www.johnnyseeds.com/flowers/yarrow/colorado-mix-organic-yarrow-seed-3878G.11.html'
    },
    {
      name: 'Snapdragon: Chantilly Light Pink',
      colors: 'pink, blush',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw0313ad7d/images/products/flowers/01982_01_chantilly_light_pink.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/snapdragon/chantilly-light-pink-f1-snapdragon-seed-1982.11.html'
    },
    {
      name: 'Strawflower: Silvery Rose',
      colors: 'white, pink, blush',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwfb0ff336/images/products/flowers/03328_01_silvery_rose.jpg?sw=387&cx=236&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September',
    infoLink: 'https://www.johnnyseeds.com/flowers/strawflower/silvery-rose-strawflower-seed-3328.11.html'
    },
    {
      name: 'Clarkia: Elegant Salmon',
      colors: 'pink, salmon',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwc2bd0609/images/products/flowers/04022_01_elegance_salmon.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September',
    infoLink: 'https://www.johnnyseeds.com/flowers/clarkia/elegant-salmon-clarkia-seed-4022.11.html'
    },
    {
      name: 'Zinnia: Benary\'s Giant Wine ',
      colors: 'red, pink',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwb1a303a4/images/products/flowers/1866_01_benarys_wine.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/zinnias/benarys-giant-series/benarys-giant-wine-zinnia-seed-1866.11.html'
    },
    {
      name: 'Dianthus: Chabaud Picotee Double Mix',
      colors: 'pink, purple, cream, white, salmon, apricot',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwfbd40b51/images/products/flowers/3708_02_doublemix.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
     bloomMonths: 'May, June',
     infoLink: 'https://www.johnnyseeds.com/flowers/dianthus-sweet-william/chabaud-picotee-double-mix-dianthus-seed-3708.11.html'
    },
    {
      name: 'Scabiosa: Salmon Rose',
      colors: 'pink, salmon',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwe9824cd3/images/products/flowers/03716_02_salmon_rose.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September',
    infoLink: 'https://www.johnnyseeds.com/flowers/scabiosa-pincushion-flower/salmon-rose-scabiosa-seed-3716.11.html'
    },
    {
      name: 'Zinnia: Benary\'s Giant Salmon Rose',
      colors: 'apricot, pink, orange',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw2badb827/images/products/flowers/01362_01_benarys_giant_salmon_rose.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/zinnias/benarys-giant-series/benarys-giant-salmon-rose-zinnia-seed-1362.11.html'
    },
    {
      name: 'Phlox: Cherry Caramel',
      colors: 'cream, pink',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwf4a63469/images/products/flowers/01928_01_cherrycaramel.jpg?sw=387&cx=116&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/phlox/cherry-caramel-phlox-seed-1928.11.html'
    },
    {
      name: 'Sunflower: Strawberry Lemonade Mix',
      colors: 'yellow, red, black',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwa7d34599/images/products/flowers/03356_01_strawberry_lemonade_mix.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/sunflowers/tall-sunflowers/strawberry-lemonade-mix-f1-sunflower-seed-3356.11.html'
    },
    {
      name: 'Zinnia: Benary\'s Giant Coral ',
      colors: 'pink, coral',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw330b92f3/images/products/flowers/01366_01_benarys_giant_coral.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/zinnias/benarys-giant-series/benarys-giant-coral-zinnia-seed-1366.11.html'
    },
    {
      name: 'Coneflower: Echinacea purpurea',
      colors: 'pink, purple',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw59632a7f/images/products/flowers/00842_01_purple.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'August, September, October',
     infoLink: 'https://www.johnnyseeds.com/herbs/echinacea-coneflower/echinacea-purpurea-echinacea-seed-842.11.html'
    },
    {
      name: 'Scabiosa: Fire King ',
      colors: 'red',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw6810bd83/images/products/flowers/3715_01_fireking.jpg?sw=387&cx=300&cy=38&cw=1104&ch=1104',
    bloomMonths: 'July, August, September',
    infoLink: 'https://www.johnnyseeds.com/flowers/scabiosa-pincushion-flower/fire-king-scabiosa-seed-3715.11.html'
    },
    {
      name: 'Zinnia Senora ',
      colors: 'pink, salmon',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwe2c0cd8c/images/products/flowers/03310_01_senora.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/zinnias/senora-zinnia-seed-3310.11.html'
    },
    {
      name: 'Zinnia Benary\'s Giant Carmine Rose ',
      colors: 'pink',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw3a5933ad/images/products/flowers/01363_01_benarys_giant_carmine_rose.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/zinnias/benarys-giant-series/benarys-giant-carmine-rose-zinnia-seed-1363.11.html'
    },
    {
      name: 'Cosmos Double Click Snow Puff ',
      colors: 'white, blush',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw178f3462/images/products/flowers/03731_01_doubleclicksnowpuff.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/cosmos/double-click-snow-puff-cosmos-seed-3731.11.html'
    },
    {
      name: 'Columbine Barlow Mix ',
      colors: 'rose, black, purple, violet, red, white',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwe791f245/images/products/flowers/01119_01_barlow_mix.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September', 
    infoLink: 'https://www.johnnyseeds.com/flowers/columbine/barlow-mix-columbine-seed-1119.11.html'
    },
    {
      name: 'Rudbeckia Cherry Brandy ',
      colors: 'red',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw6749e584/images/products/flowers/01865_02_cherrybrandy.jpg?sw=387&cx=318&cy=98&cw=1054&ch=1054',
    bloomMonths: 'August, September, October',
        infoLink: 'https://www.johnnyseeds.com/flowers/rudbeckia-black-eyed-susan/cherry-brandy-rudbeckia-seed-1865.11.html'
    },
      {
      name: 'Celosia Pampas Plume ',
      colors: 'yellow, pink, red, orange, cream',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw5375c406/images/products/flowers/01203_01_pampusplumehorz.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/celosia/pampas-plume-celosia-seed-1203.11.html'
    },
      {
      name: 'Cosmos Double Click Bicolor Pink',
      colors: 'pink, white, purple',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw021c2b3c/images/products/flowers/01960_02_doubleclickbicolorpink.jpg?sw=387&cx=282&cy=72&cw=1034&ch=1034',
    bloomMonths: 'July, August, September, October', 
    infoLink: 'https://www.johnnyseeds.com/flowers/cosmos/double-click-bicolor-pink-cosmos-seed-1960.11.html'
    },
     {
      name: 'Didiscus Lacy Lavender Blue ',
      colors: 'blue',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwf1c8cb27/images/products/flowers/03780_01_lacylavenderblue.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October', 
        infoLink: 'https://www.johnnyseeds.com/flowers/didiscus/lacy-lavender-blue-didiscus-seed-3780.11.html'
    },
      {
      name: 'China Aster Tower Chamois ',
      colors: 'pink, blush',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw545f2e41/images/products/flowers/03758_01_towerchamois.jpg?sw=387&cx=360&cy=42&cw=1000&ch=1000',
    bloomMonths: 'July, August, September, October',
        infoLink: 'https://www.johnnyseeds.com/flowers/aster/tower-chamois-china-aster-seed-3758.11.html'
    },
    {
      name: 'Snapdragon Potomac Appleblossom  ',
      colors: 'pink, white, green',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw98e7fd7d/images/products/flowers/1945_01_potomac_appleblossom.jpg?sw=387&cx=388&cy=46&cw=1016&ch=1016',
    bloomMonths: 'June, July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/snapdragon/potomac-appleblossom-f1-snapdragon-seed-1945.11.html'
    },
    {
      name: 'Snapdragon Costa Apricot ',
      colors: 'yellow, orange, apricot, green',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw46278165/images/products/flowers/03442_01_costa_apricot.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'June, July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/snapdragon/costa-apricot-f1-snapdragon-seed-3442.11.html'
    },
    {
      name: 'Cosmos Rubenza ',
      colors: 'red, pink',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwa55ece4c/images/products/flowers/03438_01_rubenza.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October',
    infoLink: 'https://www.johnnyseeds.com/flowers/cosmos/rubenza-cosmos-seed-3438.11.html'
    },
    {
      name: 'China Aster Lady Coral Lavender ',
      colors: 'lavendar, purple',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw2c86e773/images/products/flowers/03499_01_lady_coral_lavender.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October', 
    infoLink: 'https://www.johnnyseeds.com/flowers/aster/lady-coral-lavender-china-aster-seed-3499.11.html'
    },
    {
      name: 'Ageratum Timeless Mix',
      colors: 'red, pink, blue, white',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwaefb579d/images/products/flowers/03432_01_timeless_mix.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'June, July, August, September', 
    infoLink: 'https://www.johnnyseeds.com/flowers/ageratum/timeless-mix-ageratum-seed-3432.11.html'
    },
    {
      name: 'Cosmos Xsenia ',
      colors: 'red, pink',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwdfb51a1a/images/products/flowers/03450_01_xsenia.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October', 
    infoLink: 'https://www.johnnyseeds.com/flowers/cosmos/xsenia-cosmos-seed-3450.11.html'
    },
    {
      name: 'Snapdragon Johnny\'s Potomac Custom Mix ',
      colors: 'red, pink, cream, green, yellow, orange, purple, lavendar',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw4f2434a2/images/products/flowers/01940_01_johnnyspotomaccustmix.jpg?sw=387&cx=364&cy=76&cw=1000&ch=1000',
    bloomMonths: 'June, July, August, September, October', 
    infoLink: 'https://www.johnnyseeds.com/flowers/snapdragon/johnnys-potomac-custom-mix-f1-snapdragon-seed-1940.11.html'
    },
    {
      name: 'Snapdragon Madame Butterfly Mix ',
      colors: 'orange, white, red, pink, yellow',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw126db6a6/images/products/flowers/01930_02_madamebutterfly.jpg?sw=387&cx=0&cy=0&cw=1196&ch=1196',
    bloomMonths: 'June, July, August, September, October', 
    infoLink: 'https://www.johnnyseeds.com/flowers/snapdragon/madame-butterfly-mix-f1-snapdragon-seed-1930.11.html'
    },
    {
      name: 'Bells of Ireland',
      colors: 'green',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw8c823ab2/images/products/flowers/01028_01_bellsofireland.jpg?sw=387&cx=232&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September',
    infoLink: 'https://www.johnnyseeds.com/flowers/bells-of-ireland/bells-of-ireland-flower-seed-1028.11.html'
    },
    {
      name: 'Narcissus Replete',
      colors: 'orange, pink, salmon',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Floret_Daffodil_Replete-2_768x.jpg?v=1569522138',
    bloomMonths: 'March, April', 
    info: 'https://shop.floretflowers.com/products/narcissus-replete'
    },
    {
      name: 'Narcissus White Lion',
      colors: 'cream, white, yellow',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/White_Lion_Narcissus-5763_768x.jpg?v=1569526234',
    bloomMonths: 'March, April',
    infoLink: 'https://shop.floretflowers.com/products/narcissus-white-lion'
    },
    {
      name: 'Narcissus Petit Four',
      colors: 'pink, blush, apricot',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Floret_Daffodil_Petit_Four-6_768x.jpg?v=1569520215',
    bloomMonths: 'March, April', 
    infoLink: 'https://shop.floretflowers.com/products/narcissus-petit-four'
    },
    
    {
      name: 'Narcissus Delnashaugh',
      colors: 'white, cream, pink, blush, apricot',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Delnahaugh_Floret-2_768x.jpg?v=1569517440',
    bloomMonths: 'March, April', 
    infoLink: 'https://shop.floretflowers.com/products/narcissus-delnashaugh'
    },
    {
      name: 'Narcissus Acropolis',
      colors: 'white, yellow, orange',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Acropolis_Narcissus-6134_768x.jpg?v=1569515938',
    bloomMonths: 'March, April', 
    infoLink: 'https://shop.floretflowers.com/products/narcissus-acropolis'
    }, 
    {
      name: 'Foxglove Dalmatian Peach',
      colors: 'apricot, pink, blush',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Floret_Foxglove_Dalmation-Peach_IMG_1003_768x.jpg?v=1500594403',
    bloomMonths: 'June, July, August, September, October', 
    infoLink: 'https://shop.floretflowers.com/products/foxglove-dalmation-peach'
    },
    {
      name: 'Snapdragon Madame Butterfly Bronze',
      colors: 'apricot, orange, pink',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Floret_Snapdragon_Madame-Bronze_IMG_3476_768x.jpg?v=1514410959',
    bloomMonths: 'June, July, August, September, October',
    infoLink: 'https://shop.floretflowers.com/products/snapdragon-madame-butterfly-bronze'
    },
    {
      name: 'Clary Sage Clary Mix',
      colors: 'white, purple, pink',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Clary_Sage_Virdis_Clary_Mix_Floret-1_768x.jpg?v=1514407324',
    bloomMonths: 'June, July, August, September, October', 
    infoLink: 'https://shop.floretflowers.com/products/clary-sage-clary-mix'
    },
    {
      name: 'Malope Queen Pink',
      colors: 'purple, pink, green',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Malope_Queen_Pink_Floret-2_768x.jpg?v=1546524491',
    bloomMonths: 'June, July, August', 
    infoLink: 'https://shop.floretflowers.com/products/malope-queen-pink?_pos=1&_sid=235724a91&_ss=r'
    }, 
     {
      name: 'Narcissus Pink Wonder',
      colors: 'cream, apricot, orange, yellow',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Pink_Wonder_Narcissus-5372_768x.jpg?v=1569521145',
    bloomMonths: 'March, April', 
    infoLink: 'https://shop.floretflowers.com/products/narcissus-pink-wonder?_pos=3&_sid=46d2132ef&_ss=r'
    }, 
     {
      name: 'Narcissus Sorbet',
      colors: 'cream, white, yellow, orange',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Sorbet_Narcissus-5991_768x.jpg?v=1569525808',
    bloomMonths: 'March, April', 
    infoLink: 'https://shop.floretflowers.com/products/narcissus-sorbet?_pos=1&_sid=9e18500dc&_ss=r'
    }, 
    {
      name: 'Narcissus Spring Sunshine',
      colors: 'cream, yellow, orange',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Narcissus_Spring_Sunshine-4_768x.jpg?v=1569525969',
    bloomMonths: 'March, April', 
    infoLink: 'https://shop.floretflowers.com/products/narcissus-spring-sunshine?_pos=1&_sid=f62ef4ee8&_ss=r'
    }, 
    {
      name: 'Narcissus Slice of Life',
      colors: 'yellow, orange',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Slice_of_Life_Narcissus-5850_768x.jpg?v=1569524869',
    bloomMonths: 'March, April', 
    infoLink: 'https://shop.floretflowers.com/products/narcissus-slice-of-life?_pos=1&_sid=fdec7bba1&_ss=r'
    }, 
    {
      name: 'Dutch Master Trumpet Daffodil',
      colors: 'yellow',
      imageUrl: 'https://www.bloomingbulb.com/images/Product/medium/49355.jpg',
    bloomMonths: 'March', 
    infoLink: 'https://www.bloomingbulb.com/p-49355-dutch-master-trumpet-daffodil-10-bulbs.aspx'
    }, 
    {
      name: 'Ice Follies Daffodil',
      colors: 'white, cream, yellow',
      imageUrl: 'https://images.hollandbulbfarms.com/mmHBF/Images/370X480/19634.jpg',
    bloomMonths: 'March, April', 
    infoLink: 'https://www.hollandbulbfarms.com/fall-planting-bulbs/daffodils/large-cupped-daffodils/ice-follies-daffodil-2398?feed=Froogle&_vsrefdom=adwords&gclid=Cj0KCQiA2ITuBRDkARIsAMK9Q7MM-NBQYKIneKwq-CscaEM1aENGpR_BvJV6-SOZ32z6ZiH9leAkfmAaAu7hEALw_wcB'
    }, 
    {
      name: 'Narcissus Pink Pride',
      colors: 'white, cream, apricot, pink',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-68.jpg',
    bloomMonths: 'March, April', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Narcissus-Pink-Pride'
    }, 
    {
      name: 'Narcissus Trumpet Mix',
      colors: 'yellow, white, orange, pink, cream, apricot',
      imageUrl: 'https://www.americanmeadows.com/media/catalog/product/n/a/narcissus-trumpet-daffodil-mix.jpg?width=700&height=700&canvas=700:700&quality=80&bg-color=255,255,255&fit=bounds',
    bloomMonths: 'March, April', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Narcissus-Trumpet-Mix-LandscapeSize'
    }, 
    {
      name: 'Hyacinth Shades of Blue',
      colors: 'blue, violet, lavendar',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-783.jpg',
    bloomMonths: 'March, April', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Hyacinth-Shades-Of-Blue'
    }, 
    {
      name: 'Hyacinth Fierce Mix',
      colors: 'pink, purple, lavendar, violet',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA5-1697.jpg',
    bloomMonths: 'March, April', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Hyacinth-Fierce-Mix'
    }, 
    
    {
      name: 'Hyacinth Jan Bos',
      colors: 'pink',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-53.jpg',
    bloomMonths: 'March, April', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Hyacinth-Jan-Bos'
    }, 
    {
      name: 'Tulip Purple Flag',
      colors: 'purple',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-774.jpg',
    bloomMonths: 'April, May', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Tulip-Purple-Flag'
    }, 
    {
      name: 'Bearded Iris Harvest of Memories',
      colors: 'yellow',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-2374.jpg',
    bloomMonths: 'May, June, September, October', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Iris-Bearded-Harvest-of-Memories'
    }, 
    {
      name: 'Bearded Iris Victoria Falls',
      colors: 'blue, lavendar',
      imageUrl: 'https://garden.org/pics/2010-12-30/MShadow/dcec5d-300.jpg',
    bloomMonths: 'May, June, September, October', 
    infoLink: 'https://garden.org/plants/view/73523/Tall-Bearded-Iris-Iris-Victoria-Falls/'
    }, 
    {
      name: 'Leucojum',
      colors: 'white, green',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA5-748.jpg',
    bloomMonths: 'May, June', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Leucojum-Gravetye-Giant'
    }, 
    {
      name: 'Muscari Assorted Mix',
      colors: 'white, blue, purple, lavendar',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-62.jpg',
    bloomMonths: 'April, May', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Muscari-Assorted'
    }, 
    {
      name: 'Gladiolus Sorbet Blend',
      colors: 'pink, blush, white, purple, red',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-393.jpg',
    bloomMonths: 'June, July, August', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Gladiolus-Sorbet-Blend'
    }, 
    {
      name: 'Gladiolus Sunshine',
      colors: 'apricot, orange',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-1759.jpg',
    bloomMonths: 'June, July, August', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Gladiolus-Sunshine'
    }, 
    {
      name: 'Tulip Darwin Hybrid Mystic Van Eijk',
      colors: 'pink, blush, apricot',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-1690.jpg',
    bloomMonths: 'April, May', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Tulip-Mystic-Van-Eyjk'
    }, 
    {
      name: 'Tulip White Emperor',
      colors: 'white, green',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA2-243.jpg',
    bloomMonths: 'March, April', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Tulip-White%20Emperor'
    }, 
    {
      name: 'Tulip Triumph Purple Lady',
      colors: 'purple, black',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-775.jpg',
    bloomMonths: 'April, May', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Tulip-Purple-Lady'
    }, 
    {
      name: 'Tulip Double Early Foxtrot',
      colors: 'white, pink, cream',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-104.jpg',
    bloomMonths: 'March, April', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Tulip-Foxtrot'
    }, 
    {
      name: 'Tulip Aveyron',
      colors: 'pink',
      imageUrl: 'https://www.vanengelen.com/media/catalog/product/cache/1/thumbnail/0dc2d03fe217f8c83829496872af24a0/t/_/t_aveyron_a.jpg',
    bloomMonths: 'April, May', 
    infoLink: 'https://www.vanengelen.com/tulip-aveyron.html'
    }, 
    {
      name: 'Tulip Triumph Involve',
      colors: 'pink',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-1911.jpg',
    bloomMonths: 'April, May', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Tulip-Triumph-Involve'
    }, 
    {
      name: 'Tulip Triumph Del Piero',
      colors: 'pink, white cream, purple',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-2028.jpg',
    bloomMonths: 'April, May', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Tulip-Del-Piero'
    }, 
    {
      name: 'Tulip Darwin Hybrid Daydream',
      colors: 'yellow, orange, apricot',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA2-132.jpg',
    bloomMonths: 'April, May', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Tulip-Daydream'
    }, 
    {
      name: 'Iris Eternal Bliss',
      colors: 'white, blush, cream',
      imageUrl: 'https://www.gilberthwild.com/images/Iris%20Eternal%20Bliss.jpg',
    bloomMonths: 'May, June, September, October', 
    infoLink: 'https://www.gilberthwild.com/prodinfo.asp?number=I-ETER'
    }, 
    {
      name: 'Iris October Splendor',
      colors: 'pink, blush, apricot',
      imageUrl: 'https://www.gilberthwild.com/images/Iris%20October%20Splendor.jpg',
    bloomMonths: 'April, May, September, October', 
    infoLink: 'https://www.gilberthwild.com/images/Iris%20October%20Splendor.jpg'
    }, 
    {
      name: 'Iris Sugar Blues',
      colors: 'blue, lavendar',
      imageUrl: 'https://www.gilberthwild.com/images/Iris%20Sugar%20Blues.jpg',
    bloomMonths: 'April, May, September, October', 
    infoLink: 'https://www.gilberthwild.com/prodinfo.asp?number=I-SUG'
    }, 
    {
      name: 'Poppy Mrs. Perry',
      colors: 'pink, blush, black',
      imageUrl: 'https://www.gilberthwild.com/images/Per%20Mrs.%20Perry.jpg',
    bloomMonths: 'April', 
    infoLink: 'https://www.gilberthwild.com/images/Per%20Mrs.%20Perry.jpg'
    }, 
     {
      name: 'Salvia',
      colors: 'blue, purple',
      imageUrl: 'https://wgi-img.s3.amazonaws.com/VarietyImage/4826c5ce66fd0e51e8fb1e2f91db3484.jpg',
    bloomMonths: 'July, August, September', 
    infoLink: 'https://www.waltersgardens.com/variety.php?ID=SALMM'
    },  {
      name: 'Lily Arbatax',
      colors: 'pink',
      imageUrl: 'https://i.pinimg.com/originals/2b/b9/9e/2bb99e20aad25ad2fd8d7dd0ded21c4f.jpg',
    bloomMonths: 'July, August', 
    infoLink: 'https://i.pinimg.com/originals/2b/b9/9e/2bb99e20aad25ad2fd8d7dd0ded21c4f.jpg'
    },  {
      name: 'Pink Magic Lily',
      colors: 'pink, blush, white',
      imageUrl: 'https://www.hollandbulbfarms.com/Shared/Images/Product/Lycoris-Squamigera/87111-lycoris-squamigera.jpg',
    bloomMonths: 'August', 
    infoLink: 'https://www.hollandbulbfarms.com/lycoris-squamigera.aspx'
    },  {
      name: 'Lily Bright Diamond',
      colors: 'white, cream, green',
      imageUrl: 'https://images.tulipworld.com/mmTW/Images/450X450/27194.jpg',
    bloomMonths: 'July', 
    infoLink: 'http://www.tulipworld.com/Spring-Planted-Bulbs/Lilies/Asiatic-Lilies/Bright-Diamond-LA-Lily.aspx'
    },  {
      name: 'Peony Red Magic',
      colors: 'red',
      imageUrl: 'https://www.americanmeadows.com/media/catalog/product/p/e/peony-red-magic-shutterstock-367091501-cropped.jpg?width=700&height=700&canvas=700:700&quality=80&bg-color=255,255,255&fit=bounds',
    bloomMonths: 'May, June', 
    infoLink: 'https://www.americanmeadows.com/perennials/peony/peony-red-magic?adpos=1o1&scid=scplp2622&sc_intid=2622&gclid=Cj0KCQiA2ITuBRDkARIsAMK9Q7Oc18JkAdNHDsEBHItvOGxxZ2nkkO3o9AfZU4gNHjzBAFPHwZqerjsaAgjmEALw_wcB'
    }, 
     {
      name: 'Peony Sarah Bernhardt',
      colors: 'pink, blush',
      imageUrl: 'https://www.americanmeadows.com/media/catalog/product/p/e/peonies-pink-shutterstock-463922750-cropped_1_2.jpg',
    bloomMonths: 'May, June', 
    infoLink: 'https://www.americanmeadows.com/perennials/peony/peony-sarah-bernhardt'
    }, 
     {
      name: 'Peony Shirley Temple',
      colors: 'white',
      imageUrl: 'https://www.americanmeadows.com/media/catalog/product/p/e/peony-shirley-temple_1.jpg?width=700&height=700&canvas=700:700&quality=80&bg-color=255,255,255&fit=bounds',
    bloomMonths: 'May, June', 
    infoLink: 'https://www.americanmeadows.com/perennials/peony/peony-shirley-temple'
    }, 
     {
      name: 'Peony Karl Roesnfield',
      colors: 'red, pink',
      imageUrl: 'https://www.americanmeadows.com/media/catalog/product/p/a/paeonia-karl-rosenfield-peony-visi34378-cropped.jpg?width=683&height=683&canvas=683:683&quality=80&bg-color=255,255,255&fit=bounds',
    bloomMonths: 'May, June', 
    infoLink: 'https://www.americanmeadows.com/perennials/peony/peony-karl-rosenfield'
    }, 
     {
      name: 'Peony Coral Charm',
      colors: 'pink, blush, apricot',
      imageUrl: 'https://primrosehallpeonies.co.uk/wp-content/uploads/2018/09/Paeonia_Coral-Charm.jpg',
    bloomMonths: 'May, June', 
    infoLink: 'https://primrosehallpeonies.co.uk/product/paeonia-lactiflora-coral-charm-peony-coral-charm/'
    }, 
    {
      name: 'Peony Kansas',
      colors: 'pink',
      imageUrl: 'http://www.tulipworld.com/Shared/Images/Product/Kansas-Peony/36106-kanas-peony.jpg',
    bloomMonths: 'May, June', 
    infoLink: 'http://www.tulipworld.com/Shared/Images/Product/Kansas-Peony/36106-kanas-peony.jpg'
    }, 
    {
      name: 'Peony Monsieur Jules Elie',
      colors: 'pink, lavendar',
      imageUrl: 'https://cdn.shopify.com/s/files/1/1419/7120/products/Peony_Monsieur_Jules_Elie.SHUT_1024x.jpg?v=1571439569',
    bloomMonths: 'May, June', 
    infoLink: 'https://www.easytogrowbulbs.com/collections/climate-zone-7/products/peony-monsieur-jules-elie?variant=42687518604'
    }, 
     {
      name: 'Lily Distant Drum',
      colors: 'white, pink',
      imageUrl: 'https://lambley.com.au/sites/default/files/styles/plant_entry_node/public/plant_entry_photos/lilium_distant_drum.jpg?itok=IN6lAl4F',
    bloomMonths: 'July', 
    infoLink: 'https://lambley.com.au/plant/lilium-distant-drum'
    }, 
     {
      name: 'Lily Playtime',
      colors: 'yellow, white, pink, green',
      imageUrl: 'https://www.longfield-gardens.com/_ccLib/image/plants/DETA-1758.jpg',
    bloomMonths: 'July', 
    infoLink: 'https://www.longfield-gardens.com/plantname/Lily-Playtime'
    }, 
     {
      name: 'Lily Polar Star',
      colors: 'white, cream, green',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0034/6554/3793/products/polar_star_1024x1024@2x.png?v=1540767229',
    bloomMonths: 'July, August', 
    infoLink: 'https://lilypadbulbs.com/products/polar-star-double-oriental-lily'
    }, 
     {
      name: 'Lily Rio Negro',
      colors: 'red, white',
      imageUrl: 'https://sep.yimg.com/ay/yhst-132933198139682/rio-negro-oriental-lily-3-bulbs-6.jpg',
    bloomMonths: 'July', 
    infoLink: 'https://www.bulbsnblooms.com/rio-negro-oriental-lily--3-bulb3.html'
    }, 
     {
      name: 'Peony Kansas',
      colors: 'pink',
      imageUrl: 'https://www.americanmeadows.com/media/catalog/product/c/o/coral-sunset_peony_visi115645_800x800_1.jpg?width=700&height=700&canvas=700:700&quality=80&bg-color=255,255,255&fit=bounds',
    bloomMonths: 'May, June', 
    infoLink: 'https://www.americanmeadows.com/perennials/peony/peony-coral-sunset?adpos=1o5&scid=scplp4974&sc_intid=4974&gclid=Cj0KCQiA2ITuBRDkARIsAMK9Q7M8YfI15FaME4xSV5F7fkVo9XNF6u6lFmyItbr4lyMa7K-zgsX0rJAaAgD_EALw_wcB'
    }, 
     {
      name: 'Peony Allen P McConnell',
      colors: 'pink, white, blush',
      imageUrl: 'http://www.peonysenvy.biz/art/new_herb/allenmcconnell_0986.jpg',
    bloomMonths: 'May, June', 
    infoLink: 'http://www.peonysenvy.biz/e_allenpmcconnell.html'
    }, 
     {
      name: 'Veronica Wizard of Ahhs',
      colors: 'blue, violet',
      imageUrl: 'https://wgi-img.s3.amazonaws.com/VarietyImage/afa96915b9aeb572c9656eb8daad70e8.jpg',
      bloomMonths: 'July, August, September', 
      infoLink: 'waltersgardens.com/variety.php?ID=VERWA'
    }, 
       
     {
      name: 'Lily Soft Music',
      colors: 'lavendar, pink, white, cream',
      imageUrl: 'https://lilyflowerstore.com/wp-content/uploads/2016/02/Soft-Music-510x383.jpg',
    bloomMonths: 'July', 
    infoLink: 'https://lilyflowerstore.com/product/soft-music-double-rose-oriental-lily-bulb/'
    } 
    
    
];
function compare(a, b) {
  //console.log("in compare a: " + a +" b: " +  b);
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  
  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});



router.get('/getflowers', function(req, res, next) {
  //console.log("in get flower route")

  //console.log("All FLowers: " + flowers);
  var filteredFlowers = flowers.filter(function(flower) {
    //console.log("query: " + req.query.color);
   // console.log("flower colors " + flower.colors + " flower bloomtime: " + flower.bloomMonths);
    if(flower.colors.search(req.query.color)>=0 && flower.bloomMonths.search(req.query.month)>=0  && flower.name.search(req.query.variety)>=0)
      return true;
  });
  //console.log("Filtered FLowers: " + filteredFlowers);
  filteredFlowers.sort(compare);
 // console.log("Filtered FLowers: " + filteredFlowers);
  res.status(200).json(filteredFlowers);

});

module.exports = router;
