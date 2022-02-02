import React, { useContext } from 'react';
import { ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import Note from './Note';
import { TodosContext } from './Context/store';
import { v4 as uuidv4 } from 'uuid';

export default () => {
  const {
    state: { todos },
    addTodos,
  } = useContext(TodosContext);

  const onType = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      addTodos({
        text: e.target.value,
        id: uuidv4(),
        done: false,
      });
      e.target.value = '';
    }
  };
  return (
    <div>

       <div>
            <h2>Tutte le task</h2>
            <ListGroup as='ol' numbered>
                {todos.map((todo) =>
                    (<Note key={todo.id} id={todo.id} note={todo} />))}
            </ListGroup>
            </div>

            <div>
            <h3>Task non completate</h3>
            <ListGroup as="ol" numbered>
                {todos.filter((todo) =>
                    (todo.done === false))
                    .map((todo) =>
                        (<Note key={todo.id} note={todo} />))}
            </ListGroup>
            </div>

            <div>
            <h3>Task completate</h3>
            <ListGroup as="ol" numbered>
                {todos.filter((todo) =>
                    (todo.done === true))
                    .map((todo) =>
                        (<Note key={todo.id} note={todo} />))}
            </ListGroup>
            </div>

      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Insert Note</InputGroup.Text>
        <FormControl
          onKeyDown={onType}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
    </div>
  );
};
