import { act, render, RenderResult } from '@testing-library/react';
import ReasonsList from '../ReasonsList';
import { expect } from '@jest/globals';
import { Reason } from '../models';
import { ionFireEvent } from '@ionic/react-test-utils';

describe('ReasonsList', () => {
  const reasons: Reason[] = [
    { text: 'Reason 1' },
    { text: 'Reason 2' },
    { text: 'Reason 3' },
  ];
  let onAddReason: jest.Mock;
  let context: RenderResult;

  beforeEach(() => {
    onAddReason = jest.fn().mockName('onAddReason');

    context = render(
      <ReasonsList
        title="Whatever"
        reasons={reasons}
        onAddReason={onAddReason}
      />,
    );
  });

  it('shows the title passed as a prop', () => {
    const { queryByText } = context;

    expect(queryByText('Whatever')).not.toBeNull();
  });

  it('displays the reasons passed as a prop', () => {
    const { queryByText } = context;

    expect(queryByText(reasons[0].text)).not.toBeNull();
    expect(queryByText(reasons[1].text)).not.toBeNull();
    expect(queryByText(reasons[2].text)).not.toBeNull();
  });

  it('does not show a modal if the add button has not been pressed', () => {
    const { queryByTestId } = context;

    expect(queryByTestId('new-reason-modal')).toBeNull();
  });

  it('shows a modal with a form when clicking on the add button', () => {
    const { queryByTestId } = context;

    ionFireEvent.click(queryByTestId('add-reason-button')!);

    expect(queryByTestId('new-reason-modal')).not.toBeNull();
  });

  it('closes the modal when submiting the form', async () => {
    const reasonText = 'Random Text';

    const { getByTestId, findByTestId, queryByTestId } = context;

    ionFireEvent.click(getByTestId('add-reason-button'));

    expect(queryByTestId('new-reason-modal')).not.toBeNull();

    await act(async () => {
      const inputArea = await findByTestId('new-reason-form-text-area');
      ionFireEvent.ionChange(inputArea, reasonText);

      const submitButton = getByTestId('new-reason-form-submit');
      ionFireEvent.submit(submitButton!);
    });

    expect(queryByTestId('new-reason-modal')).toBeNull();
  });

  it('closes the modal when clicking on the close modal button', async () => {
    const { getByTestId, queryByTestId } = context;

    ionFireEvent.click(getByTestId('add-reason-button'));

    expect(queryByTestId('new-reason-modal')).not.toBeNull();

    await act(async () => {
      const closeModalButton = getByTestId('new-reason-modal-close-button');
      ionFireEvent.click(closeModalButton!);
    });

    expect(queryByTestId('new-reason-modal')).toBeNull();
  });

  it('calls onAddReason prop when submiting the form with the reason text', async () => {
    const reasonText = 'Random Text';

    const { getByTestId, findByTestId } = context;

    ionFireEvent.click(getByTestId('add-reason-button'));

    await act(async () => {
      const inputArea = await findByTestId('new-reason-form-text-area');
      ionFireEvent.ionChange(inputArea, reasonText);

      const submitButton = getByTestId('new-reason-form-submit');
      ionFireEvent.submit(submitButton!);
    });

    expect(onAddReason).toHaveBeenCalledWith(reasonText);
  });

  it('does not call onAddReason prop when closing the form', async () => {
    const reasonText = 'Random Text';

    const { getByTestId, findByTestId } = context;

    ionFireEvent.click(getByTestId('add-reason-button'));

    await act(async () => {
      const inputArea = await findByTestId('new-reason-form-text-area');
      ionFireEvent.ionChange(inputArea, reasonText);

      const closeModalButton = getByTestId('new-reason-modal-close-button');
      ionFireEvent.click(closeModalButton!);
    });

    expect(onAddReason).not.toHaveBeenCalled();
  });
});
