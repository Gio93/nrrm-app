import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import LoginPage from './pages/Login';
import RippleList from './pages/Ripples';
import DigitalizationPage from './pages/Digitalization';
import BarChartSubIndicators from './pages/BarChartSubIndicators';
import HistoricPage from './pages/HistoricPage';



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
            
            <Route path="/"  component={Home} exact={true} 
            // render={props => {
            //   console.log("AAAAAAAA : "+props+""+isAuthed);
            //   if (!props) return <></>;
            //   return isAuthed ? <Home /> : <LoginPage props={props} history={props!.history} location={props!.location} match={props!.match}/>;
            // }}
            />
            <Route exact path="/login" component={LoginPage} /> 
            <Route exact path="/ripple/" component={RippleList} />
            <Route path="/ripple/:ripple" component={RipplePage} />
            <Route path="/rippleDiagram" component={RippleDiagramPage} />
            <Route path="/dgrade" component={DigitalizationPage} />
            <Route path="/indicators/:id" component={BarChartSubIndicators} />
            <Route path="/historicalChart" component={HistoricPage} />
            <Redirect exact from="/" to="/login"></Redirect>
          </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
)};

export default App;
