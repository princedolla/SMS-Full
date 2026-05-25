const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/employee", require("./routes/employee"));
app.use("/department", require("./routes/department"));
app.use("/jobrole", require("./routes/jobrole"));
app.use("/report", require("./routes/report"));
// SERVER
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});
