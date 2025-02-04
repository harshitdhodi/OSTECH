'use client'

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "./Utils.js"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      className={cn(
        "flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
        className
      )}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Trigger>
  )
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm text-gray-700",
        "data-[state=closed]:animate-collapsible-up",
        "data-[state=open]:animate-collapsible-down",
        className
      )}
      {...props}
    >
      <div className="p-4 pt-0">{children}</div>
    </CollapsiblePrimitive.Content>
  )
)
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
