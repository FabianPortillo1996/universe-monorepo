import { clsx } from "clsx";

import { getSizeClasses, getVariantClasses } from "./button.classes";
import type { ButtonProps } from "./button.types";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "cursor-pointer rounded-md font-medium transition-colors duration-150",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        getVariantClasses(variant),
        getSizeClasses(size),
        className,
      )}
      {...props}
    />
  );
}
