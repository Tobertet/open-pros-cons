import { act, render, waitFor } from '@testing-library/react';
import NewReasonForm from '../NewReasonForm';
import { expect } from '@jest/globals';
import { ionFireEvent } from '@ionic/react-test-utils';

describe('New Reason Form', () => {
  it('calls onCreate prop when the form is submitted and valid', async () => {
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

  it('does not call onCreate prop when the form is submitted and invalid', async () => {
    const onCreate = jest.fn().mockName('onCreate');
    const reasonText = 'New Reason 1';

    const { getByTestId } = render(<NewReasonForm onCreate={onCreate} />);

    const inputArea = getByTestId('new-reason-form-text-area');
    ionFireEvent.ionChange(inputArea, reasonText);
    ionFireEvent.ionChange(inputArea, '');
    const submitButton = getByTestId('new-reason-form-submit');
    ionFireEvent.submit(submitButton!);

    await act(async () => {
      await new Promise(r => setTimeout(r, 1000));
    });

    expect(onCreate).not.toHaveBeenCalled();
  });

  it('does not show any error when the form is untouched', () => {
    const onCreate = jest.fn().mockName('onCreate');

    const { queryAllByTestId } = render(<NewReasonForm onCreate={onCreate} />);

    expect(queryAllByTestId('form-error-message-text').length).toBe(0);
  });

  it('shows an error when the reason text is empty and the field is dirty', async () => {
    const onCreate = jest.fn().mockName('onCreate');

    const { getByTestId, findByText } = render(
      <NewReasonForm onCreate={onCreate} />,
    );

    const submitButton = getByTestId('new-reason-form-submit');
    ionFireEvent.submit(submitButton!);

    expect(await findByText('This field cannot be empty.')).not.toBeNull();
  });
});
