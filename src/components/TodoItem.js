import React from 'react';
import { Table, Checkbox, Button } from 'semantic-ui-react';

const TodoItem = props => {
    const { todo, index, handleDelete, handleToggle } = props 
    return(<Table.Row key={index} positive={todo.completed}>
        <Table.Cell>
          <Checkbox checked={todo.completed} 
            onChange={handleToggle} />
        </Table.Cell>
        <Table.Cell>
          {todo.title}
          <Button color="red" icon="trash" floated="right" compact size="small"
            onClick={handleDelete} />
        </Table.Cell>
      </Table.Row>)
    }

export default TodoItem;