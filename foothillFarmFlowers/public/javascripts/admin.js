/*global moment*/
/*global Vue*/
/*global axios */


var app = new Vue({
  el: '#admin',
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
    flowerVariety: "", 
    findVariety: "", 
    isOpen: false,
    suggestions: [],  
    findItem: null,
    editAll: false,
    

  },
  created() {
    console.log("created");
    //console.log("Created Color Drop: " + this.ColorDrop);
   
    this.getflowers();
    //this.getvarieties();
    this.colors.sort();
    
    
  },
  computed: {
    


  },


  watch: {

  },
  methods: {
     onChange() {
      console.log("in on change");
      this.isOpen = true;
      this.suggestions = this.varieties.filter(variety => variety.toLowerCase().startsWith(this.findVariety.toLowerCase()));
      console.log("suggestions: " + this.suggestions);
    },
     setSuggestion(variety) {
        this.findVariety = variety;
        this.flowerVariety= variety;
        this.isOpen = false;
        console.log("variety found: " + this.findVariety)
      },  
    
     selectVariety(variety) {
      this.findVariety = "";
      this.findVariety = variety;
      this.flowerVariety = variety;
    },
    postDate: function(date) {


      return moment(date).format('MMMM Do YYYY');
    },
    
    postDateMin: function(date) {


      return moment(date).format('MMMM Do YYYY h:mm A');
    },
    async getflowers() {
       var month = "";
      if(this.MonthDrop != "Show All")
        month = this.MonthDrop;
      var variety = "";
      if(this.VarietyDrop != "Show All")
        variety = this.VarietyDrop;
      var color = "";
      if(this.ColorDrop != "Show All")
        color = this.ColorDrop;
      this.varieties.sort();
      var url = "http://www.foothillfarmflowers.com/flowers/getflowers?color=" + color + "&month=" + month+ "&variety=" + variety;
      //console.log(url);
      try {
        let response = await axios.get(url);
        //console.log("response: " + response.data);
        this.flowers = response.data;
        //console.log("get varieties");
        for(var i=0; i<response.data.length; i++)
        {
         //populate varieties dropdown based on current data 
          if(this.varieties.indexOf(response.data[i].variety)<0)
            this.varieties.push(response.data[i].variety);
          var curColors = response.data[i].colors.split(', ');
          for(var j = 0; j<curColors.length; j++)
          {
            let lowerCaseColor = curColors[j].toLowerCase();
            //console.log(lowerCaseColor);
            //console.log(this.colors);
            if(this.colors.indexOf(lowerCaseColor)<0 && lowerCaseColor!="")
              this.colors.push(lowerCaseColor);
          } 
        }
        this.setSuggestion("");
        this.onChange();
        this.colors.sort();
        this.varieties.sort();
        //console.log(this.varieties);
        return true;
      }
      catch (error) {
        console.log(error);
      }
       
    },
   
    async addFlower(){
      var url = "http://www.foothillfarmflowers.com/flowers/getflowers";
      console.log("adding flower: name: " + this.flowerName + 
        " colors: " + this.flowerColors +
        " imageUrl: " + this.imageUrl +
        " bloomMonths: " + this.bloomMonths + 
        " infoLink: " + this.infoLink +
        " variety: " + this.findVariety);
       try{axios.post(url, {
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
        if(this.varieties.indexOf(this.flowerVariety)<0 & this.flowerVariety!="")
          this.varieties.push(this.flowerVariety);
       //add color to colors array if it is new
        var curColors = this.flowerColors.split(', ');
          for(var j = 0; j<curColors.length; j++)
          {
            let lowerCaseColor = curColors[j].toLowerCase();
            //console.log(curColors[j]);
            //console.log(this.colors);
            if(this.colors.indexOf(lowerCaseColor<0) && lowerCaseColor!="")
              this.colors.push(lowerCaseColor);
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
       }
       catch(error)
       {
         console.log(error);
       }
    },
     async deleteItem(item) {
        var url = "http://www.foothillfarmflowers.com/flowers/getflowers/";
       console.log("delete Item: "+item._id)
      try {
        console.log("in try");
        let response = axios.delete(url + item._id);
        console.log("retunred response: " + response);
        this.getflowers();
        return true;
      } catch (error) {
        console.log(error);
      }
      
      
    },
    editAllFlowers(){
      this.editAll = true;
      for(let i=0; i<this.flowers.length; i++)
      {
        this.editItem(this.flowers[i]);
      }
      this.getflowers();
      this.editAll = false;
    },
      async editItem(item) {
        var url = "http://www.foothillfarmflowers.com/flowers/getflowers/";
      try {
        let response = axios.put(url + item._id, {
          name: item.name,
          colors: item.colors,
          imageUrl: item.imageUrl,
          bloomMonths: item.bloomMonths,
          infoLink: item.infoLink, 
          variety: item.variety
        });
        //this.findItem = null;
        if(!editAllFlowers)
          this.getflowers();
        return true;
      } catch (error) {
        console.log(error);
      }
    },


  }
});
