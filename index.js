//Initialize the express 'app' object
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

//DB initial code
let Datastore = require('nedb');
let db = new Datastore('comments.db');
db.loadDatabase();



// //Initialize the actual HTTP server
// let http = require('http');
// let server = http.createServer(app);
// let port = process.env.PORT || 3000;
// server.listen(port, () => {
//     console.log("Server listening at port: " + port);
// });


let commentsTracker = [];

// add a route on server, that is listening for a post request
app.post('/comments', (req, res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        comments: req.body.Text
    }
    //insert comments data into the database
    db.insert(obj,(err, newDocs)=>{
        if(err) {
            res.json({task: "task failed"});
        } else {
            res.json({task:"success"});
        }

    })

})

// search the folder called "public"，and then serves all the content in it
app.use('/', express.static('public'));

//add route to get all comments track information
app.get('/getcomments', (req,res)=> {

    db.find({}, (err, docs)=> {
        if(err) {
            res.json({task: "task failed"})
        } else {
            let obj = {data: docs};
            res.json(obj);
        }

    })

})

//listen at port 5000
let port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log('listening at ', port);
})