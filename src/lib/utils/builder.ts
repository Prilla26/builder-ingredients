import { Input } from '@builder.io/sdk';

export const SCREEN_2_COL_CLASSES = {
  always: 'grid-cols-2',
  xs: 'xs:grid-cols-2',
  sm: 'sm:grid-cols-2',
  md: 'md:grid-cols-2',
  lg: 'lg:grid-cols-2',
  never: '',
};

export const SCREEN_3_COL_CLASSES = {
  always: 'grid-cols-3',
  xs: 'xs:grid-cols-3',
  sm: 'sm:grid-cols-3',
  md: 'md:grid-cols-3',
  lg: 'lg:grid-cols-3',
  xl: 'xl:grid-cols-3',
  never: '',
};

export const SCREEN_4_COL_CLASSES = {
  always: 'grid-cols-4',
  xs: 'xs:grid-cols-4',
  sm: 'sm:grid-cols-4',
  md: 'md:grid-cols-4',
  lg: 'lg:grid-cols-4',
  xl: 'xl:grid-cols-4',
  never: '',
};

export const ALLOWED_IMAGE_FILE_TYPES: Array<string> = ['jpeg', 'png', 'gif'];
// disabled as mixed video/image types are not workin g in builder SMH
// const allowedVideoFileTypes: Array<string> = ['mp4'];
// const allowedMediaFileTypes: Array<string> = [
//   ...allowedImageFileTypes,
//   ...allowedVideoFileTypes,
// ];

import {
  BuilderConditionalMediaInputProps,
  BuilderGenericReferenceProps,
  BuilderHorizontalPositions,
  BuilderImageFitTypes,
  BuilderImageWidthTypes,
  BuilderMediaSources,
  BuilderMediaTypes,
  BuilderNavItemLinkTypes,
  BuilderNavItemTypes,
  BuilderRegisterTypes,
  BuilderScreensTypes,
} from 'lib/types/builderIO';

export const disclaimerGroupChildRequirements = {
  message: 'Please remove unsupported inner blocks',
  query: {
    'component.name': {
      $in: ['DisclaimerGroup'],
    },
  },
};

export const basicChildRequirements = {
  message: 'Please remove unsupported inner blocks',
  query: {
    'component.name': {
      $in: ['DisclaimerGroup', 'RichText'],
    },
  },
};

export const legalChildRequirements = {
  message: 'Please remove unsupported inner blocks',
  query: {
    'component.name': {
      $in: ['DisclaimerGroup', 'Heading', 'RichText', 'UploadList'],
    },
  },
};

export const textBlockChildRequirements = {
  message: 'Please remove unsupported inner blocks',
  query: {
    'component.name': {
      $in: [
        'BlockQuote',
        'ButtonGroup',
        'CertificationGroup',
        'DisclaimerGroup',
        'Divider',
        'FeatureGroup',
        'Heading',
        'Media',
        'NumberedFeatureGroup',
        'RichText',
        'StatisticGroup',
      ],
    },
  },
};

export const BackgroundColorInput: Input = {
  name: 'backgroundColor',
  type: BuilderRegisterTypes.Color,
  localized: true,
};

export const BodyInput: Input = {
  name: 'body',
  friendlyName: 'Description',
  type: BuilderRegisterTypes.LongText,
  localized: true,
};

// when updating this update models that use it as well, e.g., Hero Carousel Item
export const ButtonOrLinkSubFields: Input['subFields'] = [
  {
    name: 'type',
    type: BuilderRegisterTypes.String,
    enum: Object.values(BuilderNavItemTypes),
    defaultValue: 'link',
    required: true,
  },
  {
    name: 'linkType',
    type: BuilderRegisterTypes.String,
    enum: Object.values(BuilderNavItemLinkTypes),
    showIf: `options.get('type') === 'link'`,
  },
  {
    name: 'article',
    type: BuilderRegisterTypes.Reference,
    model: 'article',
    required: true,
    showIf: `options.get('type') === 'link' && options.get('linkType') === 'article'`,
  },
  {
    name: 'page',
    type: BuilderRegisterTypes.Reference,
    model: 'page',
    required: true,
    showIf: `options.get('type') === 'link' && options.get('linkType') === 'page'`,
  },
  {
    name: 'product',
    type: BuilderRegisterTypes.Reference,
    model: 'product',
    required: true,
    showIf: `(options.get('type') === 'link' && options.get('linkType') === 'product') || options.get('type') === 'addToCart'`,
  },
  {
    name: 'productCategory',
    type: BuilderRegisterTypes.Reference,
    model: 'product-category',
    required: true,
    showIf: `options.get('type') === 'link' && options.get('linkType') === 'productCategory'`,
  },
  {
    name: 'url',
    type: BuilderRegisterTypes.String,
    showIf: `(options.get('type') === 'link' && options.get('linkType') === 'external')`,
  },
  // TODO once reference values are coming through, consider leave adding a
  // 'useTitleForLabel' option or similar for link types that pull the title
  // directly from the referenced data
  {
    name: 'children',
    friendlyName: 'Label',
    type: BuilderRegisterTypes.String,
    localized: true,
    required: true,
  },
];

