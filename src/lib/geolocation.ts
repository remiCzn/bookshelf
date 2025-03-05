"use client";

import { useGeolocation, useDebounce } from "@uidotdev/usehooks";

const R = 1000;

export function useLocation() {
  const { latitude, longitude } = useGeolocation({});

  const debouncedLatitude = useDebounce(
    Math.round((latitude ?? 48.866667) * R) / R,
    1000
  );
  const debouncedLongitude = useDebounce(
    Math.round((longitude ?? 2.333333) * R) / R,
    1000
  );

  return [debouncedLatitude, debouncedLongitude] as [number, number];
}
