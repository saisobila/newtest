const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express();
require("dotenv").config();
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json())


const mongoose = require("mongoose");

const connectDB = require("./connectMongo");

connectDB();

const itemSchema = {
  cat: String,
  Img1: String,
  Img2: String,
  Img3: String,
  Para1: String,
  Para2: String,
  Para3: String,
  Title: String,
};

const emailSchema = {
    email : String,
    connect : Boolean ,
    message : String
}


const Blog = mongoose.model('Blog', itemSchema);

const Email = mongoose.model('Email',emailSchema);


app.get('/', async (req, res) => {

    const { orderBy = 'name', sortBy = 'asc', keyword } = req.query
    let page = +req.query?.page

    if (!page || page <= 0) page = 1

    const skip = (page - 1)

    const query = {}

    if (keyword) query.name = { "$regex": keyword, "$options": "i" }

    try {
        const data = await Blog.find(query).skip(skip).sort({[orderBy]: sortBy})
        const totalItems = await Blog.countDocuments(query)
        return res.status(200).json({
            msg: 'Ok',
            data,
            totalItems,
            totalPages: Math.ceil(totalItems),
            currentPage: page
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
})



app.get('/art/:tit', async (req, res) => {
    try {
        const data = await Blog.find({
            $or:[{Title:req.params.tit}]
        })
        if (data) {
            return res.status(200).json({
                msg: 'Ok',
                data
            })
        }
        return res.status(404).json({
            msg: 'Not Found',
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
})


app.get('/:id', async (req, res) => {
    try {
        const data = await Blog.findById(req.params.id)

        if (data) {
            return res.status(200).json({
                msg: 'Ok',
                data
            })
        }

        return res.status(404).json({
            msg: 'Not Found',
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
})



app.get('/cat/:cat', async (req, res) => {
    try {
        const data = await Blog.find({
            $or:[{cat:req.params.cat}]
        })
        if (data) {
            return res.status(200).json({
                msg: 'Ok',
                data
            })
        }
        return res.status(404).json({
            msg: 'Not Found',
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
})

app.post('/subscribe',async (req, res)=> {
    
    try {
        const nemail = new Email({
            email : req.body.email,
            connect: false,
            message: req.body.message
        })
        console.log(nemail);
        console.log(req.body.email)
        const data = await nemail.save();
        return res.status(200).json({
            msg: 'Ok',
            data
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: error.message
            
        })
    }
})


const blog = new Blog({
    cat : "politics",
    Img1 : "https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg",
    Img2 : "https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg",
    Img3 : "https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg",
    Para1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    Para2: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    Para3: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    Title: "How to go deep into the  of ..?"
})

// const nblog = new Email({
//     email: "sudhakiransobila@gmail.com",
// })

//  nblog.save().then(console.log("saved"))
//  blog.save().then(console.log("added"));

Blog.createCollection().then(function (collection) {
    console.log('Collection is created!');
});

Email.createCollection().then(function (collection) {
    console.log('Collection is created!');
});

app.listen(5050, () => {
  console.log("Server is running on port " + 5050);
});
