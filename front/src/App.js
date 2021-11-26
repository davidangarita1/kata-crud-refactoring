import StoreProvider from './StoreProvider';
import Form from './Todo/TodoForm';
import List from './Todo/TodoList';

function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form />
    <List />
  </StoreProvider>
}

export default App;
