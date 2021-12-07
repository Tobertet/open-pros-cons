import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
} from '@ionic/react';
import { useState } from 'react';
import { Reason } from './models';
import NewReasonForm from './NewReasonForm';

interface Props {
  title: string;
  reasons: Reason[];
  // onAddReason: (reason: string) => void;
}

const ReasonsList: React.FC<Props> = ({ title, reasons }) => {
  const [isAddingReason, setIsAddingReason] = useState(false);

  return (
    <>
      <IonList data-testid="reasons-list">
        <IonListHeader>{title}</IonListHeader>

        {reasons.map((reason, index) => (
          <IonItem detail={false} key={index}>
            <IonLabel className="ion-text-wrap">
              <h2>{reason.text}</h2>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
      <IonButton
        data-testid="add-reason-button"
        onClick={() => {
          setIsAddingReason(true);
        }}
      >
        Add
      </IonButton>
      <IonModal isOpen={isAddingReason} data-testid="new-reason-modal">
        <NewReasonForm onCreate={() => {}} />
      </IonModal>
    </>
  );
};

export default ReasonsList;
