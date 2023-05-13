
const express = require("express");
const cors = require("cors");
const app = express();

const controllers = require("./controllers");

app.use(cors());
app.use(express.json());

let port = process.env.PORT || 3000;

controllers.registerRoutes(app);

// production error handler
// no stacktraces leaked to user
app.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message);

 // logger.error(error);
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
