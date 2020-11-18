const express = require("express");
const app = express();
const pool = require("./db");
const path = require("path");

//middlewares
app.use(require("cors")());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));
if (process.env.NODE_ENV !== "production") {
    app.use(require("morgan")("dev"));
}

//routes
// create notification
app.post("/api/create/", async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNoti = await pool.query(
            "INSERT INTO notification (title,content) VALUES($1,$2) RETURNING *",
            [title, content]
        );
        res.json(newNoti.rows[0]);
    } catch (error) {
        res.send({ error: error.message }).status(400);
    }
});

// get all notification
app.get("/api/", async (req, res) => {
    try {
        const notifications = await pool.query(
            "SELECT * FROM notification ORDER BY id DESC"
        );
        res.json(notifications.rows);
    } catch (error) {
        res.send({ error: error.message }).status(400);
    }
});

// get one notification
app.get("/api/:id/", async (req, res) => {
    try {
        const { id } = req.params;
        const notifications = await pool.query(
            "SELECT * FROM notification WHERE id = $1",
            [id]
        );
        res.json(notifications.rows[0]);
    } catch (error) {
        res.send({ error: error.message }).status(400);
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
