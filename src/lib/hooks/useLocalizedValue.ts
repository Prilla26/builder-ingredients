import { useRouter } from "next/router";

import { BuilderGenericReferenceProps } from "lib/types/builderIO";

function isString(value?: unknown): value is string {
  return typeof value === "string";
}

export function isBuilderRefArray(
  value: unknown
): value is BuilderGenericReferenceProps[] {
  return Array.isArray(value) && value[0]?.reference;
}

export function getLocalizedArrayValue<RefT extends string, ValueT = unknown>(
  value: Array<ValueT> | ValueT
): Array<BuilderGenericReferenceProps<RefT>> {
  if (Array.isArray(value) && value.length && isBuilderRefArray(value)) {
    return value;
  }
  return [];
}

export function isEmptyLocalizedObject(value: unknown): boolean {
  return (
    !!value &&
    typeof value === "object" &&
    Object.keys(value).length === 1 &&
    Object.getOwnPropertyNames(value)[0] === "@type"
  );
}

export function useLocalizedValue() {
  const { locale } = useRouter();

  const getLocalizedValue = <ValueT = unknown>(
    value: ValueT
  ): string | undefined => {
    const isEmptyArray = Array.isArray(value) && value.length === 0;
    if (!value || isEmptyArray) {
      return undefined;
    }

    if (isString(value)) {
      return value;
    }
    if (locale && value[locale]) {
      return value[locale];
    }
    if (typeof value === "object" && "Default" in value) {
      return value["Default"] as string;
    }

    for (const key in value) {
      if (typeof value[key] === "object" && locale) {
        value[key] = value[key][locale];
      }
    }

    return value as string | undefined;
  };

  return {
    getLocalizedValue,
  };
}
