import { Todo } from "./todo.class";

export class TodoList {

    constructor() {

        this.leerDeStorage();
    }

    nuevoTodo( todo ) {

        this.todos.push( todo );
        this.guardarEnStorage();

    }

    eliminarTodo( id ) {

        this.todos = this.todos.filter( todo => todo.id != id );    
        this.guardarEnStorage();
    }

    marcarCompletado( id ) {

        for ( const todo of this.todos ) {
        
            if ( todo.id == id) {

                todo.completado = !todo.completado;
                this.guardarEnStorage();
                
                break;
            }
        }

    }

    eliminarCompletados() {

        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarEnStorage();
    }

    guardarEnStorage() {

        localStorage.setItem('todo', JSON.stringify( this.todos ) );
    } 

    leerDeStorage() {
        
        this.todos = localStorage.getItem( 'todo' ) ? JSON.parse( localStorage.getItem( 'todo' ) ) : [];   
        this.todos = this.todos.map(todo => Todo.fromJson( todo ));
    }

}