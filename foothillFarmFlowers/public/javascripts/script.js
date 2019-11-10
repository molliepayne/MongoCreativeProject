/*global moment*/
/*global Vue*/
/*global VueStarRating*/
/*global  BootstrapVue*/

Vue.component('star-rating', VueStarRating.default);
//Vue.component('b-button-group', BootstrapVue);
let app = new Vue({

  el: '#app',
  data: {
    //userID and access token for Instagram API
    userID: '16597939728',
    accessToken: '16597939728.1677ed0.3f7231da4a16483ea64cf829725edc5d',
    //API Keys for Ambiant weather
    apiKey: '33cce24bfeb34c169fe0bb3afc0cbba5f649b08c6e5f44cfb4a779292f103eed',
    aplicationKey: 'fb7c164caf2847f886d8980050f410d464b94826691e43b795c60b2a0a7ad176',
    macAddress: '80:7D:3A:7C:51:A6',
    instagrams: [],
    weather: [],
    weatherHistory: [],
    loading: true,
    loadingWeather: true,
    
    show: 'all',

  },
  created() {
    this.weatherREST();
    this.instaREST();

  },
  computed: {

    filteredInstas() {
     // console.log(this.instagrams);
     // console.log(this.show);
      if (this.show === 'withComments')
        return this.instagrams.filter(item => {
          //console.log(item.comments.count);
          return item.comments.count !== 0;
        });
      if (this.show === 'onFarm')
        return this.instagrams.filter(item => {
          if (item.location != null) {
            //console.log("location: '" + item.location.name + "'");
            return item.location.name === 'Provo, Utah';
          }
        });
      if (this.show === 'multipleImages')
        return this.instagrams.filter(item => {

          if (item.carousel_media != null) {
            //console.log("item: " + item.carousel_media);
            //console.log(item.carousel_media.length);
            return item.carousel_media.length !== 0;
          }
        });
      if (this.show === 'mostLiked')
        return this.instagrams.filter(item => {

          if (item.likes.count > 20) {
            //console.log("item: " + item.likes.count);

            return item.likes.count !== 0;
          }
        });
      return this.instagrams;
    },

  },


  watch: {

  },
  methods: {

    instaREST() {
      //run a proxy to get Instagram information
      //console.log("Insta REST: " + this.show);
      this.loading = true;
      var url = "/insta?UserID=" + this.userID + "&AccessToken=" + this.accessToken;
      //console.log("URL " + url);
      fetch(url)
        .then((data) => {
          return (data.json());
        })
        .then((instagrams) => {
          //console.log("instagrams: ");
          //console.log(instagrams);
          this.instagrams = instagrams.data;
          console.log(instagrams);
          this.loading = false;
          //console.log("Got INstagrams");
          //console.log(this.instagrams);
        });

    },
    weatherREST() {
      //run a proxy to get weather information
      //console.log("Weather REST: ");
      this.loadingWeather = true;
      var url = "/weather?apiKey=" + this.apiKey + "&applicationKey=" + this.aplicationKey;
      //console.log("URL " + url);
      fetch(url)
        .then((data) => {
          return (data.json());
        })
        .then((response) => {
          //console.log("response: ");
          //console.log(response);
          this.weather = response;

          this.loadingWeather = false;
         // console.log("Got Weather");
          //console.log(this.weather);
        });

    },
    postDate: function(date) {
      return moment(date).format('MMMM Do YYYY');
    },
    postDateMin: function(date) {


      return moment(date).format('MMMM Do YYYY h:mm A');
    },


    mostLiked() {
      //console.log("in top 10");
      this.show = 'mostLiked';
    },

    onTheFarm() {
      //console.log("on the farm");
      this.show = 'onFarm';
    },
    withComments() {
      //console.log("with comments");
      this.show = 'withComments';
    },
    multipleImages() {
      //console.log("multipleImages");
      this.show = 'multipleImages';
    },
    viewAll() {
      //console.log("viewAll");
      this.show = 'all';

    }


  }
});
