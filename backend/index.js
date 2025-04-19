const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
const path = require("path");
connectToMongo();
const port = 4000 || process.env.PORT;
var cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_API_LINK,
  })
);

app.use(express.json()); //to convert request data to json

app.get("/", (req, res) => {
  res.send("Hello 👋 I am Working Fine 🚀");
});

app.use("/media", express.static(path.join(__dirname, "media")));

app.use("/api/admin", require("./routes/details/admin-details.route"));

app.use("/api/branch", require("./routes/branch.route"));
app.use("/api/subject", require("./routes/subject.route"));
app.use("/api/notice", require("./routes/notice.route"));

app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
