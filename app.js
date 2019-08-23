const express = require('express');
const json = require('./data.json');
const projects = json.projects;
// console.log(projects)
const app = express();
//Sets the view engin to pug
app.set('view engine', 'pug');
//Serves the static files in the public folder
app.use('/static', express.static('public'));

// An "index" route (/) to render the "Home" page with the locals set to data.projects
// app.use(json);
app.get('/', (req, res) => { 
    // res.locals = data.projects
    // res.send({ json })//displays all json data but can't parse..
    res.render('index');
});
// app.locals = data.projects;
//Sets the /about route and links it to the about.pug file
app.get('/about', (req, res) => { 
    res.render('about')
// next();
});

// Dynamic "project" routes (/project or /projects) based on the id of the project that render a customized version of the Pug project template to show off each project. Which means adding data, or "locals", as an object that contains data to be passed to the Pug template.
app.get('/project', (req, res) => {
    res.render('project')
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});