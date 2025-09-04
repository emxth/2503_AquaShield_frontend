import logo from './logo.svg';
import './App.css';
import ReportingForm from './reporting/components/ReportingForm';
import { FormProvider } from './reporting/context/ReportFormContext';
import ReportDetails from './reporting/components/MyReport';
import MyReport from './reporting/components/MyReport';
import ReportInfo from './reporting/components/ReportInfo';


function App() {
  return (
    <div className="App">
      {/*header className="App-header">
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
      <FormProvider>
        <ReportingForm />
      </FormProvider>
      <MyReport />*/}
      <ReportInfo />


    </div>
  );
}

export default App;
