import { IonButton, IonItem, IonLabel, IonText, IonInput } from '@ionic/react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import './NewReasonForm.css';

interface Props {
  onCreate: (reason: string) => void;
}

interface FormData {
  reasonText: string;
}

const NewReasonForm: React.FC<Props> = ({ onCreate }) => {
  const { handleSubmit, control } = useForm<FormData>({
    mode: 'onChange',
  });

  const { errors } = useFormState<FormData>({ control });

  const onSubmit = (data: FormData) => {
    onCreate(data.reasonText);
  };

  const showError = (fieldName: keyof FormData) => {
    return (
      errors[fieldName] && (
        <IonText
          data-testid="form-error-message-text"
          style={{
            color: 'red',
            padding: 5,
            paddingLeft: 12,
            fontSize: 'smaller',
            marginTop: 0,
            display: 'block',
          }}
        >
          {errors[fieldName]?.message}
        </IonText>
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-reason-form">
      <IonItem>
        <IonLabel position="floating">Reason</IonLabel>
        <Controller
          control={control}
          name="reasonText"
          render={({ field: { onChange, value } }) => (
            <IonInput
              type="text"
              autoCapitalize="sentences"
              data-testid="new-reason-form-text-area"
              onIonChange={event => onChange(event.detail.value)}
              value={value}
            />
          )}
          rules={{
            required: { value: true, message: 'This field cannot be empty.' },
          }}
        />
      </IonItem>
      {showError('reasonText')}
      <IonButton
        data-testid="new-reason-form-submit"
        className="submit-button"
        type="submit"
      >
        Save
      </IonButton>
    </form>
  );
};

export default NewReasonForm;
