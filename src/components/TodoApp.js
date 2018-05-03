import React, { Component } from 'react';
import { Table, Checkbox, Button, Input } from 'semantic-ui-react';

import TodoItem from './TodoItem';


const headers = {'content-type': 'application/json'};

class TodoApp extends Component {

    state = {
        todos: [],
        newTodo: '',
    }

    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos = () => {
        fetch('/todos').then(data => data.json()).then(todos => this.setState({todos})).catch(err => console.log({ err }))
    }

    handleTodoClick(todo, index) {
        const { id, completed } = todo
        fetch(`/todos/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({completed: !completed})
        }).then(this.fetchTodos)
    }

    handleToggleAll = allToggled => {
        const { todos } = this.state
        Promise.all(todos.map(todo => fetch(`/todos/${todo.id}`,{
            method: 'PATCH',
            headers,
            body: JSON.stringify({completed: !allToggled})
        }))).then(this.fetchTodos)
    }

    handleInputChange = event => {
        const value = event.target.value
        this.setState({ newTodo: value })
    }

    handleNewTodoKeyDown = event => {
        if (this.state.todos.length >= 10) {
            return
        }
        if (event.keyCode !== 13) {
            return
        }
        event.preventDefault();

        const { newTodo } = this.state;
        const value = newTodo.trim();

        if (value) {
            fetch('/todos', {
                method: 'POST',
                headers,
                body: JSON.stringify({ title: value, completed: false, })
            }).then(this.fetchTodos).then(() => this.setState({newTodo: ''}))
        }
    }

    handleDelete = id => {
        fetch(`/todos/${id}`, { method: 'DELETE', headers, }).then(this.fetchTodos)
    }

    handleClearCompleted = () => {
        const { todos } = this.state
        const completedTodos = todos.filter(todo => todo.completed)

        Promise.all(completedTodos.map(todo => fetch(`/todos/${todo.id}`,{ method: 'DELETE', headers, }))).then(this.fetchTodos)
    }

    render() {
        const { todos, newTodo } = this.state;
        const allToggled = todos.every(todo => todo.completed);
        return (
            <div className="todo-container">
                <Input id="new-todo" className="new-todo" placeholder="What needs to be done?"
                    autoFocus
                    value={newTodo}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleNewTodoKeyDown} />
                <label htmlFor="new-todo" style={{ display: 'none' }}>New Todo</label>
                {todos.length === 0 ?
                    (<Table>
                        <Table.Body>
                            <Table.Row>
                                <Table.HeaderCell>
                                    You have nothing to do!
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>) :
                    (<Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    <Checkbox onChange={() => this.handleToggleAll(allToggled)}
                                        checked={allToggled} />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.todos.map((todo, index) => (
                                <TodoItem key={index} todo={todo}
                                    handleToggle={() => this.handleTodoClick(todo, index)}
                                    handleDelete={() => this.handleDelete(todo.id)} />
                            ))}
                        </Table.Body>
                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan="2">
                                    <Button size="small"
                                        onClick={this.handleClearCompleted}>Clear Completed
                          </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>)}

            </div>
        );
    }
}

export default TodoApp;