const express = require("express");
const path = require("path");
let gd = require("./getData");

const port = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.join(__dirname, "build")));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



let data = {};

gd.getData().then(function(res) {
  data = res;
});

setInterval(function() {
  gd.getData().then(function(res) {
    data = res;
  });
}, 3000);



app.get("/api/buses", function(req, res) {
  res.send(data);
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



app.listen(port, () => console.log("Server running on port " + port));
