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
			if (item.idList === id) {
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

	return <div className="row main mt-5">
		{currentList.map((item) => {
			return <div className="col" key={item.id}>
				<div className="card" >
					<div className="card-header">
						<div className="row text-center">
							<div className="col-12 del">
								<Banner />
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => onDeleteTask(item.id)}
								>X</button>
							</div>
						</div>
						<div className="row text-center">
							<div className="col-12">
								<h3 className="title">{item.name}</h3>
							</div>
						</div>
						<div className="row text-center">
							<div className="col-12">
								<TodoForm TaskListId={item.id} />
							</div>
						</div>
					</div>
					<div className="card-body">
						<TodoList TaskListId={item.id} />
					</div>
				</div>
			</div>
		})}
	</div>;
}

export default TaskList;

