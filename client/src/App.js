import logo from './logo.svg';
import './App.css';
import EditorComponent from './components/EditorComponent';
import {GlobalProvider} from './components/StateProvider'

function App() {
  return (
       <div className="App">
        <GlobalProvider>
            <div>
              <EditorComponent/>
            </div>
        </GlobalProvider>
      </div>
   );
}

export default App;
