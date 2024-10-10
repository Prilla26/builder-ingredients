import { IngredientCardProps } from 'components/ingredient-card';

export const ingredient: IngredientCardProps = {
  image: {
    url: 'images/temp-ingredient.png',
    alt: 'Detailed view of Whey Protein',
  },
  name: 'Whey Protein',
  shortDetail: 'A common protein supplement',
  children:
    'Whey protein is a mixture of proteins isolated from whey, the liquid part of milk that separates during cheese production.\n Whey protein contains an incredible range of essential amino acids, which are absorbed quickly into the body. Numerous studies show that it can help you increase strength, gain muscle, and lose significant amounts of body fat.\n It’s particularly high in important branched-chain amino acids (BCAAs) like leucine, which studies show is the most anabolic (growth-promoting) amino acid, and cysteine, which can help boost levels of the cellular antioxidant glutathione.',
  productTags: [
    {
      name: 'Immunocal',
      href: '/products/immunocal',
      color: '#0033A1',
    },
    {
      name: 'Immunocal Platinum',
      href: '/products/immunocal-platinum',
      color: '#9EA1A2',
    },
    {
      name: 'Immunocal Sport',
      href: '/products/immunocal-sport',
      color: '#000',
    },
  ],
  id: 'featured-ingredient-whey-protein',
};
