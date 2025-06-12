import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CollectionsModal from './CollectionsModal';
import * as localStorageUtils from '../../utils/localStorage';
import * as collectionUtils from '../../utils/collectionUtils';
import * as inputValidationUtils from '../../utils/inputValidation';
import { ToastProvider } from '../../context/Toast/ToastContext'; // Assuming ToastProvider is the correct export

const mockData = { id: 100, title: 'Test Anime Data' };
const mockCollectionList = ['Existing Collection 1'];

const renderWithProviders = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <ToastProvider {...providerProps}>
      {ui}
    </ToastProvider>,
    renderOptions
  );
};

describe('CollectionsModal', () => {
  let mockCollections = [];

  beforeEach(() => {
    // Reset mocks for each test
    mockCollections = [
      { id: '1', title: 'Existing Collection 1', animes: [] },
      { id: '2', title: 'Existing Collection 2', animes: [] },
    ];
    jest.spyOn(localStorageUtils, 'getFromLocalStorage').mockImplementation((key) => {
      if (key === 'collections') {
        return mockCollections;
      }
      return [];
    });
    jest.spyOn(localStorageUtils, 'saveToLocalStorage').mockImplementation(jest.fn());
    jest.spyOn(collectionUtils, 'addCollectionList').mockImplementation((collections, checked, data) => {
      // Simulate adding to collection
      return collections.map(c => {
        if (checked.includes(c.title)) {
          return { ...c, animes: [...c.animes, data] };
        }
        return c;
      });
    });
    jest.spyOn(collectionUtils, 'createNewCollection').mockImplementation((collections, newName) => {
        // Simulate creating a new collection
        return [...collections, { id: Date.now().toString(), title: newName, animes: [] }];
    });
    jest.spyOn(inputValidationUtils, 'validateCollectionNameForm').mockReturnValue(true); // Assume valid by default
    jest.spyOn(inputValidationUtils, 'isButtonDisabled').mockReturnValue(false); // Assume not disabled by default
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render modal with title and collections when open', () => {
    renderWithProviders(
      <CollectionsModal data={mockData} isOpen={true} onClose={jest.fn()} collectionList={mockCollectionList} />
    );
    expect(screen.getByText('Add To Collections')).toBeInTheDocument();
    expect(screen.getByText('Existing Collection 1')).toBeInTheDocument();
    expect(screen.getByText('Existing Collection 2')).toBeInTheDocument();
  });

  test('should not render when isOpen is false', () => {
    const { container } = renderWithProviders(
      <CollectionsModal data={mockData} isOpen={false} onClose={jest.fn()} collectionList={mockCollectionList} />
    );
    // Check if the main modal box is not present or not visible
    expect(screen.queryByText('Add To Collections')).not.toBeInTheDocument();
  });

  test('should call onClose when modal is closed', () => {
    const onCloseMock = jest.fn();
    renderWithProviders(
      <CollectionsModal data={mockData} isOpen={true} onClose={onCloseMock} collectionList={mockCollectionList} />
    );
    // Simulate closing the modal (e.g., by clicking backdrop or an explicit close button if one existed)
    // MUI Modal's close can be triggered by pressing Escape key
    fireEvent.keyDown(screen.getByRole('presentation').firstChild, { key: 'Escape', code: 'Escape' });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('should allow creating a new collection', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CollectionsModal data={mockData} isOpen={true} onClose={jest.fn()} collectionList={mockCollectionList} />
    );

    await user.click(screen.getByRole('button', { name: /create new collection/i }));
    expect(screen.getByLabelText(/collection name/i)).toBeInTheDocument();

    const collectionNameInput = screen.getByLabelText(/collection name/i);
    const newCollectionName = 'My New Awesome Collection';
    await user.type(collectionNameInput, newCollectionName);

    // Mock that validation passes
    inputValidationUtils.validateCollectionNameForm.mockReturnValue(true);
    // Mock button not being disabled
    inputValidationUtils.isButtonDisabled.mockReturnValue(false);

    // Re-render or update component state if necessary for button to be enabled
    // For simplicity, assuming direct click works if mocks are set up
    const saveButton = screen.getByTestId('FiSave'); // Assuming you add data-testid="FiSave" to the FiSave icon
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(collectionUtils.createNewCollection).toHaveBeenCalledWith(mockCollections, newCollectionName);
      expect(localStorageUtils.saveToLocalStorage).toHaveBeenCalled();
    });
    // Check if the create collection form is hidden
    expect(screen.queryByLabelText(/collection name/i)).not.toBeInTheDocument();
  });

  test('should show validation error for empty collection name', async () => {
    const user = userEvent.setup();
    inputValidationUtils.validateCollectionNameForm.mockImplementation((form, name, setError) => {
        if (!name || name.trim() === "") {
            setError(form, { type: 'required', message: 'Collection name cannot be empty.' });
            return false;
        }
        return true;
    });

    renderWithProviders(
      <CollectionsModal data={mockData} isOpen={true} onClose={jest.fn()} collectionList={mockCollectionList} />
    );
    await user.click(screen.getByRole('button', { name: /create new collection/i }));

    const saveButton = screen.getByTestId('FiSave'); // Add data-testid="FiSave"
    fireEvent.click(saveButton); // Click with empty name

    expect(await screen.findByText('Collection name cannot be empty.')).toBeInTheDocument();
    expect(collectionUtils.createNewCollection).not.toHaveBeenCalled();
  });

  test('should submit selected collections', async () => {
    const user = userEvent.setup();
    const onCloseMock = jest.fn();
    renderWithProviders(
      <CollectionsModal data={mockData} isOpen={true} onClose={onCloseMock} collectionList={mockCollectionList} />
    );

    // "Existing Collection 1" is already in collectionList, so its checkbox should be disabled
    const checkbox1 = screen.getByDisplayValue('Existing Collection 1');
    expect(checkbox1).toBeDisabled();

    // Select "Existing Collection 2"
    const checkbox2 = screen.getByDisplayValue('Existing Collection 2');
    await user.click(checkbox2); // Check the checkbox

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled(); // Should be enabled after selection

    await user.click(submitButton);

    expect(collectionUtils.addCollectionList).toHaveBeenCalledWith(
      mockCollections,
      ['Existing Collection 2'], // Only newly checked items
      mockData
    );
    expect(localStorageUtils.saveToLocalStorage).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    // Toast check would require more specific mocking of useToasts
  });

  test('submit button should be disabled if no collections are selected', () => {
    // Ensure no collections are pre-selected or part of collectionList that aren't disabled
    renderWithProviders(
      <CollectionsModal data={mockData} isOpen={true} onClose={jest.fn()} collectionList={['Existing Collection 1', 'Existing Collection 2']} />
    );
    // Both are in collectionList, so both checkboxes should be disabled, and no new selections possible
    // Or, if collectionList is empty:
    // renderWithProviders(
    //   <CollectionsModal data={mockData} isOpen={true} onClose={jest.fn()} collectionList={[]} />
    // );
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test('should toggle create collection form visibility', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CollectionsModal data={mockData} isOpen={true} onClose={jest.fn()} collectionList={mockCollectionList} />
    );
    const createButton = screen.getByRole('button', { name: /create new collection/i });

    // Open form
    await user.click(createButton);
    expect(screen.getByLabelText(/collection name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

    // Close form by clicking Cancel
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByLabelText(/collection name/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create new collection/i })).toBeInTheDocument();
  });

});

// Add data-testid="FiSave" to the FiSave icon in CollectionsModal.js for the save button test:
// <FiSave data-testid="FiSave" ... />
// Also, the ToastContext might need to be properly mocked or provided if useToasts is critical.
// For now, using ToastProvider.
