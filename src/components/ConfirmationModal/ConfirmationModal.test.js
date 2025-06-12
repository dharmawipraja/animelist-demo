import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmationModal from './ConfirmationModal';

describe('ConfirmationModal interaction tests', () => {
  const mockTitle = 'Test Title';
  const mockSubtitle = 'Test Subtitle';
  let mockOnClose;
  let mockOnConfirm;

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockOnConfirm = jest.fn();
  });

  test('should render title and subtitle when isOpen is true', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title={mockTitle}
        subtitle={mockSubtitle}
      />
    );
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockSubtitle)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  test('should not render when isOpen is false', () => {
    render(
      <ConfirmationModal
        isOpen={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title={mockTitle}
        subtitle={mockSubtitle}
      />
    );
    // The dialog itself might still be in the DOM but hidden.
    // We check for the absence of its content.
    expect(screen.queryByText(mockTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(mockSubtitle)).not.toBeInTheDocument();
  });

  test('should call onClose when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title={mockTitle}
        subtitle={mockSubtitle}
      />
    );
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  test('should call onConfirm when Confirm button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title={mockTitle}
        subtitle={mockSubtitle}
      />
    );
    await user.click(screen.getByRole('button', { name: /confirm/i }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('should call onClose when Dialog requests close (e.g. Escape key)', () => {
    // This test relies on Material UI Dialog's built-in behavior for onClose.
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title={mockTitle}
        subtitle={mockSubtitle}
      />
    );
    // Find the Dialog role. MUI Dialogs typically have a role of 'dialog'.
    // The event needs to be fired on an element that can receive focus within the dialog.
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
