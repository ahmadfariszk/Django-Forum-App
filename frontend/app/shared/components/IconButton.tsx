import React from 'react'
import { Button, ButtonProps } from '../shadcn-ui/Button'
import { cn } from '../utils/cn';

type IconButtonProps = {
    icon?: React.ReactNode;
    label?: string;
} & ButtonProps

const IconButton = ({ icon, label, size, ...props }: IconButtonProps) => {
  return (
    <Button {...props} size={size} className={cn('bg-transparent hover:bg-primary/80 mx-2 flex items-center justify-center',
        {
            'p-2': !label
        }
    )}>
        {icon && icon}
        {label && label}
    </Button>
  )
}

export default IconButton
