import logo from './logo.svg';
import './App.css';
import EditorComponent from './components/EditorComponent';
import {InputComponent} from './components/InputComponent';
import RefComponent from './components/RefComponent';
import EffectComponent from './components/EffectComponent';
import LoadingInputComponent from './components/LoadingInputComponent';
import ContextComponent from './components/ContextComponent';
 
function App() {
  return (
       <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <EditorComponent/>
        <InputComponent/>
        <RefComponent imageAltIdle="Idle" imageAltHover="hover"/>
        <EffectComponent/>
        <LoadingInputComponent/>
        <ContextComponent/>
      </div>
   );
}

export default App;
