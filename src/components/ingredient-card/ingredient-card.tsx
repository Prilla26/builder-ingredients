import Image from 'next/image';
import { PropsWithChildren } from 'react';

import { IconButton } from 'components/base/button';
import {
  Body,
  BodyGroup,
  BodyLines,
  Heading,
} from 'components/base/typography';
import { ProductTagProps } from 'components/product-tag/product-tag';
import ProductTags from 'components/product-tags';
import { StyledDrawer } from 'components/styled-drawer';
import { useCreateId } from 'lib/hooks/useCreateId';

import type { ImageData } from 'lib/types/utils';

export type Props = PropsWithChildren<{
  image: ImageData;
  name: string;
  shortDetail: string;
  productTags: Array<ProductTagProps>;
  id?: string;
}>;

export default function IngredientCard({
  children,
  image,
  name,
  shortDetail,
  productTags,
}: Props): JSX.Element {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Image
        src={image.url}
        alt={image.alt}
        width={357}
        height={255}
        className="w-full h-auto"
      />
      <div className="flex flex-col gap-3">
        <div className="flex w-full gap-6 items-center">
          <Heading level={3} size="sm" className="flex-grow">
            {name}
          </Heading>
          <StyledDrawer
            trigger={
              <IconButton
                id={useCreateId(name, 'ingredient-card', true)}
                type="secondary"
                iconName="PlusOutlined"
              />
            }>
            <div className="bg-8 flex flex-col gap-8 lg:pb-16">
              <Image
                src={image.url}
                alt={image.alt}
                width={357}
                height={255}
                className="w-full h-auto"
              />
              <div className="flex flex-col gap-4">
                <Heading level={1} size="sm">
                  {name}
                </Heading>
                <BodyGroup>
                  <BodyLines>{children}</BodyLines>
                </BodyGroup>
              </div>
              <ProductTags items={productTags} />
            </div>
          </StyledDrawer>
        </div>
        <Body size="sm" className="line-clamp-3">
          {shortDetail}
        </Body>
      </div>
    </div>
  );
}
