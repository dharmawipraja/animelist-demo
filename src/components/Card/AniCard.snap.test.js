import renderer from 'react-test-renderer';
import AniCard from './AniCard';

let props = {
  item: {
    id: 1,
    title: {
      romaji: 'Test Title'
    },
    description: 'This is description',
    bannerCover: 'http://banner-cover.mock',
    coverImage: {
      large: 'http://banner-cover.mock',
      color: 'white'
    }
  },
  notitle: false,
  onCardClick: jest.fn(), 
  removable: false,
  onButtonClick: jest.fn(),
  isCollection: false
};

describe('AniCard', () => {
  it('should renders AniCard component', () => {
    const tree = renderer
      .create(<AniCard {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should renders AniCard component when it is on collections', () => {
    props = {
      ...props,
      isCollection: true
    };

    const tree = renderer
      .create(<AniCard {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should renders AniCard component when no title', () => {
    props = {
      ...props,
      notitle: true
    };

    const tree = renderer
      .create(<AniCard {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
