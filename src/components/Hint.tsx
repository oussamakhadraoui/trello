import React, { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface HintProps {
 children :ReactNode
 description:string 
 side?:"right"|"bottom"|"top"|"left"
 sideOffset?:number
}

const Hint = ({children,description,side="bottom",sideOffset=0}: HintProps) => {
  return <TooltipProvider>
   <Tooltip delayDuration={0}>
    <TooltipTrigger>
     {children}
    </TooltipTrigger>
    <TooltipContent className='text-xs max-w-[220px] break-words' side={side} sideOffset={sideOffset}>
     {description}
    </TooltipContent>
   </Tooltip>
  </TooltipProvider>
}

export default Hint
