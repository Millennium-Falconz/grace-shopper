const { db } = require("./db");
//const PORT = process.env.PORT || 8080;
//for Heroku???
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
const app = require("./app");

const init = async () => {
  try {
    await db.sync();
    console.log("db synced");
    // start listening (and create a 'server' object representing our server)
    //app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
