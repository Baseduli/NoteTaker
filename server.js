const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const apiRoutes = require("./routes/apiRoutes");
app.use('/api', apiRoutes);

const htmlRoutes = require("./routes/htmlRoutes");
app.use('/', htmlRoutes);



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});