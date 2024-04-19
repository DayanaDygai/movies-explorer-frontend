import { DEVICE_BREAKPOINTS } from './constants';

export const isDesktop = (width) => width >= DEVICE_BREAKPOINTS.DESKTOP;

export const isTablet = (width) =>
  width >= DEVICE_BREAKPOINTS.TABLET && width < DEVICE_BREAKPOINTS.DESKTOP;

export const isMobile = (width) => width < DEVICE_BREAKPOINTS.TABLET;
