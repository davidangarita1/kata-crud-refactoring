import StoreProvider from './StoreProvider';
import Form from './components/Todo/TodoForm';
import List from './components/Todo/TodoList';

function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form />
    <List />
  </StoreProvider>
}

export default App;