// when updating this update models that use it as well, e.g., Hero Carousel Item
export const ButtonInput: Input = {
  name: 'button',
  type: BuilderRegisterTypes.Object,
  subFields: ButtonOrLinkSubFields,
};

export const ButtonInputNotLocalized: Input = {
  name: 'button',
  type: BuilderRegisterTypes.Object,
  subFields: [
    ...ButtonOrLinkSubFields.filter(field => field.name !== 'children'),
    {
      name: 'children',
      friendlyName: 'Label',
      type: BuilderRegisterTypes.String,
      required: true,
    },
  ],
};

export const ButtonGroupItemsInput: Input = {
  name: 'buttonGroupItems',
  type: BuilderRegisterTypes.List,
  helperText: 'Limit two buttons per group',
  subFields: ButtonOrLinkSubFields,
  copyOnAdd: false,
  localized: true,
  onChange: options => {
    if (options.get('items').length > 2)
      options.set('items', options.get('items').slice(0, 2));
  },
};

export const CiteInput: Input = {
  name: 'cite',
  type: BuilderRegisterTypes.String,
  friendlyName: 'Optional, URL to accredite the quote',
  localized: false,
};

// when updating this update models that use it as well, e.g., Hero Carousel Item
export const ConditionalMediaInput: Input = {
  name: 'conditionalMedia',
  friendlyName: 'Media',
  type: BuilderRegisterTypes.Object,
  required: true,
  subFields: [
    {
      name: 'type',
      type: BuilderRegisterTypes.String,
      enum: Object.values(BuilderMediaTypes),
      defaultValue: BuilderMediaTypes.Image,
    },
    {
      name: 'source',
      type: BuilderRegisterTypes.String,
      enum: Object.values(BuilderMediaSources),
      defaultValue: BuilderMediaSources.Upload,
      // couldn't get this to work with interpoloated vars
      // https://forum.builder.io/t/showif-in-subfields/2046
      showIf: `options.get('type') === 'Video'`,
    },
    {
      name: 'url',
      type: BuilderRegisterTypes.File,
      friendlyName: 'Photo or video',
      // @NOTE disabled for now, builder is not allowing video selection when image formats are also selected
      // allowedFileTypes: allowedMediaFileTypes,
      required: true,
      localized: true,
      // couldn't get this to work with interpoloated vars
      showIf: `options.get('type') === 'Image' || options.get('source') === 'Upload'`,
    },
    {
      name: 'externalUrl',
      type: BuilderRegisterTypes.String,
      friendlyName: 'URL',
      required: true,
      localized: true,
      // couldn't get this to work with interpoloated vars
      showIf: `options.get('type') === 'Video' && options.get('source') === 'External'`,
      helperText: 'E.g., https://vimeo.com/777542875',
    },
    {
      name: 'alt',
      type: BuilderRegisterTypes.String,
      required: true,
      localized: true,
      helperText: 'Sentence case, e.g., Close up view of whey protein',
    },
  ],
};

export const FadeBehindContentInput: Input = {
  name: 'fadeBehindContent',
  type: BuilderRegisterTypes.Boolean,
  friendlyName: 'Add a background fade behind content?',
  helperText: 'Applies only to larger screens',
  defaultValue: true,
  advanced: true,
  localized: false,
};

export const FadeColorInput: Input = {
  name: 'fadeColor',
  type: BuilderRegisterTypes.Color,
  defaultValue: '#000000',
  advanced: true,
  localized: true,
  showIf: options => options.get('fadeBehindContent') === true,
};

export const FadeOpacityInput: Input = {
  name: 'fadeOpacity',
  helperText: 'From 0 (transparent) to 100 (opaque)',
  type: BuilderRegisterTypes.Number,
  defaultValue: 50,
  min: 0,
  max: 100,
  advanced: true,
  localized: true,
  showIf: options => options.get('fadeBehindContent') === true,
};

export const HasBgInput: Input = {
  name: 'hasBg',
  friendlyName: 'Show background behind content?',
  type: BuilderRegisterTypes.Boolean,
};

export const HasGradientFadeInput: Input = {
  name: 'hasGradientFade',
  friendlyName: 'Show gradient at top?',
  type: BuilderRegisterTypes.Boolean,
};

