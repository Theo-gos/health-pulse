import {
    Box,
    Flex,
    UnorderedList,
    ListItem,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
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
import { useForm, Link, usePage } from "@inertiajs/react"
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { FcGoogle } from "react-icons/fc";
import PatientLoginForm from "@/Components/PatientLoginForm"
import PatientRegisterForm from "@/Components/PatientRegisterForm"
import dayjs from "dayjs"

const today = dayjs().second(0).millisecond(0)

export default function PatientLayout({ children }) {
    const [show, setShow] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const { message, auth } = usePage().props
    const { patient } = auth
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data, setData, errors, setError , post, get, processing, reset: resetData } = useForm({
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        address: '',
        phone: '',
        gender: 'M',
        dob: '',
    });
    
    function handleSubmit(e) {
        e.preventDefault()
        
        if (isLogin) {
            if (data.email === '') {
                setError('email', 'Email is required')
                return
            } else if (data.password === '') { 
                setError('password', 'Password is required')
                return
            }

            post(route('patient.login'))
        } else {
             if (data.first_name === '') { 
                setError('first_name', 'First name is required')
                return
            } else if (data.last_name === '') { 
                setError('last_name', 'Last name is required')
                return
            } else if (data.email === '') {
                setError('email', 'Email is required')
                return
            } else if (data.address === '') { 
                setError('address', 'Address is required')
                return
            } else if (!data.phone) { 
                setError('phone', 'Phone is required')
                return
            } else if (data.password === '') { 
                setError('password', 'Password is required')
                return
            } else if (data.confirm_password === '') { 
                setError('confirm_password', 'Confirm Password is required')
                return
            } else if (data.dob === '') { 
                setError('dob', 'Date of Birth is required')
                return
             }
            
            if (data.password.length < 6) {
                setError('password', 'Password needs at least 6 characters')
                return
            }
            
            if (data.confirm_password !== data.password) { 
                setError('confirm_password', 'Passwords do not match')
                return
            }
            
            const birthDate = dayjs(data.dob).millisecond(0)
            if (today.hour(0).minute(0).diff(birthDate) <= 0 || today.hour(0).minute(0).diff(birthDate, 'years') < 1) {
                setError('dob', 'Invalid date of birth')
                return
            }

            post(route('patient.register'), {
                onSuccess: () => {
                    reset()
                }
            })
        }
    }

    const formManager = {
        data: data,
        setData: setData,
        handleSubmit: handleSubmit,
        errors: errors,
        setError: setError,
        processing: processing,
    }

    const isLoginManager = {
        isLogin: isLogin,
        setIsLogin: setIsLogin,
    }

    window.addEventListener('resize', () => { 
        setWindowSize(window.innerWidth)
    })

    const bookingHandler = () => {
        get(route('patient.booking'))
    }


    const reset = () => {
        setShow(false)
        setIsLogin(true)
        resetData()
        onClose()
    }

    return (
        <Box>
            <Box
                boxShadow= '0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
                position= 'fixed'
                top= '0'
                left= '0'
                right= '0'
                bg= 'gray.200'
                zIndex= '10'
            >
                <Box
                    mx={'auto'}
                    w={'100%'}
                >
                    <Box
                        display={windowSize >= 1100 ? 'flex' : 'none'}
                        justifyContent={'space-between'}
                        px={windowSize >= 1536 ? '28px' : '0'}
                    >
                        <Flex
                            alignItems={'center'}
                            marginRight= {'0'}
                            marginLeft= {'20px'}
                        >
                            <Box>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    href="/"
                                >
                                    <Box
                                        display={'flex'}
                                        alignItems={'center'}
                                    >
                                        <Logo />
                                        <Text ml={'1'} fontWeight={'500'} color={'blue.500'}>Health pulse</Text>
                                    </Box>
                                </Link>
                            </Box>
                            {patient ? 
                                <UnorderedList listStyleType={'none'}>
                                    <ListItem
                                        float={'left'}
                                        _hover={{
                                            backgroundColor: '#EDF2F7',
                                            color: 'gray',
                                        }}
                                        borderRadius={'md'}
                                        mr={'12px'}
                                        p={'0 4px'}
                                    >
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                display: 'block',
                                                padding: '20px 2px',
                                                mr: '12px',
                                                color: 'gray.500',
                                                fontSize: '16px',
                                            }}
                                            href="/"
                                        >
                                            <Text>
                                                Appointments
                                            </Text>
                                        </Link>
                                    </ListItem>
                                    <ListItem
                                        float={'left'}
                                        _hover={{
                                            backgroundColor: '#EDF2F7',
                                            color: 'gray',
                                        }}
                                        borderRadius={'md'}
                                        mr={'12px'}
                                        p={'0 4px'}
                                    >
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                display: 'block',
                                                padding: '20px 2px',
                                                mr: '12px',
                                                color: 'gray.500',
                                                fontSize: '16px',
                                            }}
                                            href="/"
                                        >
                                            <Text>
                                                Prescriptions
                                            </Text>
                                        </Link>
                                    </ListItem>
                                    <ListItem
                                        float={'left'}
                                        _hover={{
                                            backgroundColor: '#EDF2F7',
                                            color: 'gray',
                                        }}
                                        borderRadius={'md'} 
                                        p={'0 4px'}
                                    >
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                display: 'block',
                                                padding: '20px 2px',
                                                mr: '12px',
                                                color: 'gray.500',
                                                fontSize: '16px',
                                            }}
                                            href="/"
                                        >
                                            <Text>
                                                Medical Record
                                            </Text>
                                        </Link>
                                    </ListItem>
                                </UnorderedList>
                                :
                                ''
                            }
                        </Flex>
                        <Flex
                            marginRight= {'0'}
                            marginLeft= {'20px'}
                            flexWrap={'wrap'}
                        >
                            <UnorderedList
                                display={'flex'}
                                alignItems={'center'}
                                listStyleType={'none'}
                            >
                                {!patient ? 
                                    <>
                                        <ListItem
                                            _hover={{
                                                backgroundColor: '#EDF2F7',
                                                color: 'gray',
                                            }}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            h={'100%'}
                                            display={'flex'}
                                            alignItems={'center'}
                                            borderRadius={'md'}
                                            p={'0 14px'}
                                            onClick={onOpen}
                                        >
                                            <Box
                                                // href={route('patient.google.redirect')}
                                            >
                                                Log In
                                            </Box>
                                        </ListItem>
                                        
                                        <Modal isOpen={isOpen} onClose={reset} size={'lg'} isCentered>
                                            <ModalOverlay />
                                            <ModalContent>
                                                {isLogin ? 
                                                    <PatientLoginForm formManager={formManager} isLoginManager={isLoginManager} />
                                                    :
                                                    <PatientRegisterForm formManager={formManager} isLoginManager={isLoginManager} />
                                                }
                                            </ModalContent>
                                        </Modal>
                                    </>
                                    :
                                    <>
                                        <ListItem
                                            onClick={bookingHandler}
                                            _hover={{
                                                backgroundColor: '#EDF2F7',
                                                color: 'gray',
                                            }}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            h={'100%'}
                                            display={'flex'}
                                            alignItems={'center'}
                                            borderRadius={'md'}
                                            mr={'10px'}
                                            p={'0 4px'}
                                        >
                                            <Text>Book an appointment</Text>
                                        </ListItem>
                                        <ListItem mr={'10px'}>
                                            <Text>Welcome, {patient.name}</Text>
                                        </ListItem>
                                        <ListItem
                                            _hover={{
                                                backgroundColor: '#EDF2F7',
                                                color: 'gray',
                                            }}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            h={'100%'}
                                            display={'flex'}
                                            alignItems={'center'}
                                            borderRadius={'md'}
                                            mr={'10px'}
                                            p={'0 4px'}
                                        >
                                            <Link href={route('patient.logout')}>Log Out</Link>
                                        </ListItem>
                                    </>
                                }
                            </UnorderedList>
                        </Flex>
                    </Box>
                </Box>
                
            </Box>
            <Box
                mt={'9vh'}
            >
                {children}
            </Box>
            <Box
                    w={'100%'}
                    h={'75vh'}

                    bg={'purple.100'}
                >
                    Footer
            </Box>
        </Box>
    )
}