import ReasonsList from '../components/ReasonsList';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import NewReasonForm from '../components/NewReasonForm';

const Home: React.FC = () => {
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <ReasonsList
          reasons={["ASD"]}
          onAddReason={() => {
            console.log("ASDASD");
          }}
        /> */}
        <NewReasonForm onCreate={asd => console.log('ASD')} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
