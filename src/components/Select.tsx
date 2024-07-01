import { FC } from 'react'
import { Select as ChakraSelect } from '@chakra-ui/react'

interface SelectProps {
  optionList: string[]
  optionName: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<SelectProps> = ({ optionList, optionName, onChange }) => {
  return (
    <ChakraSelect
      placeholder={`Select ${optionName}`}
      size="lg"
      onChange={onChange}
    >
      {optionList.map((option) => (
        <option
          key={option}
          value={option}
          style={{ textTransform: 'capitalize' }}
        >
          {option}
        </option>
      ))}
    </ChakraSelect>
  )
}

export default Select
