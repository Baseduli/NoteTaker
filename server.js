const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const htmlRoutes = require("./routes/htmlRoutes");
app.use('/', htmlRoutes);

const apiRoutes = require("./routes/apiRoutes");
app.use('/api', apiRoutes);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});