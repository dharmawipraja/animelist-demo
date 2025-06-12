import renderer from 'react-test-renderer';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('should renders Pagination component', () => {
    const props = {
      pageInfo: {
        total: 10
      },
      page: 1,
      onPageChange: jest.fn()
    };

    const tree = renderer
      .create(<Pagination {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
