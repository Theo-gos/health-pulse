import { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Input,
    FormControl,
    InputRightElement,
    InputGroup,
    VStack,
    InputLeftElement,
    FormErrorMessage,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Login() {
    const [show, setShow] = useState(false)
    const { data, setData, errors, setError , post, processing } = useForm({
        email: 'johndoe@example.com',
        password: 'secret',
    });
    
    const handleClick = () => setShow(!show)

    function handleSubmit(e) {
        e.preventDefault()
        post(route('login'))
    }

    return (
        <AuthLayout>
            <Heading my={'10'} >Log in</Heading>

            <form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                }}
            >
                <VStack spacing='12px'>
                    <FormControl isInvalid={errors.email}>
                        <InputGroup>
                            <InputLeftElement>
                                <EmailIcon />
                            </InputLeftElement>
                            <Input
                                id='email'
                                name='email'
                                variant='outline'
                                focusBorderColor='blue.500'
                                borderColor='gray.400'
                                placeholder='Email'
                                value={data.email}
                                onChange={e => {
                                    setData('email', e.target.value)
                                    setError('email', '')
                                }}
                            />
                        </InputGroup>
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    
                    <FormControl isInvalid={errors.password}>
                        <InputGroup size='md'>
                            <InputLeftElement>
                                <LockIcon />
                            </InputLeftElement>
                            <Input
                                id='password'
                                name='password'
                                variant='outline'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                borderColor='gray.400'
                                value={data.password}
                                onChange={e => {
                                    setData('password', e.target.value)
                                    setError('password', '')
                                }}
                            />
                            <InputRightElement>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    {/* <Flex
                        width={'100%'}
                    >
                        <FormControl>
                            <Checkbox
                                id='remember'
                                name='remember'
                                borderColor={'gray.400'}
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                            >
                                <Text fontSize={'14'}>Remember me</Text>
                            </Checkbox>
                        </FormControl>

                        <Link
                            href={route('doctor.register')}
                            style={{
                                textDecoration: 'none',
                                width: '50%',
                                alignSelf: 'flex-start',
                                textAlign: 'right',
                                fontSize: '12px',
                            }}
                        >
                            <Text _hover={{color: 'blue.600'}}>Forgot password?</Text>
                        </Link>
                    </Flex> */}
                    <Button
                        type='submit'
                        disabled={processing}
                        bg={'blue.400'}
                        color={'white'}
                        w={'25%'}
                        _hover={{
                            background: 'blue.500',
                        }}
                    >
                        Log in
                    </Button>
                </VStack>
            </form>
        </AuthLayout>    

    )
}