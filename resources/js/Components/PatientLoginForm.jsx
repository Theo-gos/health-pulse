import {
    Box,
    Flex,
    Text,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    VStack,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    FormErrorMessage,
    InputRightElement,
    Stack,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Logo from "../Pages/Shared/Logo"
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { FcGoogle } from "react-icons/fc";

export default function PatientLoginForm({formManager, isLoginManager}) {
    const [show, setShow] = useState(false)

    const { data, setData, errors, setError, processing, handleSubmit } = formManager
    const { isLogin, setIsLogin } = isLoginManager
    
    const handleClick = () => setShow(!show)

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                width: '100%',
            }}
        >
            <ModalHeader mt={'30px'}>
                <Flex
                    direction={'column'}
                    align={'center'}
                >
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        mb={'14px'}
                    >
                        <Logo />
                        <Text ml={'1'} fontWeight={'500'} color={'blue.500'}>Health pulse</Text>
                    </Box>
                    <Box>Log in to your account</Box>
                </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
                mt={'16px'}
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
                        <Box>
                            Haven't got an account?
                            <Box
                                display={'inline-block'}
                                style={{ cursor: 'pointer' }}
                                _hover={{ opacity: '0.8' }}

                                mt={'8px'}
                                ml={'6px'}
                                
                                onClick={() => {
                                    setIsLogin(false)
                                    setError('email', '')
                                    setError('password', '')
                                    setData({
                                        email: '',
                                        password: '',
                                        confirm_password: '',
                                        first_name: '',
                                        last_name: '',
                                        address: '',
                                        phone: '',
                                        gender: 'M',
                                        dob: '',
                                    })
                                }}
                                
                                color={'#1366DE'}
                            >
                                Register
                            </Box>
                        </Box>
                </VStack>
            </ModalBody>

            <ModalFooter>
                <Stack spacing={2} w={'100%'}>
                    <Button
                        type='submit'
                        disabled={processing}
                        
                        bg={'blue.400'}
                        color={'white'}
                        
                        w={'100%'}
                        mx={'auto'}
                        mb={'12px'}
                        
                        _hover={{
                            background: 'blue.500',
                        }}
                    >
                        Log In
                    </Button>
                    <Box textAlign={'center'}>Or</Box>
                    <a
                        href={route('patient.google.redirect')}
                    >
                        <Button
                            boxShadow= '0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'

                            bg={'white'}
                            color={'black'}
                            
                            w={'100%'}
                            mx={'auto'}
                            mb={'12px'}
                            
                            href={route('patient.google.redirect')}

                            _hover={{
                                background: '#ECF3FD',
                                color: '#1366DE',
                            }}
                        >
                            <FcGoogle />
                            <Box ml={'8px'}>
                                Login with Google
                            </Box>
                        </Button>
                    </a>
                </Stack>
            </ModalFooter>
        </form>
    )
}