import { IonButton, IonItem, IonLabel, IonTextarea } from '@ionic/react';
import { Controller, useForm, useFormState } from 'react-hook-form';

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
        <div
          className="form-error-message-text"
          style={{
            color: 'red',
            padding: 5,
            paddingLeft: 12,
            fontSize: 'smaller',
            marginTop: 0,
          }}
        >
          {errors[fieldName]?.message}
        </div>
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonItem>
        <IonLabel position="floating">Reason</IonLabel>
        <Controller
          control={control}
          name="reasonText"
          render={({ field: { onChange, value } }) => (
            <IonTextarea
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
      <IonButton data-testid="new-reason-form-submit" type="submit">
        Save
      </IonButton>
    </form>
  );
};

export default NewReasonForm;
