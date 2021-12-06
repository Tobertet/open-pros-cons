import { render, RenderResult } from '@testing-library/react';
import ReasonList from '../ReasonList';
import { expect } from '@jest/globals';

describe('ReasonList', () => {
  const reasons: string[] = ['Reason 1', 'Reason 2', 'Reason 3'];
  let onAddReason: jest.Mock;
  let context: RenderResult;

  beforeEach(() => {
    onAddReason = jest.fn().mockName('onAddReason');

    context = render(
      <ReasonList reasons={reasons} onAddReason={onAddReason} />,
    );
  });

  it('displays the reasons', () => {
    const { queryByText } = context;
    module.exports = {
      extends: ['react-app', 'prettier'],
      plugins: ['prettier', 'jest', 'cypress'],
      parser: 'babel-eslint',
      env: {
        browser: true,
        'cypress/globals': true,
        es6: true,
        'jest/globals': true,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'prettier/prettier': 'warn',
      },
    };
    expect(queryByText(reasons[0])).not.toBeNull();
    expect(queryByText(reasons[1])).not.toBeNull();
    expect(queryByText(reasons[2])).not.toBeNull();
  });

  it('shows a form for adding a new reason', async () => {
    // const { queryByTestId } = context;
    // // queryByTestId("reason-list-add-button").click();
    // await new Promise((r) => setTimeout(r, 2000));
    // await waitFor(() => {
    //   new Promise((r) => setTimeout(r, 2000));
    //   expect(onAddReason).toHaveBeenCalled();
    // });
    // expect( await findByTestId("ASD")).not.toBeNull();
  });

  it('adds a reason when submiting the form', () => {});

  it('does not add a reason when cancelling the form', () => {});
});
