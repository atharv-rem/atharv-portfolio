import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ReverseDiagonalBoxPatternProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const ReverseDiagonalBoxPattern = forwardRef<HTMLDivElement, ReverseDiagonalBoxPatternProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="reverse-diagonal-box-pattern"
        className={cn(
          "relative isolate overflow-hidden bg-white dark:bg-neutral-950 [background-image:repeating-linear-gradient(-45deg,#f5f5f5_0,#f5f5f5_1px,transparent_0,transparent_50%)] dark:[background-image:repeating-linear-gradient(-45deg,#171717_0,#171717_1px,transparent_0,transparent_50%)] [background-size:12px_12px]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ReverseDiagonalBoxPattern.displayName = "ReverseDiagonalBoxPattern";

export { ReverseDiagonalBoxPattern };