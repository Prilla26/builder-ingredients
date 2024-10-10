import Container from 'components/app-layout/container';
import Button from 'components/base/button';
import PrevNextButtons from 'components/base/button/prev-next';
import { Show } from 'components/base/show';
import { Heading, HeadingProps } from 'components/base/typography';
import { useCreateId } from 'lib/hooks/useCreateId';
import { useIsMobile } from 'lib/hooks/useIsMobile';

import 'swiper/css';
import {
  BaseCarousel,
  Props as BaseProps,
} from '../base-carousel/base-carousel';

type Props<T> = BaseProps<T> & {
  heading: string;
  headingLevel?: HeadingProps['level'];
  buttonLabel: string;
};

export function TopAccessoriesCarousel<T>(props: Props<T>) {
  const { heading, buttonLabel, headingLevel = 5, ...baseProps } = props;
  const isMobile = useIsMobile();
  return (
    <>
      <Container className="flex justify-between items-center pt-1 mb-6 lg:mb-8 lg:pt-1.5">
        <Heading size="sm" level={headingLevel}>
          {heading}
        </Heading>
        <div className="flex justify-between items-center gap-6">
          <PrevNextButtons
            /* these classNames should match the ones in the prevEl and nextEl keys in the navigation prop in Swiper, because they are used to control the navigation */
            leftClassName={`prev-${baseProps.navigationKey}`}
            rightClassName={`next-${baseProps.navigationKey}`}
          />
          <Show when={!isMobile}>
            <Button
              id={useCreateId(
                'shop-all-button',
                'topAccessoriesCarousel',
                true,
              )}
              iconName="ArrowRightOutlined"
              type="secondary-accent">
              {buttonLabel}
            </Button>
          </Show>
        </div>
      </Container>
      <Container className="lg:mr-0">
        <BaseCarousel {...baseProps} />
      </Container>
    </>
  );
}
