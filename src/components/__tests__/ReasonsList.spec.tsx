import { render, RenderResult, screen } from '@testing-library/react';
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
        // onAddReason={onAddReason}
      />,
    );
  });

  it('shows the title passed as a prop', () => {
    const { queryByText } = context;

    expect(queryByText('Whatever')).not.toBeNull();
  });

  it('displays the reasons', () => {
    const { queryByText } = context;

    expect(queryByText(reasons[0].text)).not.toBeNull();
    expect(queryByText(reasons[1].text)).not.toBeNull();
    expect(queryByText(reasons[2].text)).not.toBeNull();
  });

  it('does not show a modal if the add button has not been pressed', () => {
    const { queryByTestId } = context;

    expect(queryByTestId('new-reason-modal')).toBeNull();
  });

  it('shows a new reason form when clicking on the add button', () => {
    const { queryByTestId } = context;

    ionFireEvent.click(queryByTestId('add-reason-button')!);

    expect(queryByTestId('new-reason-modal')).not.toBeNull();
  });

  it('adds a reason when submiting the form', () => {});

  it('does not add a reason when cancelling the form', () => {});
});