export const HasHeadingInput: Input = {
  name: 'hasHeading',
  friendlyName: 'Show heading?',
  type: BuilderRegisterTypes.Boolean,
};

export const HasSearchAndFilterInput: Input = {
  name: 'hasSearchAndFilter',
  friendlyName: 'Allow search and filter?',
  type: BuilderRegisterTypes.Boolean,
};

export const HeadingInput: Input = {
  name: 'heading',
  type: BuilderRegisterTypes.Object,
  subFields: [
    {
      name: 'children',
      friendlyName: 'Heading text',
      type: BuilderRegisterTypes.String,
      localized: true,
      required: true,
    },
    {
      name: 'mark',
      friendlyName: 'Text to highlight',
      localized: true,
      type: BuilderRegisterTypes.String,
    },
  ],
};

export const HeadingInputNotLocalized: Input = {
  name: 'heading',
  type: BuilderRegisterTypes.Object,
  subFields: [
    {
      name: 'children',
      friendlyName: 'Heading text',
      type: BuilderRegisterTypes.String,
      required: true,
    },
    {
      name: 'mark',
      friendlyName: 'Text to highlight',
      type: BuilderRegisterTypes.String,
    },
  ],
};

export const ImageInput: Input = {
  name: 'image',
  type: BuilderRegisterTypes.Object,
  helperText: 'Images should 256×256px',
  subFields: [
    {
      name: 'url',
      type: BuilderRegisterTypes.File,
      friendlyName: 'Photo',
      allowedFileTypes: ALLOWED_IMAGE_FILE_TYPES,
      required: true,
      localized: true,
    },
    {
      name: 'alt',
      type: BuilderRegisterTypes.String,
      required: true,
      localized: true,
    },
  ],
};

export const ImageInputNotLocalized: Input = {
  name: 'image',
  type: BuilderRegisterTypes.Object,
  helperText: 'Images should 256×256px',
  subFields: [
    {
      name: 'url',
      type: BuilderRegisterTypes.File,
      friendlyName: 'Photo',
      allowedFileTypes: ALLOWED_IMAGE_FILE_TYPES,
      required: true,
    },
    {
      name: 'alt',
      type: BuilderRegisterTypes.String,
      required: true,
    },
  ],
};

export const FeaturesInput: Input = {
  name: 'items',
  friendlyName: 'Features',
  type: BuilderRegisterTypes.List,
  localized: true,
  copyOnAdd: false,
  subFields: [
    ImageInputNotLocalized,
    {
      ...HasHeadingInput,
      helperText:
        '(The description will be shown in a smaller text size when a heading is added)',
    },
    {
      ...HeadingInputNotLocalized,
      showIf: `options.get('hasHeading')`,
    },
    {
      ...BodyInput,
      type: BuilderRegisterTypes.RichText,
      localized: false,
    },
  ],
};

export const ImageFitInput: Input = {
  name: 'imageFit',
  type: BuilderRegisterTypes.String,
  // all imageFit options must be added to tailwind's safelist
  // e.g., 'object-contain', 'object-cover', etc
  enum: Object.values(BuilderImageFitTypes),
  defaultValue: BuilderImageFitTypes.Cover,
  localized: true,
};

export const ConditionalMediaImageFit: Input = {
  ...ImageFitInput,
  advanced: true,
  showIf: options => {
    return options.get('conditionalMedia').get('type') === 'Image';
  },
};

export const ImageWidthInput: Input = {
  name: 'imageWidth',
  type: BuilderRegisterTypes.String,
  // all imageWidth options must be added to tailwind's safelist
  // e.g., 'w-full', 'w-1/2', etc
  enum: Object.values(BuilderImageWidthTypes),
  defaultValue: 'full',
  localized: true,
};

export const ConditionalMediaImageWidthInput: Input = {
  ...ImageWidthInput,
  advanced: true,
  showIf: options => {
    return options.get('conditionalMedia').get('type') === 'Image';
  },
};

export const IsReversedInput: Input = {
  name: 'isReversed',
  type: BuilderRegisterTypes.Boolean,
  friendlyName: 'Reverse styles?',
  helperText: 'Enable when content is shown over dark backgrounds',
  localized: true,
};

export const IsStandaloneInput: Input = {
  name: 'isStandalone',
  advanced: true,
  friendlyName: '',
  type: BuilderRegisterTypes.Boolean,
  helperText: 'Enable if this component is not used as an inner block',
  defaultValue: false,
};

export const NavigationKeyInput: Input = {
  name: 'navigationKey',
  friendlyName: 'Unique ID',
  type: BuilderRegisterTypes.String,
  helperText:
    'Valid CSS class, e.g., sports-products. Only needed if adding multiple carousels to a single page.',
  advanced: true,
};

