const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');



// express app
const app = express();

//connection to mongodb
const dbURI = 'mongodb+srv://Ichigo:shinigami@nodemodules.v1dki.mongodb.net/nodeModules?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewURLParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));



//register view engine
app.set('view engine', 'ejs');



// listen for requests




//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan ('dev')); 

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
});

blog.save()
.then((result) => {
    res.send(result)
})
.catch((err) => {
    console.log(err);
});
})
  
app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})
  
app.get('/single-blog', (req, res) => {
    Blog.findById('628aa3fd869c27b3b65f5c10')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/',(req, res) => {
    res.redirect('/blogs');
   /* const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];*/
    
    

//res.send('<p>home page</p>');
res.render('index', { title: 'Home', blogs});
});

app.get('/about',(req, res) => {

//res.send('<p>about page</p>');
res.render('about', { title: 'About' });
});


//blog routes
app.use('/blogs', blogRoutes);

//404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });

});
