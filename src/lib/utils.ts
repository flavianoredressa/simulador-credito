/**
 * Utility function to combine CSS classes
 * Filters out falsy values and joins the remaining classes with spaces
 *
 * @param classes - Array of class strings, undefined, null, or false values
 * @returns Combined class string
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
