import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input
} from '@chakra-ui/react'
import { FC } from 'react'
import Button from '../components/Button'
import { useForm } from 'react-hook-form'
import { useCreateUser } from '../api/user/useCreateUser'

interface LoginForm {
  email: string
  password: string
}

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginForm>()
  const { mutate: createUser } = useCreateUser()

  const handleLogin = (data: LoginForm) => {
    console.log(data)
    createUser(data)
  }
  return (
    <Flex width="full" height="100vh" align="center" justifyContent="center">
      <Box p={6} boxShadow="dark-lg" rounded="md" bg="white">
        <Box textAlign="center" mb={6}>
          <Heading>Sign In | Sign Up</Heading>
        </Box>
        <Box textAlign="center">
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                mb={2}
                size="lg"
                {...register('email', { required: 'Email is required' })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                mb={4}
                size="lg"
                {...register('password', { required: 'Password is required' })}
              />
              <Button
                title="Submit"
                variant="outline"
                size="lg"
                type="submit"
                isDisabled={!isValid}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

export default Login
