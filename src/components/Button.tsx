import React from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'
import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react'

interface ButtonProps extends ChakraButtonProps {
  title: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit'
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  size,
  isDisabled,
  variant,
  colorScheme = 'teal',
  type = 'button'
}) => {
  return (
    <ChakraButton
      size={size}
      isDisabled={isDisabled}
      variant={variant}
      onClick={onClick}
      colorScheme={colorScheme}
      type={type}
      px={8}
    >
      {title}
    </ChakraButton>
  )
}

export default Button
