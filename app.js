const express = require('express');
const json = require('./data.json');
const projects = json.projects;
// console.log(jsonData)
const app = express();
//Sets the view engine to pug
app.set('view engine', 'pug');
//Serves the static files in the public folder
app.use('/static', express.static('public'));

// An "index" route (/) to render the "Home" page with the locals set to data.projects
app.get('/', (req, res) => { 
    res.render('index', {projects});
    res.locals = json.projects;
});
//Sets the /about route and links it to the about.pug file
app.get('/about', (req, res) => { 
    res.render('about')
});
// Add dynamic "project" routes based on the id of the project that render a customized version of the Pug project template to show off each project.
app.get('/project/:id', (req, res) => {
    const id = req.params.id
    const project = projects[id]
    res.render('project', {project})    
});
//Creates error object if the user direct to a page that doesn't exist
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404;
    next(err);
})
//Formats 404 error to be more readable 
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
    next(err);
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});