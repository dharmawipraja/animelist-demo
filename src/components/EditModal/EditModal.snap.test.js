import renderer from 'react-test-renderer';
import { useForm } from 'react-hook-form';

import EditModal from './EditModal';

jest
  .mock('react-hook-form', () => ({
    useForm: jest.fn()
  }))
  .mock('@mui/material/Modal', () => 'Modal')

describe('EditModal', () => {
  it('should renders EditModal component', () => {
    const props = {
      title: 'Edit Modal',
      isOpen: true,
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      isCreate: false
    };

    useForm.mockReturnValue({
      register: jest.fn(),
      watch: jest.fn(),
      reset: jest.fn(),
      setError: jest.fn(),
      formState: { errors: {} }
    });

    const tree = renderer.act(() => {
      renderer
        .create(<EditModal {...props} />, { createNodeMock: node => document.createElement(node.type) })
        .toJSON();
    })
    expect(tree).toMatchSnapshot();
  });
});
