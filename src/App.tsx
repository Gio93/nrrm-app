import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import LoginPage from './pages/Login';
import RippleList from './pages/Ripples';
import DigitalizationPage from './pages/Digitalization';
import Digitalization2 from './pages/Digitalization2'
import HistoricPage from './pages/HistoricPage';
// import EffortDiagramPage from './pages/EffortDiagramPage';




import Menu from './components/Menu';
import Home from './pages/Home';
import RipplePage from './pages/Ripple';
import RippleDiagramPage from './pages/RippleDiagram';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';



const App: React.FC = () => {

  return (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main" when="false">
        <Menu/>
          <IonRouterOutlet id="main" >
            
            <Route path="/"  component={Home} exact={true} />
            <Route exact path="/login" component={LoginPage} /> 
            <Route exact path="/ripple/" component={RippleList} />
            <Route path="/ripple/:ripple" component={RipplePage} />
            <Route path="/rippleDiagram" component={RippleDiagramPage} />
            <Route path="/dgrade" component={DigitalizationPage} />
            <Route path="/dgrade2" component={Digitalization2} />
            <Route path="/historicalChart" component={HistoricPage} />
            {/* <Route path="/effortDiagram" component={EffortDiagramPage} /> */}
            <Redirect exact from="/" to="/login"></Redirect>
          </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
)};

export default App;
