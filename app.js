const express = require('express');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb+srv://test:test@cluster0.mqg5o.mongodb.net/todo-app?retryWrites=true&w=majority', {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.get('/', async (req,res) => {

    const articles = await Article.find().sort({ 
        createdAt: 'desc' 
     });
    // const articles = [{
    //     title: 'Test Article',
    //     createdAt: new Date(),
    //     description: 'Test description'
    // },
    // {
    //     title: 'Test Article 2',
    //     createdAt: new Date(),
    //     description: 'Test description 2'
    // }];

    res.render('articles/index', { articles: articles }); 
});


app.use('/articles', articleRouter);

app.listen(4000);
console.log('You are listening to port 4000');