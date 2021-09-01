//Dependencies
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Use api router
app.use('/api/db', require('./routes/api/index'));

//use html router
app.use('/', require('./routes/html/index'));


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + './index.html'))
// });

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname + './notes.html'))
// });

// Listener
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
