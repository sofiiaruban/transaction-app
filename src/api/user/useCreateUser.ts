import { useMutation } from '@tanstack/react-query'
import { apiClientUser } from '../apiClient'
import { useNavigate } from 'react-router-dom'

type User = {
  email: string
  password: string
}

const createUserFn = async (newUser: User) => {
  const response = await apiClientUser.post('', newUser)
  return response.data
}

export function useCreateUser() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createUserFn,
    onSuccess: () => {
      navigate('/transactions')
    }
  })
}
