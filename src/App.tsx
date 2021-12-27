import { IonApp, IonRouterOutlet } from '@ionic/react';
import ProsAndConsPage from './pages/ProsAndConsPage';

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
import './theme/theme.css';
import { HomePage } from './pages/HomePage';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Android only works with this workaround */}
          <Route path="/" exact={true} component={HomePage}></Route>
          <Route
            path="/open-pros-cons"
            exact={true}
            component={HomePage}
          ></Route>
          <Route path="/open-pros-cons/:id" component={ProsAndConsPage}></Route>
          <Redirect to="/open-pros-cons" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
