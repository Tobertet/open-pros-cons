import { act, render, RenderResult, waitFor } from '@testing-library/react';
import NewReasonForm from '../NewReasonForm';
import { expect } from '@jest/globals';
import { ionFireEvent } from '@ionic/react-test-utils';

describe('New Reason Form', () => {
  let onCreate: jest.Mock;
  let onEdit: jest.Mock;
  let context: RenderResult;

  beforeEach(() => {
    onCreate = jest.fn().mockName('onCreate');
    onEdit = jest.fn().mockName('onEdit');
    context = render(<NewReasonForm onCreate={onCreate} onEdit={onEdit} />);
  });

  it('calls onCreate prop when the form is submitted and valid', async () => {
    const reasonText = 'New Reason 1';

    const { getByTestId } = context;

    const inputArea = getByTestId('new-reason-form-text-area');
    ionFireEvent.ionChange(inputArea, reasonText);
    const submitButton = getByTestId('new-reason-form-submit');
    ionFireEvent.submit(submitButton!);

    await waitFor(async () => {
      expect(onCreate).toHaveBeenCalledWith(reasonText);
    });
  });

  it('does not call onCreate prop when the form is submitted and invalid', async () => {
    const reasonText = 'New Reason 1';

    const { getByTestId } = context;

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
    const { queryAllByTestId } = context;

    expect(queryAllByTestId('form-error-message-text').length).toBe(0);
  });

  it('shows an error when the reason text is empty and the field is dirty', async () => {
    const { getByTestId, findByText } = context;

    const submitButton = getByTestId('new-reason-form-submit');
    ionFireEvent.submit(submitButton!);

    expect(await findByText('This field cannot be empty.')).not.toBeNull();
  });

  it('calls onEdit prop when the form is submitted, valid, and has a reason prop', async () => {
    const reasonText = 'New Reason 1';

    context.unmount();

    context = render(
      <NewReasonForm
        onCreate={onCreate}
        onEdit={onEdit}
        reason={{ text: 'Old text', id: 1 }}
      />,
    );

    const { getByTestId } = context;

    const inputArea = getByTestId('new-reason-form-text-area');
    ionFireEvent.ionChange(inputArea, reasonText);
    const submitButton = getByTestId('new-reason-form-submit');
    ionFireEvent.submit(submitButton!);

    await waitFor(async () => {
      expect(onEdit).toHaveBeenCalledWith({ text: reasonText, id: 1 });
      expect(onCreate).not.toHaveBeenCalled();
    });
  });
});
