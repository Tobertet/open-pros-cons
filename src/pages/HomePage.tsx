import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { FC } from 'react';
import { useProsAndConsData } from '../hooks/useProsAndConsData';
import { add } from 'ionicons/icons';
import './HomePage.css';
import { useHistory } from 'react-router';

export const HomePage: FC = () => {
  const { lists: prosAndConsLists, create } = useProsAndConsData();
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{'Open Pros & Cons'}</IonTitle>
          <IonButtons slot="end">
            {prosAndConsLists && (
              <IonButton onClick={create} data-testid="create-button">
                <IonIcon slot="icon-only" icon={add} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen id="content" data-testid="pros-cons-table">
        {prosAndConsLists?.map(list => (
          <IonCard
            className="list-item"
            data-testid="pros-cons-list-item"
            key={list.id}
            onClick={() => {
              history.push(`/open-pros-cons/${list.id}`);
            }}
          >
            <IonCardContent style={{ display: 'flex', alignItems: 'center' }}>
              <IonText style={{ width: '100%' }}>{list.name}</IonText>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};
