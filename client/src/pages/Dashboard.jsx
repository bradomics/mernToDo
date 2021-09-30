import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Link } from "react-router-dom";

import { AuthContext } from "../App";
import { Card, Container, ListGroup, Row, FormControl, Form, Button } from "react-bootstrap";
import NavBar from '../components/NavBar';

export default function Dashboard() {
  const [auth, setAuth] = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [todoText, setTaskText] = useState("");
  
  const logout = () => {
    setAuth(null);
  };

  useEffect(() => {
    fetch(`http://localhost:9000/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth.email}:${auth.password}`,
      },
    })
      .then((response) => response.json())
      .then((tasks) => setTasks(tasks));
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTask = { id: uuidv4(), checked: false, text: todoText };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setTaskText("");
    persist(newTasks);
  };

  const persist = (newTasks) => {
    fetch(`http://localhost:9000/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth.email}:${auth.password}`,
      },
      body: JSON.stringify(newTasks),
    }).then(() => {});
  };

  const deleteTask = (taskId) => {
    fetch(`http://localhost:9000/tasks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth.email}:${auth.password}`,
      },
      body: JSON.stringify(taskId),
    }).then(() => {});
  };

  const getTasks = () => {
    return tasks
  };

  return (
    <div>
        <NavBar/>
        <Container>
            <Row>
                <div className="col-sm-6 mx-auto">
                    <h2 className="mt-5">Dashboard</h2>
                    <Form onSubmit={addTask} className="mb-5">
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label className="float-start">New task</Form.Label>
                            <Form.Control autocomplete="off" onChange={(e) => setTaskText(e.target.value)} type="text" placeholder="Task:" value={todoText} />
                        </Form.Group>
                        <Button className="float-start" variant="primary" type="submit">
                            Add Task
                        </Button>
                    </Form>

                    <h3 className="mt-3">My Tasks</h3>
                    <Card>
                        <Card.Body>
                            <ListGroup>
                            {tasks.length > 0 ? getTasks().map((task) => (
                                <ListGroup.Item key={task.id}>
                                    {
                                        console.log('task -> ', task)
                                    }
                                <label>{task.text}</label>
                                &nbsp;
                                <input
                                    checked={task.isComplete}
                                    onChange={() => deleteTask(task.id)}
                                    type="checkbox"
                                />
                                </ListGroup.Item>
                            )) : <p>No open tasks!🎉</p>}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </Container>
    </div>
  );
}
