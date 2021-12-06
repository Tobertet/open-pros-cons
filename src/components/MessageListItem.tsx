import { IonItem, IonLabel, IonNote } from '@ionic/react';
import './MessageListItem.css';

interface MessageListItemProps {
  message: string;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  return (
    <IonItem detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>{message}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