// @TODO deprecate for preHeading once all text block are migrated
export const PreheadingInput: Input = {
  name: 'preheading',
  type: BuilderRegisterTypes.String,
  required: false,
};

export const PreHeadingInput: Input = {
  name: 'preHeading',
  type: BuilderRegisterTypes.String,
  helperText: 'Optional',
  localized: true,
};

export const QuoteSourceInput: Input = {
  name: 'quoteSource',
  type: BuilderRegisterTypes.Object,
  subFields: [
    {
      name: 'author',
      type: BuilderRegisterTypes.String,
      localized: false,
      required: true,
    },
    {
      name: 'title',
      type: BuilderRegisterTypes.String,
      localized: true,
    },
  ],
};

export const RichTextInput: Input = {
  name: 'html',
  type: BuilderRegisterTypes.RichText,
  friendlyName: 'Content',
  helperText:
    'Does not support headings, underline, text/background colors, or indenting.',
  localized: true,
};

export const Screen2ColInput: Input = {
  name: 'screen2Col',
  friendlyName: 'Screen size to display with 2 columns',
  advanced: true,
  type: BuilderRegisterTypes.String,
  enum: Object.values(BuilderScreensTypes),
  defaultValue: 'lg',
  helperText: 'xs: 480px, sm: 576px, md: 768px, lg: 992px, xl: 1200px',
};

export const Screen3ColInput: Input = {
  name: 'screen3Col',
  friendlyName: 'Screen size to display with 3 columns',
  advanced: true,
  type: BuilderRegisterTypes.String,
  enum: Object.values(BuilderScreensTypes),
  defaultValue: 'never',
  helperText: 'xs: 480px, sm: 576px, md: 768px, lg: 992px, xl: 1200px',
};

export const Screen4ColInput: Input = {
  name: 'screen4Col',
  friendlyName: 'Screen size to display with 4 columns',
  advanced: true,
  type: BuilderRegisterTypes.String,
  enum: Object.values(BuilderScreensTypes),
  helperText: 'xs: 480px, sm: 576px, md: 768px, lg: 992px, xl: 1200px',
  defaultValue: 'never',
};

export const TextPositionInput: Input = {
  name: 'textPosition',
  friendlyName: 'Text position',
  type: BuilderRegisterTypes.String,
  enum: Object.values(BuilderHorizontalPositions),
  defaultValue: BuilderHorizontalPositions.Left,
  helperText: 'For larger screens only',
};

export function getConditionalVideoProps(
  conditionalMedia: BuilderConditionalMediaInputProps,
): {
  url?: string;
  light?: boolean;
  playing?: boolean;
} {
  const { source, url, externalUrl } = conditionalMedia;
  return source === BuilderMediaSources.Upload
    ? {
        url: url,
        light: false,
        playing: false,
      }
    : {
        url: externalUrl,
      };
}

export function getBuilderReferencesIds(
  references: Array<BuilderGenericReferenceProps>,
): Array<string> {
  return [
    ...new Set(
      references.reduce((acc: Array<string>, current) => {
        if (Object.hasOwn(current, 'reference')) acc.push(current.reference.id);
        return acc;
      }, []),
    ),
  ];
}

export function getBuilderReferencesSkus(
  references: Array<BuilderGenericReferenceProps>,
): Array<string> {
  return [
    ...new Set(
      references.reduce((acc: Array<string>, current) => {
        if (
          Object.hasOwn(current, 'reference') &&
          Object.hasOwn(current.reference.value, 'data')
        )
          acc.push(current.reference.value.data.sku);
        return acc;
      }, []),
    ),
  ];
}

export function getBuilderReferencesImageThumbnail(
  item: BuilderGenericReferenceProps,
): string {
  let sku: string = '';
  if (
    Object.hasOwn(item, 'reference') &&
    Object.hasOwn(item.reference.value, 'data')
  )
    sku = item.reference.value.data.imageThumbnail;
  return sku;
}

export function getBuilderReferencesSku(
  item: BuilderGenericReferenceProps,
): string {
  let sku: string = '';
  if (
    Object.hasOwn(item, 'reference') &&
    Object.hasOwn(item.reference.value, 'data')
  )
    sku = item.reference.value.data.sku;
  return sku;
}

export const getBuilderProductsQuery = locale => ({
  data: {
    $or: [
      { [`sku.${locale}`]: { $ne: null } },
      { [`sku.Default`]: { $nin: [null, '', "''", -1, '-1', '"-1"'] } },
    ],
    $and: [{ [`sku.${locale}`]: { $nin: ['', "''", -1, '-1', '"-1"'] } }],
  },
});
