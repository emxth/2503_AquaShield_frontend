import logo from './logo.svg';
import './App.css';
import ReportingForm from './reporting/components/ReportingForm';
import { FormProvider } from './reporting/context/ReportFormContext';
import ReportDetails from './reporting/components/MyReport';
import MyReport from './reporting/components/MyReport';
import ReportInfo from './reporting/components/ReportInfo';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered successfully: ', registration);

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('New service worker found:', newWorker);

            newWorker.addEventListener('statechange', () => {
              console.log('New service worker state:', newWorker.state);
            });
          });
        } catch (registrationError) {
          console.log('Service Worker registration failed: ', registrationError);
        }
      } else {
        console.log('Service Workers are not supported in this browser.');
      }
    };

    registerServiceWorker();
  }, []);


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
      </header>*/}
      <FormProvider>
        <ReportingForm />
      </FormProvider>



    </div>
  );
}

export default App;
