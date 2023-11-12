const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const htmlRoutes = require("./htmlRoutes");
const apiRoutes = require("./apiRoutes");

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log('Server is listening on port ${port}');
});