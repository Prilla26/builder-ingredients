import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import Container from 'components/app-layout/container';
import PrevNextButtons from 'components/base/button/prev-next';
import { Show } from 'components/base/show';
import {
  TextBlock,
  Props as TextBlockProps,
} from 'components/base/text-block/text-block';
import { BuilderIOAttr } from 'lib/types/builderIO';

import {
  BaseCarousel,
  Props as BaseProps,
} from '../base-carousel/base-carousel';

type ExtraProps = PropsWithChildren<{
  className?: string;
  carouselClassName?: string;
}>;

export type Props<T> = BaseProps<T> &
  Required<Pick<TextBlockProps, 'heading'>> &
  Pick<TextBlockProps, 'preHeading'> &
  BuilderIOAttr<ExtraProps>;

type ControlsProps = {
  className?: string;
  navigationKey: string;
};

function Controls({ className, navigationKey }: ControlsProps): JSX.Element {
  return (
    <PrevNextButtons
      className={className}
      /* these classNames should match the ones in the prevEl and nextEl keys in the navigation prop in Swiper, because they are used to control the navigation */
      leftClassName={`prev-${navigationKey}`}
      rightClassName={`next-${navigationKey}`}
    />
  );
}

export function SideToSideCarousel<T>({
  preHeading,
  heading,
  children,
  className = '',
  carouselClassName = '',
  slideClassName = '',
  attributes,
  ...props
}: Props<T>): JSX.Element {
  return (
    <div className="w-full my-section">
      <Container
        attributes={attributes}
        className={classNames(
          'flex flex-col gap-6 grid-cols-12 lg:grid lg:gap-gutter',
          className,
        )}>
        <div className="col-span-4 h-100 flex-col justify-between lg:flex">
          <TextBlock preHeading={preHeading} heading={heading} />
          <Show when={children}>
            <div className="mt-gutter flex flex-col gap-gutter">{children}</div>
          </Show>
          <Controls
            className="mt-8 -lg:hidden"
            navigationKey={props.navigationKey}
          />
        </div>
        <div className="-lg:hidden col-span-1"></div>
        <div className="col-span-7">
          <div className="-lg:mr-auto -mr-container">
            <BaseCarousel
              {...props}
              className={carouselClassName}
              slideClassName={slideClassName}
            />
          </div>
        </div>
        <Controls className="lg:hidden" navigationKey={props.navigationKey} />
      </Container>
    </div>
  );
}
