import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps): React.ReactElement {
  return (
    <div 
      className={`
        relative rounded-lg p-[1px] transition-all
        bg-[linear-gradient(135deg,#34d399,transparent_25%,transparent_75%,#34d399),linear-gradient(45deg,#34d399,transparent_25%,transparent_75%,#34d399)]
        bg-[length:200%_200%,200%_200%]
        bg-[position:0_0,100%_100%]
        hover:bg-[position:100%_100%,0_0]
        ${className}`}
      {...props}
    >
      <div className="rounded-lg bg-neutral-900 p-6 h-full w-full">
        {props.children}
      </div>
    </div>
  );
}


export function CardHeader({ className, ...props }: CardProps): React.ReactElement {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement {
  return <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>): React.ReactElement {
  return <p className={`text-sm text-muted-foreground ${className}`} {...props} />
}

export function CardContent({ className, ...props }: CardProps): React.ReactElement {
  return <div className={`p-6 pt-0 ${className}`} {...props} />
}

export function CardFooter({ className, ...props }: CardProps): React.ReactElement {
  return <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
}

