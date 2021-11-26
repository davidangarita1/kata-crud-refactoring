import React, { useContext, useEffect } from 'react';
import Store from '../common/Store';
import TodoForm from "../Todo/TodoForm";
import HOST_API from '../common/Connection';
import TodoList from "../Todo/TodoList";
import Banner from "../common/Banner";

const TaskList = () => {
	const { dispatch, state: { task, todo } } = useContext(Store);
	const currentList = task.taskList;
	const currentTodo = todo.todoList;

	useEffect(() => {
		fetch(HOST_API + "/tasklist")
			.then(response => response.json())
			.then((taskList) => {
				dispatch({ type: "update-tasklist", taskList })
			})
	}, [dispatch]);

	const onDeleteTask = (id) => {
		currentTodo.forEach(item => {
			if(item.idList === id) {
				fetch(HOST_API + "/" + item.id + "/todo", {
					method: "DELETE"
				}).then((todoList) => {
					dispatch({ type: "delete-item", id })
				})
			}
		});
		fetch(HOST_API + "/" + id + "/task", {
			method: "DELETE"
		}).then((taskList) => {
			dispatch({ type: "delete-task", id })
		})
	};

	return <div>
		{currentList.map((item) => {
			return <div key={item.id}>
				<div className="wrapper">
					<Banner />
					<h2 className="title">{item.name}</h2>
					<button className="btnTask" onClick={() => onDeleteTask(item.id)}>Eliminar</button>
					<TodoForm TaskListId={item.id} />
					<TodoList TaskListId={item.id} />
				</div>

			</div>
		})}
	</div>;
}

export default TaskList;

