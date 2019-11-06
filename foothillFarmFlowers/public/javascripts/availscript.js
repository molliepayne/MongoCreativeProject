/*global moment*/
/*global Vue*/
/*global axios */


var app = new Vue({
  el: '#app',
  data: {
    flowers: [],
    color: "",
    loading: true,
    colors: ['red', 'blush', 'pink', 'black', 'lavendar', 'blue', 'purple', 'yellow', 'orange', 'apricot', 'white', 'cream', 'green'],
    months: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
    varieties: ['Ageratum', 'Basil', 'Celosia', 'China Aster', 'Clarkia', 'Clary Sage', 'Columbine', 'Coneflower', 'Cosmos', 'Dianthus', 'Didiscus', 'Daffodil', 'Foxglove', 'Gladiolus', 'Hyacinth', 'Iris', 'Leucojum', 'Lily', 'Muscari', 'Narcissus', 'Peony', 'Phlox', 'Poppy', 'Queen Anne', 'Rudbeckia', 'Salvia', 'Sabiosa', 'Snapdragon', 'Strawflower', 'Sunflower', 'Tulip', 'Yarrow', 'Zinnia'],
    Color: "Show All",
    ColorDrop: "Show All",
    Month: "Show All", 
    MonthDrop: "Show All",
    Variety: "Show All", 
    VarietyDrop: "Show All"

  },
  created() {
    //console.log("Created Color Drop: " + this.ColorDrop);
    this.getflowers();
    this.colors.sort();
    this.varieties.sort();

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
     
      var url = "http://foothillfarmflowers.com:3030/getflowers";
      console.log(url);
      try {
        let response = await axios.get(url);
        this.flowers = response.data;
        
        return true;
      }
      catch (error) {
        console.log(error);
      }
       
    },
    async getflowersColor(color) {
      // `this` points to the vm instance
      //console.log("In Get Flowers Color Color Drop: " + this.ColorDrop + " color: "+ color);
      if(color==="Show All")
        color="";
      if(color!="")
      {
        this.Color = color;
        this.ColorDrop = color;
      }
      else
      {
        //console.log("Chaning color drop...");
        this.Color = "Show All";
        this.ColorDrop = "Show All";
      }
      var month = "";
      if(this.MonthDrop != "Show All")
        month = this.MonthDrop;
       var variety = "";
      if(this.VarietyDrop != "Show All")
        variety = this.VarietyDrop;
      //console.log("get flowers Variet: " + variety);
      //console.log("Color Drop value: " + this.Color); 
      var url = "http://foothillfarmflowers.com:3030/getflowers?color=" + color + "&month=" + month+ "&variety=" + variety;
      console.log(url);
      try {
        let response = await axios.get(url);
        this.flowers = response.data;
        //console.log(this.flowers);
         //console.log("end Get Flowers Color Color Drop: " + this.ColorDrop + " color: "+ color);
        return true;
      }
      catch (error) {
        console.log(error);
      }
       
    },
     async getflowersMonth(month) {
      // `this` points to the vm instance
      //console.log("Color Drop: " + this.ColorDrop);
     
      if(month==="Show All")
        month="";
      if(month!="")
        this.Month = month;
      else
      {
        this.Month = "Show All";
        this.MonthDrop = "Show All";
      }
     var color = ""
      if(this.ColorDrop != "Show All")
        color = this.ColorDrop;
         var variety = "";
      if(this.VarietyDrop != "Show All")
        variety = this.VarietyDrop;
      //console.log("get flowers color: " + color);
      //console.log("Color Drop value: " + this.Color); 
      var url = "http://foothillfarmflowers.com:3030/getflowers?color=" + color + "&month=" + month+ "&variety=" + variety;
      console.log(url);
      try {
        let response = await axios.get(url);
        this.flowers = response.data;
        //console.log(this.flowers);
        //console.log("Color Drop: " + this.ColorDrop);
        return true;
      }
      catch (error) {
        console.log(error);
      }
       
    },
     async getflowersVariety(variety) {
      // `this` points to the vm instance
      //console.log("In Get Flowers Variety Drop: " + this.VarietyDrop + " color: "+ color);
      if(variety==="Show All")
        variety="";
      if(variety!="")
      {
        this.Variety = variety;
        this.VarietyDrop = variety;
      }
      else
      {
        //console.log("Chaning color drop...");
        this.Variety = "Show All";
        this.VarietyDrop = "Show All";
      }
      var month = ""
      if(this.MonthDrop != "Show All")
        month = this.MonthDrop;
     var color = ""
      if(this.ColorDrop != "Show All")
        color = this.ColorDrop;
      //console.log("get flowers color: " + color);
      //console.log("Color Drop value: " + this.Color); 
      var url = "http://foothillfarmflowers.com:3030/getflowers?color=" + color + "&month=" + month+ "&variety=" + variety;
      console.log(url);
      try {
        let response = await axios.get(url);
        this.flowers = response.data;
        //console.log(this.flowers);
         //console.log("end Get Flowers Color Color Drop: " + this.ColorDrop + " color: "+ color);
        return true;
      }
      catch (error) {
        console.log(error);
      }
       
    },



  }
});
