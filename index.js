const express = require("express");
const req = require("express/lib/request");
const uuid = require("uuid");
const port = 3000;
const app = express();
app.use(express.json());

const users = [];

const MyFisrtMiddleware = (request, response, next) => {
  const { id } = request.params
  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  request.UserIndex = index;
  request.UserId = id

  next();
};

app.get(`/users/`, (request, response) => {
  return response.json({ users });
});
app.post(`/users/`, (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);
  return response.status(201).json(user);
});
app.put(`/users/:id`, MyFisrtMiddleware, (request, response) => {
  const { name, age } = request.body;
  
  const index = request.UserIndex;

  const id = request.UserId;

  const UpdateUser = { id, name, age };


  users[index] = UpdateUser;

  return response.json({ UpdateUser });
});

app.delete(`/users/:id`, MyFisrtMiddleware, (request, response) => {
  const index = request.UserIndex;

  users.splice(index, 1);
  return response.status(204).json();
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
