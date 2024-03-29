import { act, render, RenderResult } from '@testing-library/react';
import ReasonsList from '../ReasonsList';
import { Reason } from '../models';
import { ionFireEvent } from '@ionic/react-test-utils';

describe('ReasonsList', () => {
  const reasons: Reason[] = [
    { text: 'Reason 1', id: 1 },
    { text: 'Reason 2', id: 2 },
    { text: 'Reason 3', id: 3 },
  ];
  let onAddReason: jest.Mock;
  let onDeleteReason: jest.Mock;
  let onEditReason: jest.Mock;
  let context: RenderResult;

  beforeEach(() => {
    onAddReason = jest.fn().mockName('onAddReason');
    onDeleteReason = jest.fn().mockName('onDeleteReason');
    onEditReason = jest.fn().mockName('onEditReason');

    context = render(
      <ReasonsList
        title="Whatever"
        reasons={reasons}
        onAddReason={onAddReason}
        onMoveReason={() => {}}
        onDeleteReason={onDeleteReason}
        onEditReason={onEditReason}
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

  it('calls onAddReason prop when submiting the form when no reason prop is passed', async () => {
    const reasonText = 'Random Text';

    const { getByTestId, findByTestId } = context;

    ionFireEvent.click(getByTestId('add-reason-button'));

    await act(async () => {
      const inputArea = await findByTestId('new-reason-form-text-area');
      ionFireEvent.ionChange(inputArea, reasonText);

      const submitButton = getByTestId('new-reason-form-submit');
      ionFireEvent.submit(submitButton!);
    });

    expect(onAddReason).toHaveBeenCalledWith({
      text: reasonText,
      id: 4,
    });
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

  it('shows the total of reasons', () => {
    const { queryByText } = context;

    expect(queryByText(3)).not.toBeNull();
  });

  it('allows to remove a reason', () => {
    const { queryAllByTestId } = context;

    act(() => {
      ionFireEvent.click(queryAllByTestId('delete-button')![0]);
    });

    expect(onDeleteReason).toHaveBeenCalledWith(reasons[0]);
  });

  it('shows a modal with a filled form when clicking on a reason card', () => {
    const { queryAllByTestId, queryByTestId } = context;

    ionFireEvent.click(queryAllByTestId('reason')![0]);

    expect(queryByTestId('new-reason-modal')).not.toBeNull();
    expect(
      queryByTestId('new-reason-form-text-area')!.getAttribute('value'),
    ).toBe('Reason 1');
  });

  it('allows to rename a reason', async () => {
    const { queryAllByTestId, findByTestId, getByTestId } = context;
    const editedReasonText = 'Edited 1';

    act(() => {
      ionFireEvent.click(queryAllByTestId('reason')![0]);
    });

    await act(async () => {
      const inputArea = await findByTestId('new-reason-form-text-area');
      ionFireEvent.ionChange(inputArea, editedReasonText);

      const submitButton = getByTestId('new-reason-form-submit');
      ionFireEvent.submit(submitButton!);
    });

    expect(onEditReason).toHaveBeenCalledWith({
      text: editedReasonText,
      id: 1,
    } as Reason);
  });

  it('does not throw an error when two reasons have the same key', () => {
    context.unmount();

    console.error = jest.fn();

    render(
      <ReasonsList
        title="Whatever"
        reasons={[
          { id: 1, text: 'Repeated Text' },
          { id: 2, text: 'Repeated Text' },
        ]}
        onAddReason={onAddReason}
        onMoveReason={() => {}}
        onDeleteReason={onDeleteReason}
        onEditReason={onEditReason}
      />,
    );

    expect(console.error).not.toHaveBeenCalled();
  });
});
