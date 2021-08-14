import './App.css';
import EditorComponent from './components/EditorComponent';
import {GlobalProvider} from './components/StateProvider'

function App() {
  return (
       <div className="App">
        <GlobalProvider>
            <EditorComponent/>
        </GlobalProvider>
      </div>
   );
}

export default App;
