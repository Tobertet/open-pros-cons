import ReasonsList from '../components/ReasonsList';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { Reason } from '../components/models';
import './ProsAndConsPage.css';
import { pencil } from 'ionicons/icons';
import { trash } from 'ionicons/icons';
import { RouteComponentProps, useHistory } from 'react-router';
import { useProsAndConsData } from '../hooks/useProsAndConsData';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

const ProsAndConsPage: React.FC<Props> = ({ match }) => {
  const [pros, setPros] = useState<Reason[]>([]);
  const [cons, setCons] = useState<Reason[]>([]);
  const history = useHistory();
  const { remove } = useProsAndConsData();

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/open-pros-cons" />
          </IonButtons>
          <IonTitle>{'Pros & Cons'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => {}}>
              <IonIcon slot="icon-only" icon={pencil} />
            </IonButton>
            <IonButton
              onClick={() => {
                history.replace('/open-pros-cons');
                remove(parseInt(match.params.id));
              }}
            >
              <IonIcon slot="icon-only" icon={trash} />
            </IonButton>
          </IonButtons>
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
                setPros(pros.filter(reason => reason.id !== reasonToDelete.id));
              }}
              onEditReason={editedReason => {
                setPros(
                  pros.map(pro =>
                    pro.id === editedReason.id ? { ...editedReason } : pro,
                  ),
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
                setCons(cons.filter(reason => reason.id !== reasonToDelete.id));
              }}
              onEditReason={editedReason => {
                setCons(
                  cons.map(con =>
                    con.id === editedReason.id ? { ...editedReason } : con,
                  ),
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
