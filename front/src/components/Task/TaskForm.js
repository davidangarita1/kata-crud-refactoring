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
			document.querySelector(".alertTask").innerHTML = "";
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

	return <div className="row mb-3 mt-2">
		<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<p className="navbar-brand">Sofka</p>
				<div className="collapse navbar-collapse">
					<form className="position-absolute top-50 start-50 translate-middle w-50" ref={formRef}>
						<div className="input-group flex-nowrap">
							<input
								type="text"
								name="name"
								className="form-control me-2"
								placeholder="Escriba aqui..."
								defaultValue={item.name}
								onChange={(event) => {
									setState({ ...state, name: event.target.value })
								}} />
							<button className="btn btn-success" onClick={onAdd} disabled={!state.name}>Nueva Lista</button>
						</div>

						<div className="alertTask"></div>
					</form>
				</div>
			</div>
		</nav>
	</div>

};

export default TaskForm;