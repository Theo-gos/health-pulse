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
    RadioGroup,
    Radio,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Logo from "../Pages/Shared/Logo"
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { PiAddressBook, PiAddressBookFill } from "react-icons/pi";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function PatientRegisterForm({formManager, isLoginManager}) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [phoneValue, setPhoneValue] = useState()

    const { data, setData, errors, setError, processing, handleSubmit } = formManager
    const { setIsLogin } = isLoginManager
    
    const handleClickPassword = () => setShowPassword(!showPassword)
    const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

    useEffect(() => {
        setData('phone', phoneValue)
        setError('phone', '')
    }, [phoneValue])

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
                    <Box>Register an account</Box>
                </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
                mt={'16px'}
            >
                <VStack spacing='12px'>
                    <Flex w={'100%'} justify={'space-between'}>
                        <FormControl w={'49%'} isInvalid={errors.first_name}>
                            <InputGroup>
                                <Input
                                    id='first_name'
                                    name='first_name'
                                    variant='outline'
                                    focusBorderColor='blue.500'
                                    borderColor='gray.400'
                                    placeholder='First Name'
                                    value={data.first_name}
                                    onChange={e => {
                                        setData('first_name', e.target.value)
                                        setError('first_name', '')
                                    }}
                                />
                            </InputGroup>
                            <FormErrorMessage>{errors.first_name}</FormErrorMessage>
                        </FormControl>

                        <FormControl w={'49%'} isInvalid={errors.last_name}>
                            <InputGroup>
                                <Input
                                    id='last_name'
                                    name='last_name'
                                    variant='outline'
                                    focusBorderColor='blue.500'
                                    borderColor='gray.400'
                                    placeholder='Last Name'
                                    value={data.last_name}
                                    onChange={e => {
                                        setData('last_name', e.target.value)
                                        setError('last_name', '')
                                    }}
                                />
                            </InputGroup>
                            <FormErrorMessage>{errors.last_name}</FormErrorMessage>
                        </FormControl>
                    </Flex>

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

                    <FormControl isInvalid={errors.address}>
                        <InputGroup size='md'>
                            <InputLeftElement>
                                <PiAddressBookFill />
                            </InputLeftElement>
                            <Input
                                id='address'
                                name='address'
                                variant='outline'
                                type="text"
                                placeholder='Your address'
                                borderColor='gray.400'
                                value={data.address}
                                onChange={e => {
                                    setData('address', e.target.value)
                                    setError('address', '')
                                }}
                            />
                        </InputGroup>
                        <FormErrorMessage>{errors.address}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.phone}>
                        <InputGroup size='md'>
                            <PhoneInput
                                international
                                placeholder='Your phone number'
                                value={phoneValue}
                                onChange={setPhoneValue}

                                defaultCountry="VN"
                                inputComponent={Input}

                                borderColor='gray.400'

                                style={{
                                    width: '100%',
                                }}
                            />
                            {/* <Input
                                id='phone'
                                name='phone'
                                variant='outline'
                                type="text"
                                placeholder='Your phone number'
                                borderColor='gray.400'
                                value={data.phone}
                                onChange={e => {
                                    setData('phone', e.target.value)
                                    setError('phone', '')
                                }}
                            /> */}
                        </InputGroup>
                        <FormErrorMessage>{errors.phone}</FormErrorMessage>
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
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter password'
                                borderColor='gray.400'
                                value={data.password}
                                onChange={e => {
                                    setData('password', e.target.value)
                                    setError('password', '')
                                }}
                            />
                            <InputRightElement>
                                <Button h='1.75rem' size='sm' onClick={handleClickPassword}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.confirm_password}>
                        <InputGroup size='md'>
                            <InputLeftElement>
                                <LockIcon />
                            </InputLeftElement>
                            <Input
                                id='confirm_password'
                                name='confirm_password'
                                variant='outline'
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='Re-enter password'
                                borderColor='gray.400'
                                value={data.confirm_password}
                                onChange={e => {
                                    setData('confirm_password', e.target.value)
                                    setError('confirm_password', '')
                                }}
                            />
                            <InputRightElement>
                                <Button h='1.75rem' size='sm' onClick={handleClickConfirmPassword}>
                                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.confirm_password}</FormErrorMessage>
                    </FormControl>
                    
                    <Flex
                        w={'100%'}
                    >
                        <FormControl isInvalid={errors.gender}>
                            <Box>Gender</Box>
                            <RadioGroup mt={'8px'} defaultValue='M'>
                                <Stack spacing={4} direction='row'>
                                    <Radio value='M' onClick={() => {
                                        setData('gender', 'M')
                                        setError('gender', '')
                                    }}>
                                        Male
                                    </Radio>
                                    <Radio value='F' onClick={() => {
                                        setData('gender', 'F')
                                        setError('gender', '')
                                    }}>
                                        Female
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                            <FormErrorMessage>{errors.gender}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.dob}>
                            <Box>Date of Birth</Box>
                            <InputGroup size='md'>
                                <Input
                                    id='dob'
                                    name='dob'
                                    variant='outline'
                                    type={'date'}
                                    borderColor='gray.400'
                                    value={data.dob}
                                    onChange={e => {
                                        setData('dob', e.target.value)
                                        setError('dob', '')
                                    }}
                                />
                            </InputGroup>
                            <FormErrorMessage>{errors.dob}</FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Box>
                        Have an account already?
                        <Box
                            display={'inline-block'}
                            style={{ cursor: 'pointer' }}
                            _hover={{ opacity: '0.8' }}

                            mt={'8px'}
                            ml={'6px'}
                            
                            onClick={() => {
                                setIsLogin(true)
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
                            Log In
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
                        Register
                    </Button>
                </Stack>
            </ModalFooter>
        </form>
    )
}