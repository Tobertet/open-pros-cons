import { render, waitFor } from '@testing-library/react';
import NewReasonForm from '../NewReasonForm';
import { expect } from '@jest/globals';
import { ionFireEvent } from '@ionic/react-test-utils';

describe('New Reason Form', () => {
  it('calls onCreate prop when the form is submitted', async () => {
    const onCreate = jest.fn().mockName('onCreate');
    const reasonText = 'New Reason 1';

    const { getByTestId } = render(<NewReasonForm onCreate={onCreate} />);

    const inputArea = getByTestId('new-reason-form-text-area');
    ionFireEvent.ionChange(inputArea, reasonText);
    const submitButton = getByTestId('new-reason-form-submit');
    ionFireEvent.submit(submitButton!);

    await waitFor(async () => {
      expect(onCreate).toHaveBeenCalledWith(reasonText);
    });
  });

  it('allows only numbers in the input', () => {});
  it('clears the input value after submitting the form', () => {});
});
