import React, { useRef, useState, useContext } from 'react';
import HOST_API from '../common/Connection';
import Store from '../common/Store';

const TaskForm = () => {
	const formRef = useRef(null);
	const { dispatch, state: { task } } = useContext(Store);
	const item = task.item;
	const [state, setState] = useState(item);
	const vsExprReg = /[A-Za-z0-9_]/;

	const onAdd = (event) => {
		event.preventDefault();

		const request = {
			name: state.name,
			id: null,
		};

		if (vsExprReg.test(request.name)) {
			document.querySelector(".alert").innerHTML = "";
			fetch(HOST_API + "/task", {
				method: "POST",
				body: JSON.stringify(request),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => response.json())
				.then((task) => {
					dispatch({ type: "add-task", item: task });
					setState({ name: "" });
					formRef.current.reset();
				});
		} else {
			document.querySelector(".alertTask").innerHTML = "Solo utilice caracteres Alfanuméricos";
		}
	}

	return <div>
		<form className="formList" ref={formRef}>
			<input
				type="text"
				name="name"
				className="taskForm"
				placeholder="Escriba el nombre de la lista"
				defaultValue={item.name}
				onChange={(event) => {
					setState({ ...state, name: event.target.value })
				}} />
			<button onClick={onAdd} disabled={!state.name}>Nueva Lista</button>
			<div className="alertTask"></div>
		</form>
	</div>

};

export default TaskForm;