"use client"


const Label = ({children}:{children:React.ReactNode}) => {
  return(
    <label className="text-sm font-medium leading-none text-neutral-300">
      {children}
    </label>
  )
}


export { Label }

