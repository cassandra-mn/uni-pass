import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
var PORT = +process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server is up and running on port ".concat(PORT));
});
