import ReasonsList from '../components/ReasonsList';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { Reason } from '../components/models';

const ProsAndConsPage: React.FC = () => {
  const [pros, setPros] = useState<Reason[]>([]);
  const [cons, setCons] = useState<Reason[]>([]);

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{'Pros & Cons'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div data-testid="pros-list">
          <ReasonsList
            title="Pros"
            reasons={pros}
            onAddReason={reason => {
              setPros([...pros, reason]);
            }}
          />
        </div>
        <div data-testid="cons-list">
          <ReasonsList
            title="Cons"
            reasons={cons}
            onAddReason={reason => {
              setCons([...cons, reason]);
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProsAndConsPage;
