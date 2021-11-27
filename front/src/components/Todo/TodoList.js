import React, { useContext, useEffect } from 'react';
import Store from '../common/Store';
import HOST_API from '../common/Connection';

const TodoList = (TaskListId) => {
	const { dispatch, state: { todo } } = useContext(Store);
	const currentList = todo.todoList.filter(todo => {
		return todo.idList === TaskListId.TaskListId;
	});

	useEffect(() => {
		fetch(HOST_API + "/todolist")
			.then(response => response.json())
			.then((todoList) => {
				dispatch({ type: "update-list", todoList })
			})
	}, [dispatch]);

	const onDelete = (id) => {
		fetch(HOST_API + "/" + id + "/todo", {
			method: "DELETE"
		})
			.then((todoList) => {
				dispatch({ type: "delete-item", id })
			})
	};

	const onEdit = (todo) => {
		dispatch({ type: "edit-item", item: todo })
	};

	const onEditComplete = (event, item) => {
		const request = {
			name: item.name,
			id: item.id,
			idList: item.idList,
			completed: event.target.checked
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
			});
	}

	return <div className="list">
		<table className="table text-center">
			<thead>
				<tr>
					<td></td>
					<td>ID</td>
					<td>Nombre</td>
					<td colSpan="2">Opciones</td>
				</tr>
			</thead>
			<tbody>
				{currentList.map((item) => {
					return <tr key={item.id}>
						<td>
							<input
								type="checkbox"
								defaultChecked={item.completed}
								onChange={(event) => onEditComplete(event, item)}
								className="CheckComplete"
							/>
						</td>
						<td>{item.id}</td>
						<td>{item.name}</td>
						<td><button type="button" className="btn btn-secondary" onClick={() => onEdit(item)}>Editar</button></td>
						<td><button type="button" className="btn btn-danger" onClick={() => onDelete(item.id)}>Eliminar</button></td>
					</tr>
				})}
			</tbody>
		</table>
	</div>
}

export default TodoList;