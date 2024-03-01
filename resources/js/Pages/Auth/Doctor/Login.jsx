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
    Link,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Login() {
    const [show, setShow] = useState(false)
    const { data, setData, errors, get } = useForm({
        email: 'johndoe@example.com',
        password: 'secret',
        remember: false
    });
    
    const handleClick = () => setShow(!show)

    function handleSubmit(e) {
        // e.preventDefault()
        get(route('/'))
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
                                onChange={e => setData('email', e.target.value)}
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
                                onChange={e => setData('password', e.target.value)}
                            />
                            <InputRightElement>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Flex
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
                                Remember me
                            </Checkbox>
                        </FormControl>

                        <Link
                            width={'50%'}
                            alignSelf={'center'}
                            fontSize={'13'}
                            textAlign={'right'}
                            href='/'
                            style={{ textDecoration: 'none' }}
                            _hover={{
                                color: 'blue.600',
                            }}
                        >
                            Forgot password?
                        </Link>
                    </Flex>
                    <Button
                        type='submit'
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