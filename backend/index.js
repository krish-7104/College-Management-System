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

// app.use("/api/auth", require("./routes/credential.route.js"));
// app.use(
//   "/api/student/details",
//   require("./routes/details/student-details.route.js")
// );
// app.use(
//   "/api/faculty/details",
//   require("./routes/details/faculty-details.route.js")
// );
// app.use(
//   "/api/admin/details",
//   require("./routes/details/admin-details.route.js")
// );
// Other Apis
// app.use("/api/timetable", require("./routes/timetable.route.js"));
// app.use("/api/material", require("./routes/material.route.js"));
// app.use("/api/notice", require("./routes/notice.route.js"));
// app.use("/api/subject", require("./routes/subject.route.js"));
// app.use("/api/marks", require("./routes/marks.route.js"));
app.use("/api/branch", require("./routes/branch.route.js"));

app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
