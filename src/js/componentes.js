import { Todo } from '../classes/todo.class';
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const inputTxt = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const btnFilter = document.querySelector('.filters');
const anchorfiltro = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {
	
	const htmlTodo = ` 
	<li class="${  (todo.completado)  ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${  (todo.completado)  ? 'checked' : '' }>
			<label> ${todo.tarea} </label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;
	
    
	const div = document.createElement('div');
	div.innerHTML = htmlTodo;
	
	divTodoList.append( div.firstElementChild );
	return div.firstElementChild;
}
	

inputTxt.addEventListener('keyup', ( event ) => {

	if (event.keyCode === 13 && inputTxt.value !== '' ) {
		const todoObj = new Todo( inputTxt.value ); 
		
		todoList.nuevoTodo( todoObj );
		crearTodoHtml( todoObj );
		event.target.value = '';
	}
})

divTodoList.addEventListener('click', ( event ) => {

	const nombreElemento = event.target.localName;
	const liElement = event.target.parentElement.parentElement;
	const todoId = liElement.getAttribute('data-id');

	if (nombreElemento.includes('input') ) {
		
		todoList.marcarCompletado( todoId );
		liElement.classList.toggle('completed');
		
	} else if ( nombreElemento.includes( 'button' ) ) {
		todoList.eliminarTodo( todoId );
		divTodoList.removeChild( liElement )
		
	}
})

btnBorrar.addEventListener('click', ( event ) => {

	todoList.eliminarCompletados();
	
	for ( let i = divTodoList.children.length-1; i >= 0; i-- ) {
		const elemento = divTodoList.children[i];
		
		if ( elemento.getAttribute('class') === 'completed' ) {
			divTodoList.removeChild( elemento );
		}
	}
})
btnFilter.addEventListener('click', ( event ) =>{
	
	const filtro = event.target.text;
	if ( !filtro ) { return; }

	anchorfiltro.forEach( elem => elem.classList.remove('selected') );
	event.target.classList.add('selected');

	for (const elemento of divTodoList.children) {

		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');

		switch( filtro ) {
			case 'Pendientes':
				if ( completado ) {
					elemento.classList.add('hidden');
				}
			break;		
		
			case 'Completados':
				if ( !completado ) {
					elemento.classList.add('hidden');
				}
			break;
		}
	}
})