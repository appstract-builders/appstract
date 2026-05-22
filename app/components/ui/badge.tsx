import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#0C6CC6] text-white",
        secondary: "bg-[#0C6CC6] text-secondary-foreground",
        outline: "border border-border text-foreground/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
