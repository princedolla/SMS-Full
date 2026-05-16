const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/stockin", require("./routes/stockin"));
app.use("/api/stockout", require("./routes/stockout"));
app.use("/api/reports", require("./routes/reports"));

app.listen(process.env.PORT, () => {
  console.log(`Server Running On Port ${process.env.PORT}`);
});