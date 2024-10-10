import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

import Container from 'components/app-layout/container';
import Button from 'components/base/button';
import PrevNextButtons from 'components/base/button/prev-next';
import {
  BaseCarousel,
  Props as BaseCarouselProps,
} from 'components/base/carousel/base-carousel/base-carousel';
import { Show } from 'components/base/show';
import {
  Heading,
  Highlight,
  getHighlightFromStringMixed,
} from 'components/base/typography';
import GradientFade from 'components/gradient-fade';
import { useCreateId } from 'lib/hooks/useCreateId';
import { BuilderIOAttr } from 'lib/types/builderIO';
import { DataTestIdType } from 'lib/types/utils';

import type { ScreenMap } from 'antd/lib/_util/responsiveObserver';
import type { Props as TextBlockProps } from 'components/base/text-block/text-block';

export enum CarouselOverflowSlides {
  From1To3 = 'from1to3',
  From3To3 = 'from3to3',
  From2To4 = 'from2to4',
}

const MAX_SLIDES = {
  [CarouselOverflowSlides.From1To3]: 3,
  [CarouselOverflowSlides.From3To3]: 3,
  [CarouselOverflowSlides.From2To4]: 4,
};

export type Props<T> = BaseCarouselProps<T> &
  Required<Pick<TextBlockProps, 'heading'>> &
  Pick<TextBlockProps, 'headingProps'> &
  BuilderIOAttr<{
    hasGradientFade?: boolean;
    slides?: CarouselOverflowSlides;
    viewAll: {
      url: string;
      label: string;
    };
  }> &
  DataTestIdType;

function getSlidesPerView(
  slides: CarouselOverflowSlides,
  { sm, md, lg }: ScreenMap,
) {
  if (slides === CarouselOverflowSlides.From1To3)
    return lg ? 'auto' : sm ? 2 : 1;
  if (slides === CarouselOverflowSlides.From3To3) return lg ? 'auto' : 3;
  if (slides === CarouselOverflowSlides.From2To4)
    return lg ? 'auto' : md ? 4 : sm ? 3 : 2;
}

type CarouselProps = Omit<Props<any>, 'attributes' | 'viewAll'> & {
  includeRightMargin?: boolean;
  viewAll?: {
    url: string;
    label: string;
  };
};

export const Carousel = ({
  hasGradientFade = false,
  heading,
  headingProps,
  navigationKey,
  items,
  lastSlideMobile,
  slides = CarouselOverflowSlides.From2To4,
  viewAll,
  renderItem,
  keyExtractor,
  dataTest,
  includeRightMargin = true,
}: CarouselProps): JSX.Element => {
  const maxSlides = MAX_SLIDES[slides];
  const createdId = useCreateId('view-all-button', 'carouselOverflow', true);

  const [hasOverflow, setHasOverflow] = useState<boolean>(
    items.length > maxSlides,
  );

  const screens = useBreakpoint();

  const highlightProps = {
    ...getHighlightFromStringMixed(heading || ''),
    wrapper: { Component: Heading, props: { ...headingProps } },
  };

  return (
    <>
      <Show when={hasGradientFade}>
        <GradientFade />
      </Show>
      <Container className="flex items-center justify-between gap-4">
        <Highlight {...highlightProps} />
        <nav className="flex items-center gap-6">
          {items.length > 1 && (
            <PrevNextButtons
              parentTestId={dataTest}
              leftClassName={`prev-${navigationKey}`}
              rightClassName={`next-${navigationKey}`}
            />
          )}
          {viewAll && (
            <Link id={createdId} href={viewAll.url} className="no-underline">
              <Button
                dataTest={dataTest + '-view-all-button'}
                iconClassName="arrowRightOutlined"
                className="-md:hidden">
                {viewAll.label}
              </Button>
            </Link>
          )}
        </nav>
      </Container>
      <Container className="mt-6 lg:mt-8">
        <BaseCarousel
          className={classNames('overflow-shadow-r', {
            'has-overflow': hasOverflow,
            '-mr-carousel-overflow': includeRightMargin,
          })}
          slidesPerView={getSlidesPerView(slides, screens)}
          items={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          navigationKey={navigationKey}
          lastSlideMobile={lastSlideMobile}
          slideClassName={classNames('h-auto', {
            'lg:max-w-container-4/12': maxSlides === 3,
            'lg:max-w-container-3/12': maxSlides === 4,
          })}
          onSlideChange={swiper =>
            setHasOverflow(
              swiper.activeIndex < swiper.slides.length - maxSlides,
            )
          }
          breakpoints={{
            1372: {
              slidesOffsetAfter: items.length > maxSlides ? 102 : 0,
            },
          }}
        />
      </Container>
    </>
  );
};

export function CarouselOverflow<T>({
  hasGradientFade = false,
  heading,
  headingProps,
  navigationKey,
  items,
  lastSlideMobile,
  slides = CarouselOverflowSlides.From2To4,
  viewAll,
  renderItem,
  keyExtractor,
  attributes,
  dataTest,
}: Props<T>): JSX.Element {
  const { className: builderClassName, ...builderProps } = attributes || {};

  return (
    <section
      data-test={dataTest}
      {...builderProps}
      className={classNames(builderClassName, 'relative', {
        'my-section': !hasGradientFade,
        'py-section section-collapse': hasGradientFade,
      })}>
      <Carousel
        heading={heading}
        items={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        navigationKey={navigationKey}
        viewAll={viewAll}
        headingProps={headingProps}
        lastSlideMobile={lastSlideMobile}
        slides={slides}
      />
    </section>
  );
}
