import { Alert } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { Fragment, PropsWithChildren, isValidElement } from 'react';

import Container from 'components/app-layout/container';
import { BuilderIOProps } from 'lib/types/builderIO';
import { omitBuilderProps } from 'lib/utils/helper';

type Callback<ReturnT extends NonNullable<unknown>> = (
  ...args: unknown[]
) => ReturnT;

type When =
  | boolean
  | string
  | number
  | Exclude<NonNullable<unknown>, 'Function' | 'void'>
  | object
  | Callback<boolean | string | number | NonNullable<unknown>>;

type Props<ConditionalT extends When> = PropsWithChildren<{
  when: ConditionalT | undefined | null;
  evalFalsy?: boolean;
}>;

export function isFalsy<ConditionalT extends When>(
  elem: Props<ConditionalT>['when'],
): elem is null | undefined {
  if (
    elem === undefined ||
    elem === null ||
    elem === false ||
    (Array.isArray(elem) && elem.length === 0) ||
    (typeof elem === 'string' && elem === '') ||
    (isValidElement(elem) && isEmpty(elem.props) && elem.type === Fragment) ||
    (isValidElement<Props<ConditionalT>>(elem) && !elem.props.when)
  ) {
    return true;
  }

  return false;
}

export function isVisible<ConditionalT extends When>(
  when: Props<ConditionalT>['when'],
): when is NonNullable<ConditionalT> {
  const result = typeof when === 'function' ? when() : when;

  return result !== undefined && result !== null && !!result !== false;
}

export function Show<ConditionalT extends When>({
  when,
  children,
  evalFalsy = false,
}: Props<ConditionalT>): JSX.Element {
  const shouldShow = evalFalsy ? !isFalsy(when) : isVisible(when);
  return <>{shouldShow ? children : undefined}</>;
}

export function Hide<ConditionalT extends When>({
  when,
  children,
  evalFalsy = false,
}: Props<ConditionalT>): JSX.Element {
  const shouldHide = evalFalsy ? !isFalsy(when) : isVisible(when);

  return <>{shouldHide ? undefined : children}</>;
}

type ShowComponentProps<PropsT extends NonNullable<object>> = {
  render: (props: PropsT) => JSX.Element;
  whenProps: PropsT | null | undefined | Record<never, never>;
};

export function ShowComponent<PropsT extends NonNullable<object>>({
  render,
  whenProps,
}: ShowComponentProps<PropsT>): JSX.Element {
  return !isEmpty(whenProps) ? render(whenProps) : <></>;
}

type ShowBuilderProps<PropsT extends BuilderIOProps<object>> =
  ShowComponentProps<PropsT> & { mandatoryProps: string[] };

function isPropsEmpty<PropsT extends BuilderIOProps<object>>(
  whenProps: ShowBuilderProps<PropsT>['whenProps'],
  mandatoryProps: ShowBuilderProps<PropsT>['mandatoryProps'],
): whenProps is undefined | null | Record<never, never> {
  if (
    isEmpty(whenProps) ||
    isEmpty(omitBuilderProps(whenProps)) ||
    !mandatoryProps
  ) {
    return true;
  }

  return (
    mandatoryProps.filter((item: string) => isEmpty(whenProps[item])).length > 0
  );
}

export function ShowBuilder<PropsT extends BuilderIOProps<object>>(
  props: ShowBuilderProps<PropsT>,
): JSX.Element {
  const { render, whenProps, mandatoryProps } = props;
  if (isPropsEmpty(whenProps, mandatoryProps)) {
    const componentName =
      !!whenProps && 'builderBlock' in whenProps
        ? whenProps.builderBlock?.component?.name
        : '';

    return (
      <Container className="py-6">
        <Alert
          description={`This ${componentName} has missing required inputs, and will not show until they have been added.`}
          type="warning"
          closable={false}
        />
      </Container>
    );
  }
  const omittedProps = omitBuilderProps(whenProps);
  return render(omittedProps);
}
