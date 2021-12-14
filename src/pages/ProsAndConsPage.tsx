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
import './ProsAndConsPage.css';

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
        <div className="pros-and-cons-grid">
          <div className="pros-list" data-testid="pros-list">
            <ReasonsList
              title="Pros"
              reasons={pros}
              onAddReason={reason => {
                setPros([...pros, reason]);
              }}
              onMoveReason={(from: number, to: number) => {
                let reorderedReasons = [...pros];
                const reasonMoved = reorderedReasons.splice(from, 1)[0];
                reorderedReasons.splice(to, 0, reasonMoved);
                setPros(reorderedReasons);
              }}
              onDeleteReason={reasonToDelete => {
                setPros(
                  pros.filter(reason => reason.text !== reasonToDelete.text),
                );
              }}
            />
          </div>
          <div className="cons-list" data-testid="cons-list">
            <ReasonsList
              title="Cons"
              reasons={cons}
              onAddReason={reason => {
                setCons([...cons, reason]);
              }}
              onMoveReason={(from: number, to: number) => {
                let reorderedReasons = [...cons];
                const reasonMoved = reorderedReasons.splice(from, 1)[0];
                reorderedReasons.splice(to, 0, reasonMoved);
                setCons(reorderedReasons);
              }}
              onDeleteReason={reasonToDelete => {
                setCons(
                  cons.filter(reason => reason.text !== reasonToDelete.text),
                );
              }}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProsAndConsPage;
