/** Routes that belong to the Flousy and Student Hub products, which keep their own look. */
export const isProductRoute = (pathname: string) =>
  pathname.startsWith("/flousy") || pathname.startsWith("/hub");
