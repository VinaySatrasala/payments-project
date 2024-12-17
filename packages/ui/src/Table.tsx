import React from 'react'

type TableProps = React.TableHTMLAttributes<HTMLTableElement>
type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>
type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>
type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>
type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>

export function Table({ className, ...props }: TableProps): React.ReactElement {
  return (
    <div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`} {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }: TableSectionProps): React.ReactElement {
  return <thead className={`[&_tr]:border-b ${className}`} {...props} />
}

export function TableBody({ className, ...props }: TableSectionProps): React.ReactElement {
  return <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
}

export function TableFooter({ className, ...props }: TableSectionProps): React.ReactElement {
  return <tfoot className={`border-t bg-muted/50 font-medium [&>tr]:last:border-b-0 ${className}`} {...props} />
}

export function TableRow({ className, ...props }: TableRowProps): React.ReactElement {
  return <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`} {...props} />
}

export function TableHead({ className, ...props }: TableHeadProps): React.ReactElement {
  return <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
}

export function TableCell({ className, ...props }: TableCellProps): React.ReactElement {
  return <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
}

export function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>): React.ReactElement {
  return <caption className={`mt-4 text-sm text-muted-foreground ${className}`} {...props} />
}

