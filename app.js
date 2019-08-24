const express = require('express');
const json = require('./data.json');
const projects = json.projects;
// console.log(jsonData)
const app = express();
//Sets the view engine to pug
app.set('view engine', 'pug');
//Serves the static files in the public folder
app.use('/static', express.static('public'));

// app.use((req, res, next) => {
//     const err = new Error('Something went wrong!')
//     err.status = 500;
//     next(err);
// });

// An "index" route (/) to render the "Home" page with the locals set to data.projects
// app.use(json);
app.get('/', (req, res) => { 
    res.render('index');
    app.locals = json.projects;
});
//Sets the /about route and links it to the about.pug file
app.get('/about', (req, res) => { 
    res.render('about')
});

// Dynamic "project" routes (/project or /projects) based on the id of the project that render a customized version of the Pug project template to show off each project. Which means adding data, or "locals", as an object that contains data to be passed to the Pug template.
app.get('/project/:id', (req, res) => {
    res.render('project', {project: projects})
    // app.locals = 'data.json'
});

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
    next(err);
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});