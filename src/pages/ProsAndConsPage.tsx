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
import { useEffect, useState } from 'react';
import { ProsAndConsList } from '../components/models';
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
  const [prosAndConsList, setProsAndConsList] = useState<ProsAndConsList>();
  const history = useHistory();
  const { lists, remove, update } = useProsAndConsData();

  useEffect(() => {
    if (!match || !lists || !setProsAndConsList) return;
    setProsAndConsList(
      lists.find(list => list.id === parseInt(match.params.id)),
    );
  }, [lists, match, prosAndConsList, setProsAndConsList]);

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
        {prosAndConsList && (
          <div className="pros-and-cons-grid">
            <div className="pros-list" data-testid="pros-list">
              <ReasonsList
                title="Pros"
                reasons={prosAndConsList.pros}
                onAddReason={reason => {
                  update({
                    ...prosAndConsList,
                    pros: [...prosAndConsList.pros, reason],
                  });
                }}
                onMoveReason={(from: number, to: number) => {
                  let reorderedReasons = [...prosAndConsList.pros];
                  const reasonMoved = reorderedReasons.splice(from, 1)[0];
                  reorderedReasons.splice(to, 0, reasonMoved);
                  update({
                    ...prosAndConsList,
                    pros: reorderedReasons,
                  });
                }}
                onDeleteReason={reasonToDelete => {
                  update({
                    ...prosAndConsList,
                    pros: prosAndConsList.pros.filter(
                      reason => reason.id !== reasonToDelete.id,
                    ),
                  });
                }}
                onEditReason={editedReason => {
                  update({
                    ...prosAndConsList,
                    pros: prosAndConsList.pros.map(reason =>
                      reason.id === editedReason.id
                        ? { ...editedReason }
                        : reason,
                    ),
                  });
                }}
              />
            </div>
            <div className="cons-list" data-testid="cons-list">
              <ReasonsList
                title="Cons"
                reasons={prosAndConsList.cons}
                onAddReason={reason => {
                  update({
                    ...prosAndConsList,
                    cons: [...prosAndConsList.cons, reason],
                  });
                }}
                onMoveReason={(from: number, to: number) => {
                  let reorderedReasons = [...prosAndConsList.cons];
                  const reasonMoved = reorderedReasons.splice(from, 1)[0];
                  reorderedReasons.splice(to, 0, reasonMoved);
                  update({
                    ...prosAndConsList,
                    cons: reorderedReasons,
                  });
                }}
                onDeleteReason={reasonToDelete => {
                  update({
                    ...prosAndConsList,
                    cons: prosAndConsList.cons.filter(
                      reason => reason.id !== reasonToDelete.id,
                    ),
                  });
                }}
                onEditReason={editedReason => {
                  update({
                    ...prosAndConsList,
                    cons: prosAndConsList.cons.map(reason =>
                      reason.id === editedReason.id
                        ? { ...editedReason }
                        : reason,
                    ),
                  });
                }}
              />
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProsAndConsPage;
