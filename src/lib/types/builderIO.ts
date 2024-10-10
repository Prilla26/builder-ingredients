import { BuilderElement } from '@builder.io/react';
import { PropsWithChildren } from 'react';

import { ExigoProduct, ImageData, Languages } from './utils';

export enum BuilderArticleHeroTypes {
  Dark = 'dark',
  Light = 'light',
  Untreated = 'untreated',
}

export enum BuilderNavItemTypes {
  AddToCart = 'addToCart',
  Link = 'link',
}

export enum BuilderNavItemLinkTypes {
  Article = 'article',
  Page = 'page',
  Product = 'product',
  ProductCategory = 'productCategory',
  External = 'external',
  Internal = 'internal',
}

export enum BuilderHorizontalPositions {
  Left = 'Left',
  Right = 'Right',
}

export type BuilderIOBlock = {
  '@type': '@builder.io/sdk:Element';
  component?: {
    name: string;
    options: {
      [key: string]: any;
    };
  };
  [key: string]: any;
};

export type BuilderIOModelProps = {
  type: string;
  id: string;
  model: string;
};

export type BuilderIOModelWithValueProps<
  ModelT extends string,
  DataT = unknown,
> = {
  [Key in ModelT]: {
    id: string;
    model: ModelT;
    value: {
      data: DataT;
      name: string;
      id?: string;
    };
  };
};

export type BuilderIOAttr<T = unknown> = T & {
  attributes?: {
    'builder-id': string;
    'builder-inline-styles': string;
    className: string;
    key: string;
  };
};

export type BuilderIOProps<T = unknown> = BuilderIOAttr<T> & {
  builderBlock?: BuilderElement;
  builderState?: object;
};

export type BuilderLocalizedValue<DataT = unknown> = {
  '@type': string;
  Default: DataT;
} & {
  [key in Languages]?: DataT;
};

export enum BuilderMediaSources {
  Upload = 'Upload',
  External = 'External',
}

export enum BuilderMediaTypes {
  Image = 'Image',
  Video = 'Video',
}

type BuilderNavMenuItemProductProps = {
  exigoProduct: {
    options: {
      data: ExigoProduct;
    };
  };
  url: string;
};

type BuilderNavMenuItemUrlProps = {
  url: string;
  title: string;
};

type BuilderNavMenuItemSlugProps = {
  slug: string;
  title: string;
};

type BuilderNavMenuItemReferenceProps<
  ModelT extends string,
  DataT = unknown,
> = {
  id: string;
  model: ModelT;
  value: {
    data: DataT;
    previewUrl: string;
  };
};

type BuilderNavMenuItemArticle = BuilderNavMenuItemReferenceProps<
  'article',
  BuilderNavMenuItemUrlProps
>;

type BuilderNavMenuItemPage = BuilderNavMenuItemReferenceProps<
  'page',
  BuilderNavMenuItemUrlProps
>;

type BuilderNavMenuItemProduct = BuilderNavMenuItemReferenceProps<
  'product',
  BuilderNavMenuItemProductProps
>;

type BuilderNavMenuItemProductCategory = BuilderNavMenuItemReferenceProps<
  'product-category',
  BuilderNavMenuItemSlugProps
>;

export type BuilderNavMenuItem = PropsWithChildren<{
  type: BuilderNavItemTypes;
  linkType: BuilderNavItemLinkTypes;
  article?: BuilderNavMenuItemArticle;
  page?: BuilderNavMenuItemPage;
  product?: BuilderNavMenuItemProduct;
  productCategory?: BuilderNavMenuItemProductCategory;
  url?: string;
  className?: string;
  image?: string;
}>;

export type BuilderNavMenu = {
  items: Array<BuilderNavMenuItem>;
  title: string;
  slug: string;
};

export type BuilderNavMenus = {
  [key: string]: BuilderNavMenu;
};

export type BuilderImageList = {
  items: Array<ImageData>;
};

export type BuilderImageLists = {
  [key: string]: BuilderImageList;
};

export type BuilderFaqCategory<ModelT extends string> = {
  id: string;
  model: ModelT;
  value: BuilderFaqCategoryProps;
};

export type BuilderFaqCategoryProps = {
  id: string;
  name: string;
  data: {
    name: string;
  };
};

export type BuilderConditionalMediaInputProps = {
  type: BuilderMediaTypes;
  source: BuilderMediaSources;
  url?: string;
  externalUrl?: string;
  alt: string;
};

export type BuilderReferenceProps<ModelT extends string> = {
  id: string;
  model: ModelT;
  value: BuilderReferenceValuesProps<ModelT>;
};

export type BuilderGenericReferenceProps<ModelT extends string = any> = {
  reference: BuilderReferenceProps<ModelT>;
};

export type BuilderReferenceValuesProps<DataT = unknown> = {
  id: string;
  name: string;
  data: DataT;
};

export const enum BuilderRegisterTypes {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  LongText = 'longText', // String type but with a multiline text field editor
  RichText = 'richText', // Displays a rich text editor and provides the value as html
  File = 'file', // Uploads a file and provides the value as a url string
  Color = 'color',
  Date = 'date',
  Email = 'email',
  Object = 'object',
  List = 'list',
  Reference = 'reference',
  URL = 'url',
}

export enum BuilderImageFitTypes {
  Contain = 'contain',
  Cover = 'cover',
}

export enum BuilderImageWidthTypes {
  Full = 'full',
  '1/4' = '1/4',
  '1/2' = '1/2',
  '1/3' = '1/3',
  '2/3' = '2/3',
}

export enum BuilderScreensTypes {
  Always = 'always',
  Xs = 'xs',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Never = 'never',
}

export enum BuilderVerticalPositions {
  Top = 'Top',
  Bottom = 'Bottom',
}

export enum LegalFileType {
  Upload = 'Upload',
  ExternalLink = 'External Link',
  InternalLink = 'Internal Link',
}
