/*global moment*/
/*global Vue*/
/*global axios */


var app = new Vue({
  el: '#app',
  data: {
    flowers: [],
    color: "",
    loading: true,
    colors: [],
    months: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
    varieties: [],
    Color: "Show All",
    ColorDrop: "Show All",
    Month: "Show All", 
    MonthDrop: "Show All",
    Variety: "Show All", 
    VarietyDrop: "Show All",
    flowerName: "",
    flowerColors: "",
    imageUrl: "",
    bloomMonths: "",
    infoLink: "", 
    flowerVariety: ""
    

  },
  created() {
    //console.log("Created Color Drop: " + this.ColorDrop);
    this.getflowers();
   
  },
  computed: {



  },


  watch: {

  },
  methods: {
 
    postDate: function(date) {


      return moment(date).format('MMMM Do YYYY');
    },
    
    postDateMin: function(date) {


      return moment(date).format('MMMM Do YYYY h:mm A');
    },
     async getflowers() {
      var month = "";
      if (this.MonthDrop != "Show All")
        month = this.MonthDrop;
      var variety = "";
      if (this.VarietyDrop != "Show All")
        variety = this.VarietyDrop;
      var color = "";
      if (this.ColorDrop != "Show All")
        color = this.ColorDrop;
      this.varieties.sort();
      this.colors.sort();
      var url = "http://www.foothillfarmflowers.com/flowers/getflowers?color=" + color + "&month=" + month + "&variety=" + variety;
      console.log(url);
      try {
        let response = await axios.get(url);
        console.log("updating flowers");
        this.flowers = response.data;
        //add colors and varities to drop downs
        for (var i = 0; i < response.data.length; i++) {
          //populate varieties dropdown based on current data 
          if (this.varieties.indexOf(response.data[i].variety) < 0)
            this.varieties.push(response.data[i].variety);
          var curColors = response.data[i].colors.split(', ');
          for (var j = 0; j < curColors.length; j++) {
            let lowerCaseColor = curColors[j].toLowerCase();
            if (this.colors.indexOf(lowerCaseColor) < 0 && lowerCaseColor != "")
              this.colors.push(lowerCaseColor);
          }
        }
        this.setSuggestion("");
        this.onChange();
        this.colors.sort();
        this.varieties.sort();

        return true;
      }
      catch (error) {
        console.log(error);
      }

    },

    async addFlower() {
      var url = "http://www.foothillfarmflowers.com/flowers/getflowers";
      try {
        axios.post(url, {
            name: this.flowerName,
            colors: this.flowerColors,
            imageUrl: this.imageUrl,
            bloomMonths: this.bloomMonths,
            infoLink: this.infoLink,
            variety: this.findVariety
          })
          .then(response => {})
          .catch(e => {
            console.log(e);
          });
       
        //refresh page and reset input values
        this.getflowers();
        this.flowerName = '';
        this.flowerColors = '';
        this.imageUrl = '';
        this.bloomMonths = '';
        this.infoLink = '';
        this.flowerVariety = '';
      }
      catch (error) {
        console.log(error);
      }
    },
    
    
    
    async addFlower(){
      var url = "http://www.foothillfarmflowers.com/flowers/getflowers";
      console.log("adding flower");
      axios.post(url, {
        name: this.flowerName,
        colors: this.flowerColors,
        imageUrl: this.imageUrl,
        bloomMonths: this.bloomMonths,
        infoLink: this.infoLink, 
        variety: this.flowerVariety
      })
      .then(response => {})
        .catch(e => {
          console.log(e);
        });
        if(this.varieties.indexOf(this.flowerVariety)<0)
          this.varieties.push(this.flowerVariety);
       
        var curColors = this.flowerColors.split(', ');
          for(var j = 0; j<curColors.length; j++)
          {
            //console.log(curColors[j]);
            //console.log(this.colors);
            if(this.colors.indexOf(curColors[j])<0)
              this.colors.push(curColors[j]);
          } 
      //console.log("added: " + this.flowerVariety);
      //console.log(this.varieties);
      this.getflowers();
      this.flowerName = '';
      this.flowerColors = '';
      this.imageUrl = '';
      this.bloomMonths = '';
      this.infoLink = '';
      this.flowerVariety = '';
      
    },


  }
});
