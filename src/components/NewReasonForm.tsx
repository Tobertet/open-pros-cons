import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
} from '@ionic/react';
import { Controller, useController, useForm } from 'react-hook-form';

interface Props {
  onCreate: (reason: string) => void;
}

interface FormData {
  reasonText: string;
}

const NewReasonForm: React.FC<Props> = ({ onCreate }) => {
  const { register, handleSubmit, control } = useForm<FormData>({
    mode: 'onChange',
  });
  const onSubmit = (data: FormData) => {
    onCreate(data.reasonText);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonItem>
        <IonLabel position="floating">Reason</IonLabel>
        <Controller
          control={control}
          name="reasonText"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <IonTextarea
              data-testid="new-reason-form-text-area"
              onIonChange={event => onChange(event.detail.value)}
            />
          )}
        />
      </IonItem>
      <IonButton data-testid="new-reason-form-submit" type="submit">
        Save
      </IonButton>
    </form>
  );
};

export default NewReasonForm;
