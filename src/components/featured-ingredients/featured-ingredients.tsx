import { Component } from '@builder.io/sdk';
import { useRouter } from 'next/router';

import {
  SideToSideCarousel,
  SideToSideCarouselProps,
} from 'components/base/carousel';
import { ShowBuilder } from 'components/base/show/show';
import { IngredientCardProps } from 'components/ingredient-card';
import IngredientCard from 'components/ingredient-card/ingredient-card';
import { useLocalizedValue } from 'lib/hooks/useLocalizedValue';
import {
  BuilderGenericReferenceProps,
  BuilderIOProps,
  BuilderLocalizedValue,
  BuilderRegisterTypes,
} from 'lib/types/builderIO';
import { colors } from 'lib/types/utils';
import { HeadingInput, PreHeadingInput } from 'lib/utils/builder';

type IngredientReferenceProps = BuilderGenericReferenceProps<'ingredient'>;

type Props = BuilderIOProps<
  Pick<
    SideToSideCarouselProps<IngredientCardProps>,
    'heading' | 'preHeading' | 'items'
  >
>;

type BuilderProps = Omit<Props, 'items'> & {
  items:
    | Array<IngredientReferenceProps>
    | BuilderLocalizedValue<Array<IngredientReferenceProps>>;
};

function getRandomColor(position: number) {
  return colors[position % colors.length];
}

function renderItem({ item }: { item: IngredientCardProps }): JSX.Element {
  return <IngredientCard {...item} />;
}

export function FeaturedIngredients({
  preHeading,
  heading,
  items,
  attributes,
}: Props): JSX.Element {
  return (
    <SideToSideCarousel
      attributes={attributes}
      preHeading={preHeading}
      heading={heading}
      items={items}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      navigationKey="featured-ingredients"
      renderItem={renderItem}
      slideClassName="-lg:max-w-[448px] w-full max-w-container-4/12"
      slidesOffsetAfter={0}
      slidesPerView="auto"
      breakpoints={{
        // screen xs + 32
        480: {
          slidesOffsetAfter: items.length > 1 ? 32 : 0,
        },
        768: {
          slidesOffsetAfter: items.length > 1 ? 32 : 0,
          spaceBetween: 64,
        },
      }}
    />
  );
}
function isNotLocalizedValue(value: unknown, locale: string): boolean {
  return Array.isArray(value) && locale && value[locale];
}

export default function BuilderComponent({
  attributes,
  preHeading,
  heading,
  items,
}: BuilderProps): JSX.Element {
  const { getLocalizedValue } = useLocalizedValue();
  const LOCALIZED_FIELDS = ['name', 'shortDetail'];
  const { locale } = useRouter();
  const componentItems = Array.isArray(items)
    ? items.reduce(
        (acc: IngredientCardProps[], item: IngredientReferenceProps) => {
          if (item.reference) {
            const { data } = item.reference.value as { data: any };
            LOCALIZED_FIELDS.forEach(field => {
              data[field] = getLocalizedValue(data[field]);
            });
            const ingredientCard = {
              ...data,
              productTags:
                data.products && data.products.length > 0
                  ? data.products
                      .map((prod, index) => {
                        if (isNotLocalizedValue(prod, locale || 'en-US'))
                          prod = prod[locale || 'en-US'];
                        return {
                          name: prod?.tag?.name,
                          href: prod?.tag?.url,
                          color: getRandomColor(index),
                        };
                      })
                      .filter(item => item.name !== undefined)
                  : [],
            } as unknown as IngredientCardProps;

            acc.push(ingredientCard as IngredientCardProps);
          }
          return acc;
        },
        [],
      )
    : [];

  return (
    <ShowBuilder
      whenProps={{ attributes, heading, items: componentItems, preHeading }}
      mandatoryProps={['heading']}
      render={FeaturedIngredients}
    />
  );
}

export const BuilderConfig: Component = {
  name: 'FeaturedIngredients',
  noWrap: true,
  inputs: [
    PreHeadingInput,
    HeadingInput,
    {
      name: 'items',
      type: BuilderRegisterTypes.List,
      copyOnAdd: false,
      localized: true,
      subFields: [
        {
          name: 'reference',
          type: BuilderRegisterTypes.Reference,
          model: 'ingredient',
          friendlyName: 'Ingredient',
          required: true,
        },
      ],
    },
  ],
  image:
    'https://cdn.builder.io/api/v1/image/assets%2Ffdb4d79bfbfd478d89398007f8c29424%2F8cc86bd55e3942c9bfc83dd1ca42b4fb',
  screenshot:
    'https://cdn.builder.io/api/v1/image/assets%2Ffdb4d79bfbfd478d89398007f8c29424%2F2f6f58ced72949c485197b51787c761f',
};
