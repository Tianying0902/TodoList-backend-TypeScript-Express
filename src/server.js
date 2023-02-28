const app = require("./api/app");
const port = 3333;
app.listen(port, () => {
  console.log(`server listening on port:${port}`);
});
