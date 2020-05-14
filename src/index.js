import './styles.css';
import { Todo, TodoList } from './classes'
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach( todo => crearTodoHtml( todo ) );


// objeto literal
const todoLiteral = {
    tarea: 'nombre tarea',
    id: new Date().getTime(),
    completado: false,
    creado: new Date()
}

// objeto de una clase (Todo)
const todoClaseTodo = new Todo( 'nombre tarea' );

console.log('todoLiteral', todoLiteral);
console.log('todoClaseTodo', todoClaseTodo);