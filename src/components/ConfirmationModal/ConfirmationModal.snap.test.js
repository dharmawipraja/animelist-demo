import renderer from 'react-test-renderer';
import ConfirmationModal from './ConfirmationModal';

jest.mock('@mui/material/Dialog', () => 'Dialog');

describe('ConfirmationModal', () => {
  it('should renders ConfirmationModal component', () => {
    const props = {
      isOpen: true,
      onClose: jest.fn(),
      onConfirm: jest.fn(),
      title: 'Confirmation Modal',
      subtitle: 'This is Confirmation Modal'
    };

    const tree = renderer
      .create(<ConfirmationModal {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
