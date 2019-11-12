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
    nextURL: '',
    //API Keys for Ambiant weather
    apiKey: '33cce24bfeb34c169fe0bb3afc0cbba5f649b08c6e5f44cfb4a779292f103eed',
    aplicationKey: 'fb7c164caf2847f886d8980050f410d464b94826691e43b795c60b2a0a7ad176',
    macAddress: '80:7D:3A:7C:51:A6',
    instagrams: [],
    moreInstagrams: [],
    weather: [],
    weatherHistory: [],
    loading: true,
    loadingNext: false,
    loadingWeather: true,
    
    show: 'all',

  },
  created() {
    this.weatherREST();
    this.instaREST();

  },
  computed: {
   
  },
    
mounted() {
  this.scroll();
},

  watch: {

  },
  methods: {
    
     nextInsta(){
         //console.log("hit bottom!");
           //console.log("in next instagram URL: " + this.nextURL);
           if(this.nextURL !='')
           {
            axios.get(this.nextURL)
        .then(response => {
          this.loadingNext = true;
          //console.log("Pagination url: " + response.data.pagination.next_url);
          if(response.data.pagination.next_url === undefined)
              this.nextURL = "";
          else
            this.nextURL = response.data.pagination.next_url;
          //console.log("instagrams: " + this.instagrams);
          //console.log("response data: " + response.data.data);
          var newArray = this.instagrams;
          Array.prototype.push.apply(newArray,response.data.data);
          //for some reason the infite scroll only updates if the array is set to empty first
          this.instagrams = [];
          this.instagrams = newArray;
          
         
          //console.log("INstagrams length:" + this.instagrams.length)
          //console.log("Instagrams: " + this.instagrams);
          this.loadingNext = false;
          return true;
        })
        .catch(error => {
          console.log(error)
        });}  
    },
    scroll(){
      window.onscroll = () => {
        var height = Math.max(
            document.body.scrollHeight, 
            document.body.clientHeight, 
            document.body.offsetHeight, 
            document.documentElement.scrollHeight, 
            document.documentElement.offsetHeight, 
            document.documentElement.clientHeight);
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === height;
       
        if(bottomOfWindow){
            this.nextInsta();
        } 
      
     }
     
    },
    
    instaREST() {
       //console.log("in instagram");
      /*axios.get('https://api.instagram.com/v1/users/' + this.userID + '/media/recent?access_token=' + this.accessToken )
        .then(response => {
          this.loading = true;
          this.instagrams = response.data.data;
          console.log("current instas: " + this.instagrams);
          console.log(this.instagrams.length);
          this.nextURL = response.data.pagination.next_url;
          
          //console.log(instagrams);
          console.log(this.nextURL);
          this.loading = false;
          return true;
        })
        .catch(error => {
          console.log(error)
        });*/
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
          console.log(instagrams.data)
          this.instagrams = instagrams.data;
          this.nextURL = instagrams.pagination.next_url;
          
          //console.log(instagrams);
          console.log(this.nextURL);
          this.loading = false;
          console.log("Got INstagrams");
          console.log(this.instagrams);
        });

    },
    weatherREST() {
      //run a proxy to get weather information
      //console.log("Weather REST: ");
      this.loadingWeather = true;
      var url = "/weather?apiKey=" + this.apiKey + "&applicationKey=" + this.aplicationKey;
      console.log("URL " + url);
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
       console.log("post date instagrams length:" + this.instagrams.length) ;
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
