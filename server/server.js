require("dotenv").config();
const app = require("./app");

app.listen(3002, "0.0.0.0", () => {
  console.log(`Server running on port 3002`);
});
