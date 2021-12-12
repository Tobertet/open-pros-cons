import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { Reason } from './models';
import NewReasonForm from './NewReasonForm';
import './ReasonsList.css';

interface Props {
  title: string;
  reasons: Reason[];
  onAddReason: (reason: Reason) => void;
}

const ReasonsList: React.FC<Props> = ({ title, reasons, onAddReason }) => {
  const [isAddingReason, setIsAddingReason] = useState(false);

  return (
    <>
      <IonList data-testid="reasons-list" class="reasons-list">
        <IonListHeader class="ion-no-padding">
          <IonItem class="reason-list-header">
            <IonLabel>{title}</IonLabel>
            <IonBadge slot="end" data-testid="reasons-count">
              {reasons.length}
            </IonBadge>
          </IonItem>
        </IonListHeader>

        {reasons.map((reason, index) => (
          <IonCard data-testid="reason" key={index}>
            <IonCardContent>{reason.text}</IonCardContent>
          </IonCard>
        ))}
      </IonList>
      <IonButton
        data-testid="add-reason-button"
        class="add-reason-button"
        shape="round"
        onClick={() => {
          setIsAddingReason(true);
        }}
      >
        +
      </IonButton>
      <IonModal
        isOpen={isAddingReason}
        data-testid="new-reason-modal"
        backdropDismiss={false}
      >
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Reason detail</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  data-testid="new-reason-modal-close-button"
                  onClick={() => setIsAddingReason(false)}
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <NewReasonForm
              onCreate={reasonText => {
                setIsAddingReason(false);
                onAddReason({ text: reasonText });
              }}
            />
          </IonContent>
        </>
      </IonModal>
    </>
  );
};

export default ReasonsList;
