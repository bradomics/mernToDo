const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

mongoose.connect(env.MERN_TODO, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String
});

const User = mongoose.model("User", userSchema);


const tasksSchema = new mongoose.Schema({
    userId: mongoose.Schema.ObjectId,
    tasks: [
      {
        title: String,
        description: String,
        completeBy: Date,
        remindAt: Date,
        isCompleted: Boolean,
        id: String,
      },
    ],
});

const Tasks = mongoose.model('Tasks', tasksSchema);

app.post('/signUp', async (req, res) => {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (user) {
        res.status(501);
        res.json({
            message: "User already exists."
        });
    }
    await User.create({ email, name, password });
    res.json({
        message: "User created successfully."
    });
});

app.post("/signIn", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user || user.password !== password) {
      res.status(403);
      res.json({
        message: "Could not authenticate user.",
      });
      return;
    }
    res.json({
      message: "User authenticated.",
    });
});

app.post("/tasks", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [email, password] = token.split(":");
    const tasksItems = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user || user.password !== password) {
      res.status(403);
      res.json({
        message: "Unauthorized.",
      });
      return;
    }
    const tasks = await Tasks.findOne({ userId: user._id }).exec();
    if (!tasks) {
      await Tasks.create({
        userId: user._id,
        tasks: tasksItems,
      });
    } else {
      tasks.tasks = tasksItems;
      await tasks.save();
    }
    res.json(tasksItems);
});

app.delete("/tasks", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [email, password] = token.split(":");
    const taskId = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user || user.password !== password) {
      res.status(403);
      res.json({
        message: "Unauthorized.",
      });
      return;
    }
    const task = await Tasks.findOne({ id: taskId }).exec();
    if (!task) {
        res.status(404);
        res.json({
          message: "Task not found.",
        });
    } else {
    await Tasks.deleteOne({
        userId: user._id,
        id: task.id,
      });
    }
    res.json({
        message: "Task deleted."
    });
});
  

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
