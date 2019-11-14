var mongoose = require('mongoose');
var FlowerSchema = new mongoose.Schema({
    name: String,
    colors: String,
    imageUrl: String,
    bloomMonths: String,
    infoLink: String, 
    variety: String
});
mongoose.model('Flower', FlowerSchema);
