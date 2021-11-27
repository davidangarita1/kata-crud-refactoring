import React from "react";
import { StoreProvider } from "./components/common/Store";
import TaskList from "./components/Task/TaskList";
import TaskForm from "./components/Task/TaskForm";

function App() {
	return <div className="container">
		<StoreProvider>
			<TaskForm />
			<TaskList />
		</StoreProvider>
	</div>
}

export default App;