import React, { useRef, useState, useContext } from 'react';
import Store from '../common/Store';
import HOST_API from '../common/Connection';

const TodoForm = (TaskListId) => {
	const formRef = useRef(null);
	const { dispatch, state: { todo } } = useContext(Store);
	const item = todo.item;
	const [state, setState] = useState(item);
	const vsExprReg = /[A-Za-z0-9_]/;

	const onAdd = (event) => {
		event.preventDefault();

		const request = {
			name: state.name,
			id: null,
			idList: TaskListId.TaskListId,
			completed: false
		};

		
		if (vsExprReg.test(request.name)) {
			document.querySelector(".alertTodo").innerHTML = "";
			fetch(HOST_API + "/todo", {
				method: "POST",
				body: JSON.stringify(request),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => response.json())
				.then((todo) => {
					dispatch({ type: "add-item", item: todo });
					setState({ name: "" });
					formRef.current.reset();
				});
		} else {
			document.querySelector(".alertTodo").innerHTML = "Solo utilice caracteres Alfanuméricos";
		}
	}

	const onEdit = (event) => {
		event.preventDefault();

		const request = {
			name: state.name,
			id: item.id,
			idList: TaskListId.TaskListId,
			completed: item.isCompleted
		};

		fetch(HOST_API + "/todo", {
			method: "PUT",
			body: JSON.stringify(request),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then((todo) => {
				dispatch({ type: "update-item", item: todo });
				setState({ name: "" });
				formRef.current.reset();
			});
	}

	return <form ref={formRef} className="barTodo">
		<input
			type="text"
			name="name"
			defaultValue={item.name}
			onChange={(event) => {
				setState({ ...state, name: event.target.value })
			}} />
		{item.id && <button onClick={onEdit} disabled={!state.name}>Actualizar</button>}
		{!item.id && <button onClick={onAdd} disabled={!state.name}>Agregar</button>}
		<div className="alertTodo"></div>
	</form>

}

export default TodoForm;