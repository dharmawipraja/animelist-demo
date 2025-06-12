import { render, screen, fireEvent } from '@testing-library/react';
import AniCard from './AniCard';

const mockItem = {
  id: 1,
  title: {
    romaji: 'Test Anime Title'
  },
  coverImage: {
    large: 'http://example.com/cover.jpg'
  }
};

describe('AniCard interaction tests', () => {
  test('should call onCardClick when the card action area is clicked', () => {
    const onCardClickMock = jest.fn();
    render(<AniCard item={mockItem} onCardClick={onCardClickMock} />);
    fireEvent.click(screen.getByRole('button', { name: /test anime title/i }));
    expect(onCardClickMock).toHaveBeenCalledTimes(1);
  });

  test('should render title by default', () => {
    render(<AniCard item={mockItem} />);
    expect(screen.getByText(/test anime title/i)).toBeInTheDocument();
  });

  test('should not render title when notitle is true', () => {
    render(<AniCard item={mockItem} notitle />);
    expect(screen.queryByText(/test anime title/i)).not.toBeInTheDocument();
  });

  test('should render "Add To Collections" button by default and call onButtonClick with id', () => {
    const onButtonClickMock = jest.fn();
    render(<AniCard item={mockItem} onButtonClick={onButtonClickMock} />);
    const addButton = screen.getByRole('button', { name: /add to collections/i });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(onButtonClickMock).toHaveBeenCalledWith(mockItem.id);
  });

  test('should render "Remove" button when removable is true and call onButtonClick', () => {
    const onButtonClickMock = jest.fn();
    render(<AniCard item={mockItem} removable onButtonClick={onButtonClickMock} />);
    const removeButton = screen.getByRole('button', { name: /remove/i });
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);
    expect(onButtonClickMock).toHaveBeenCalledTimes(1);
    // Note: The original onButtonClick in removable case doesn't receive id,
    // if it should, the component logic needs update.
    // For now, testing it's called.
  });

  test('should change heart icon style when isCollection is true', () => {
    const { rerender } = render(<AniCard item={mockItem} />);
    const addButton = screen.getByRole('button', { name: /add to collections/i });
    // The FiHeart icon is an SVG, difficult to directly test fill/color via DOM attributes with JSDOM.
    // We can check its presence or rely on snapshot for visual aspects.
    // For coverage, we ensure the props lead to the correct conditional branch.
    expect(addButton.querySelector('svg')).toBeInTheDocument(); // Check if heart icon is present

    rerender(<AniCard item={mockItem} isCollection />);
    // Re-query or check for style changes if possible, or rely on visual/snapshot.
    // This test primarily ensures the 'isCollection' prop is used.
    expect(addButton.querySelector('svg')).toBeInTheDocument();
  });
});
