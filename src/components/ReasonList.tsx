import MessageListItem from './MessageListItem';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
} from '@ionic/react';

interface Props {
  reasons: string[];
  onAddReason: (reason: string) => void;
}

const ReasonList: React.FC<Props> = ({ reasons, onAddReason }) => {
  return (
    <>
      <IonList data-testid="reason-list">
        {reasons.map((reason, index) => (
          <MessageListItem key={index} message={reason} />
        ))}
      </IonList>
      <IonButton data-testid="reason-list-add-button">Add</IonButton>
      <IonModal
        isOpen={true}
        onWillPresent={() => {
          onAddReason('');
        }}
      >
        <form onSubmit={data => onAddReason('')} data-testid="ASD">
          <IonItem>
            <IonLabel position="floating">Reason</IonLabel>
            <IonInput data-testid="add-reason-form-text-input" />
          </IonItem>

          <IonButton data-testid="add-reason-form-submit" type="submit">
            Save
          </IonButton>
        </form>
      </IonModal>
    </>
  );
};

export default ReasonList;
