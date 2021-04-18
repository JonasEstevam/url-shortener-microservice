const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is up on port ${PORT}`);
});
