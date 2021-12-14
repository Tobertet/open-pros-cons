import { ItemReorderEventDetail } from '@ionic/core';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonReorder,
  IonReorderGroup,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { Reason } from './models';
import NewReasonForm from './NewReasonForm';
import './ReasonsList.css';
import { trashOutline } from 'ionicons/icons';

interface Props {
  title: string;
  reasons: Reason[];
  onAddReason: (reason: Reason) => void;
  onMoveReason: (from: number, to: number) => void;
}

const ReasonsList: React.FC<Props> = ({
  title,
  reasons,
  onAddReason,
  onMoveReason,
}) => {
  const [isAddingReason, setIsAddingReason] = useState(false);

  const moveReason = (event: CustomEvent<ItemReorderEventDetail>) => {
    event.detail.complete();
    onMoveReason(event.detail.from, event.detail.to);
  };

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

        <IonReorderGroup disabled={false} onIonItemReorder={moveReason}>
          {reasons.map((reason, index) => (
            <IonCard data-testid="reason" key={reason.text}>
              <IonCardContent style={{ display: 'flex', alignItems: 'center' }}>
                <IonReorder></IonReorder>
                <IonText style={{ width: '100%' }}>{reason.text}</IonText>
                <IonButton
                  size="small"
                  color="danger"
                  onClick={() => {
                    console.log('asd');
                  }}
                >
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </IonReorderGroup>
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
