/*global moment*/
/*global Vue*/
/*global axios */


var app = new Vue({
  el: '#app',
  data: {
    firstName: "",
    lastName: "",
    emailAddress: "",
    submittedMessage: ""
    

  },
  created() {
    //console.log("Created Color Drop: " + this.ColorDrop);
   

  },
  computed: {



  },


  watch: {

  },
  methods: {
 
   
    async addPerson(){
      var url = "http://foothillfarmflowers.com:8080/mailingList";
      axios.post(url, {
        firstName: this.firstName,
        lastName: this.lastName,
        emailAddress: this.emailAddress
      })
      .then(response => {})
        .catch(e => {
          console.log(e);
        });
        
        this.submittedMessage = this.firstName + ", thank you for joining our email list! Emails will be sent to: " + this.emailAddress;
      this.firstName = '';
      this.lastName = '';
      this.emailAddress = '';
     
      
    },
   
  }
});
