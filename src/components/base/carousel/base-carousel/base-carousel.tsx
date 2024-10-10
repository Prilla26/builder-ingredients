import c from 'classnames';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { useClientSSR } from 'lib/hooks/useClientSSR';
import { useIsMobile } from 'lib/hooks/useIsMobile';

import 'swiper/css';

export type Props<T> = {
  items: T[];
  renderItem: (arg: { item: T; index: number }) => JSX.Element;
  keyExtractor: (arg: T, index: number) => string | number;
  navigationKey: string;
  className?: string;
  slideClassName?: string;
  lastSlideMobile?: JSX.Element;
} & Omit<SwiperProps, 'modules' | 'navigation'>;

function mapItems<T>(
  item: Props<T>['items'][number],
  renderItem: Props<T>['renderItem'],
  keyExtractor: Props<T>['keyExtractor'],
  index: number,
  className?: string,
) {
  return (
    <SwiperSlide key={keyExtractor(item, index)} className={className}>
      {renderItem({ item, index })}
    </SwiperSlide>
  );
}

export function BaseCarousel<T>(props: Props<T>) {
  const {
    items,
    className,
    slideClassName,
    renderItem,
    keyExtractor,
    navigationKey,
    lastSlideMobile,
    ...swiperProps
  } = props;

  const isMobile = useIsMobile();

  // use the value of the --gutter variable if no space between is defined
  const { window, document } = useClientSSR();
  const gutterValue = window
    .getComputedStyle(document?.documentElement)
    .getPropertyValue('--gutter');
  const gutter = parseInt(gutterValue, 10);
  if (typeof swiperProps.spaceBetween === 'undefined')
    swiperProps.spaceBetween = gutter;

  return (
    <Swiper
      modules={[Navigation]}
      // these classNames should match the ones in PrevNextButtons for leftClassName and rightClassName, because they are used to control the navigation
      navigation={{
        prevEl: `.prev-${navigationKey}`,
        nextEl: `.next-${navigationKey}`,
      }}
      className={c(className)}
      {...swiperProps}>
      {items.map((item, index) =>
        mapItems(item, renderItem, keyExtractor, index, slideClassName),
      )}
      {isMobile && lastSlideMobile && (
        <SwiperSlide>{lastSlideMobile}</SwiperSlide>
      )}
    </Swiper>
  );
}
