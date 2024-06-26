import {
    Box,
    Flex,
    UnorderedList,
    ListItem,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    useToast,
    Stack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuGroup,
    MenuDivider,
    Avatar,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Logo from "../Pages/Shared/Logo"
import { useForm, Link, usePage } from "@inertiajs/react"
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { FcGoogle } from "react-icons/fc";
import { IoMdHome } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import PatientLoginForm from "@/Components/PatientLoginForm"
import PatientRegisterForm from "@/Components/PatientRegisterForm"
import dayjs from "dayjs"
import { useMediaQuery } from 'react-responsive'
import { FaKey } from "react-icons/fa";

const today = dayjs().second(0).millisecond(0)

const STATE = {
    HOME: 'home',
    PATIENT: 'patient',
    PROFILE: 'profile',
    NONE: 'none',
}

let isOpen
let onOpen
let onClose

export default function PatientLayout({ children, state, modalManager = null }) {
    const isHovered = state === STATE.NONE ? false : true;
    const [show, setShow] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [hovered, setHovered] = useState(isHovered)
    const { message, auth } = usePage().props
    const [messageData, setMessageData] = useState(message)
    const { patient } = auth
    const toast = useToast()
    const isMobile = useMediaQuery({ query: '(max-width: 844px)' })
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showPatientOptions, setShowPatientOptions] = useState(false);
    const [showManageOptions, setShowManageOptions] = useState(false);

    useEffect(() => {
        setMessageData(message)
    }, [message])

    useEffect(() => {
        if (messageData) {
            toast({
                title: `${message.type.charAt(0).toUpperCase()}${message.type.slice(1)}!`,
                description: message.message,
                status: message.type,
                position: 'top',
                duration: 5000,
                isClosable: true,
                onCloseComplete: () => {
                    setMessageData(null)
                }
            })
        }
    }, [messageData])


    if (modalManager) {
        isOpen = modalManager.isOpen
        onOpen = modalManager.onOpen
        onClose = modalManager.onClose
    }


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
            post(route('patient.login'))
        } else {        
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

    const reset = () => {
        setShow(false)
        setIsLogin(true)
        resetData()
        onClose()
    }

    const bookingHandler = () => {
        get(route('patient.booking'))
    }

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const toggleShowPatientOptions = () => setShowPatientOptions(!showPatientOptions);
    const toggleShowManageOptions = () => setShowManageOptions(!showManageOptions);

    return (
        <Box>
            <Box
                boxShadow= '0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
                position= 'fixed'
                top= '0'
                left= '0'
                right= '0'
                bg= 'gray.200'
                zIndex='10'
                p={'4px'}
            >
                {!isMobile ? 
                    <Box
                        mx={'auto'}
                        w={'100%'}
                    >
                        <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            px={'28px'}
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
                                            <Text ml={'1'} fontWeight={'500'} color={'blue.500'}>Health Pulse</Text>
                                        </Box>
                                    </Link>
                                </Box>
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
                                            <Menu>
                                                <MenuButton>
                                                    <Avatar name={patient.name} bg={'#1366DE'} color={'white'} size={'md'} src={patient.avatar} />
                                                </MenuButton>
                                                <MenuList fontSize={'13px'} borderRadius={'lg'}>
                                                    <Flex
                                                        w={'100%'}
                                                        p={'10px 8px'}

                                                        align={'center'}
                                                        justify={'center'}
                                                    >
                                                        <Avatar name={patient.name} bg={'#1366DE'} color={'white'} size={'md'} src={patient.avatar} />
                                                        <Box fontWeight={'bold'} ml={'18px'}>{patient.name}</Box>
                                                    </Flex>
                                                    <MenuDivider />
                                                    <MenuGroup title="Patient">
                                                        <MenuItem p={'8px 24px'} as={Link} href={route('patient.lists.show', {state: 'appointments'})}>Appointments</MenuItem>
                                                        <MenuItem p={'8px 24px'} as={Link} href={route('patient.lists.show', {state: 'prescriptions'})}>Prescriptions</MenuItem>
                                                        <MenuItem p={'8px 24px'} as={Link} href={route('patient.lists.show', {state: 'record'})}>Medical Record</MenuItem>
                                                    </MenuGroup>
                                                    <MenuDivider />
                                                    <MenuGroup title="Manage">
                                                        <MenuItem p={'8px 24px'} as={Link} href={route('patient.profile')}>Profile</MenuItem>
                                                        <MenuItem p={'8px 24px'} as={Link} href={route('patient.logout')}>Log Out</MenuItem>
                                                    </MenuGroup>
                                                </MenuList>
                                            </Menu>
                                        </>
                                    }
                                </UnorderedList>
                            </Flex>
                        </Box>
                    </Box>
                :
                    <Box
                        w={'100%'}
                        h={'50px'}
                    >
                        <Box
                            position={'relative'}
                            w={'100%'}
                        >
                            <Flex
                                position={'absolute'}
                                left={120}

                                alignItems={'center'}
                                w={'fit-content'}
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
                                            <Text ml={'1'} fontWeight={'500'} color={'blue.500'}>Health Pulse</Text>
                                        </Box>
                                    </Link>
                                </Box>
                            </Flex>

                            <Flex
                                position={'absolute'}
                                right={0}

                                w={'fit-content'}
                                h={'50px'}
                            >
                                {!patient ? 
                                    <>
                                        <Box
                                            h={'100%'}
                                            display={'flex'}
                                            alignItems={'center'}
                                            borderRadius={'md'}
                                            p={'0 14px'}
                                            onClick={onOpen}
                                        >
                                            Log In
                                        </Box>
                                        
                                        <Modal isOpen={isOpen} onClose={reset} size={'lg'} isCentered>
                                            <ModalOverlay />
                                            <ModalContent mx={ isMobile ? '16px' : ''}>
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
                                        <Avatar name={patient.name} bg={'#1366DE'} color={'white'} onClick={toggleDrawer} size={'md'} src={patient.avatar} />
                                        <Drawer isOpen={isDrawerOpen} size={'xs'} onClose={toggleDrawer}>
                                            <DrawerOverlay />
                                            <DrawerContent>
                                                <DrawerHeader>
                                                    <Flex
                                                        w={'100%'}
                                                        p={'10px 8px'}

                                                        align={'center'}
                                                    >
                                                        <Avatar name={patient.name} bg={'#1366DE'} color={'white'} size={'md'} src={patient.avatar} />
                                                        <Box fontWeight={'bold'} ml={'18px'}>{patient.name}</Box>
                                                    </Flex>
                                                </DrawerHeader>
                                                <DrawerBody>

                                                    <Flex align={'center'} justify={'space-between'} borderBottom={'1px solid #ECEDED'} mb={'16px'} pb={'16px'} fontSize={'16px'} fontWeight={'bold'}>
                                                        <Flex align={'center'}>
                                                            <IoPerson />
                                                            <Box ml={'16px'}>Patients</Box>
                                                        </Flex>
                                                        <Box fontSize={'20px'} onClick={toggleShowPatientOptions}>+</Box>
                                                    </Flex>
                                                    {showPatientOptions ? 
                                                        <Stack w={'80%'} mx={'auto'} spacing={2} bg={'gray.100'} borderRadius={'xl'} fontSize={'13px'}> 
                                                            <Box
                                                                p={'16px 24px'}

                                                                as={Link}
                                                                href={route('patient.lists.show', { state: 'appointments' })}
                                                            >
                                                                Appointments
                                                            </Box>
                                                            <Box
                                                                p={'16px 24px'}
                                                                
                                                                as={Link}
                                                                href={route('patient.lists.show', { state: 'prescriptions' })}
                                                            >
                                                                Prescriptions
                                                            </Box>
                                                            <Box
                                                                p={'16px 24px'}
                                                                
                                                                as={Link}
                                                                href={route('patient.lists.show', { state: 'record' })}
                                                            >
                                                                Medical Record
                                                            </Box>
                                                        </Stack>
                                                        :
                                                        <></>
                                                    }

                                                    <Flex align={'center'} justify={'space-between'} borderBottom={'1px solid #ECEDED'} my={'16px'} pb={'16px'} fontSize={'16px'} fontWeight={'bold'}>
                                                        <Flex align={'center'}>
                                                            <FaKey />
                                                            <Box ml={'16px'}>Manage Account</Box>
                                                        </Flex>
                                                        <Box fontSize={'20px'} onClick={toggleShowManageOptions}>+</Box>
                                                    </Flex>
                                                    {showManageOptions ? 
                                                        <Stack w={'80%'} mx={'auto'} spacing={2} bg={'gray.100'} borderRadius={'xl'} fontSize={'13px'}> 
                                                            <Box
                                                                p={'16px 24px'}
                                                                
                                                                as={Link}
                                                                href={route('patient.profile')}
                                                            >
                                                                Profile
                                                            </Box>
                                                            <Box
                                                                p={'16px 24px'}
                                                                
                                                                as={Link}
                                                                href={route('patient.logout')}
                                                            >
                                                                Log Out
                                                            </Box>
                                                        </Stack>
                                                        :
                                                        <></>
                                                    }
                                                </DrawerBody>
                                                <DrawerFooter>
                                                    <Flex
                                                        w={'100%'}
                                                        justify={'center'}
                                                    >
                                                        <Button
                                                            onClick={bookingHandler}
                                                            w={'80%'}
                                                            mt={'8px'}
                                                            px={'8px'}

                                                            borderRadius={'30px'}

                                                            colorScheme={'blue'}

                                                            fontSize={'12px'}
                                                        >
                                                            Book Appointment
                                                        </Button>
                                                    </Flex>
                                                </DrawerFooter>
                                            </DrawerContent>
                                        </Drawer>
                                    </>
                                }
                            </Flex>
                        </Box>
                    </Box>
                }
            </Box>

            <Box
                mt={'9vh'}

                position={'relative'}
            >
                {children}

                {patient && !isMobile ? 
                    <>
                        <Box
                            position={'fixed'}
                            left={0}
                            top={'24%'}

                            borderRadius={'20px'}

                            w={'4px'}
                            h={'37vh'}

                            bg={'#b2b2b2'}
                            _hover={{
                                backgroundColor: 'black',
                            }}

                            hidden={hovered}
                            onMouseEnter={() => {
                                if (state === STATE.NONE)
                                    setHovered(true)
                            }}
                        >
                        </Box>

                        <Stack
                            position={'fixed'}
                            left={0}
                            top={'24%'}

                            hidden={!hovered}                   
                            onMouseLeave={() => {
                                if (state === STATE.NONE)
                                    setHovered(false)
                            }}

                            borderRadius={'20px'}

                            w={'100px'}
                            h={'40vh'}
                            p={'8px'}

                            spacing={3}
                        >
                            <Link
                                w={'100%'}
                                h={'30%'}
                                
                                href="/"
                            >
                                <Flex
                                    p={'16px'}

                                    direction={'column'}
                                    align={'center'}
                                    justify={'center'}

                                    borderRadius={'20px'}

                                    _hover={{
                                        opacity: 0.7,
                                        cursor: 'pointer',
                                    }}

                                    bg={state === STATE.HOME ? 'gray.200' : 'white'}
                                >
                                    <IoMdHome fontSize={'20px'} />
                                    <Box fontWeight={'bold'} fontSize={'12px'} mt={'6px'}>Home</Box>
                                </Flex>
                            </Link>

                            <Link
                                w={'100%'}
                                h={'30%'}
                                
                                href={route('patient.lists.show', {state: 'appointments'})}
                            >
                                <Flex
                                    p={'16px'}
                                    
                                    direction={'column'}
                                    align={'center'}
                                    justify={'center'}

                                    borderRadius={'20px'}

                                    _hover={{
                                        opacity: 0.7,
                                        cursor: 'pointer',
                                    }}

                                    bg={state === STATE.PATIENT ? 'gray.200' : 'white'}
                                >
                                    <FaListAlt fontSize={'20px'} />
                                    <Box fontWeight={'bold'} fontSize={'12px'} mt={'6px'}>Patient</Box>
                                </Flex>
                            </Link>

                            <Link
                                w={'100%'}
                                h={'30%'}
                                
                                href={route('patient.profile')}
                            >
                                <Flex
                                    p={'16px'}

                                    direction={'column'}
                                    align={'center'}
                                    justify={'center'}

                                    borderRadius={'20px'}

                                    _hover={{
                                        opacity: 0.7,
                                        cursor: 'pointer',
                                    }}

                                    bg={state === STATE.PROFILE ? 'gray.200' : 'white'}
                                >
                                    <IoPerson fontSize={'20px'} />
                                    <Box fontWeight={'bold'} fontSize={'12px'} mt={'6px'}>Profile</Box>
                                </Flex>
                            </Link>
                        </Stack>
                    </>
                
                :
                    <></>
                }

            </Box>

            <Box
                w={'100%'}
                pb={'40px'}
                mt={'36px'}

                bg={'#242a61'}
            >
                {!isMobile ? 
                <Stack
                    w={'85%'}
                    h={'100%'}
                    py={'40px'}

                    spacing={4}

                    mx={'auto'}
                >
                    <Flex
                        alignItems={'center'}
                        mb={'10px'}

                        fontSize={'30px'}
                    >
                        <Logo />
                        <Text ml={'10px'} fontWeight={'500'} color={'white'}>Health Pulse</Text>
                    </Flex>

                    <Flex
                        w={'100%'}
                        pb={'50px'}

                        color={'white'}
                        fontSize={'14px'}

                        borderBottom={'1px solid white'}
                    >
                        <Stack
                            w={'45%'}

                            spacing={2}
                        >
                            <Flex>
                                <Box fontWeight={'bold'}>Hotline</Box>
                                <Box ml={'3px'}>1900636893</Box>
                            </Flex>

                            <Flex>
                                <Box fontWeight={'bold'}>Email</Box>
                                <Box ml={'3px'}>support@healthpulse.com</Box>
                            </Flex>

                            <Box>
                                Copyright © 2017-2024 Rai and Rohl Technologies, Inc. All rights reserved.
                            </Box>
                        </Stack>

                        <Stack
                            w={'25%'}
                        >
                            <Box fontSize={'16px'} fontWeight={'bold'}>Services</Box>
                            <Box>Booking Appointment</Box>
                        </Stack>

                        <Stack
                            w={'25%'}
                        >
                            <Box fontSize={'16px'} fontWeight={'bold'}>Learn More</Box>
                            <Box>Our Doctors</Box>
                        </Stack>
                    </Flex>

                    <Flex
                        w={'100%'}
                        pt={'24px'}

                        color={'white'}
                        fontSize={'14px'}
                    >
                        <Stack
                            w={'45%'}

                            spacing={2}
                        >
                            <Box fontWeight={'bold'}>Health Pulse</Box>

                            <Flex>
                                <Box fontWeight={'bold'}>Business Registration Number:</Box>
                                <Box ml={'3px'}>0309145924, first registered on</Box>
                            </Flex>

                            <Box>
                                06/07/2009, ninth amended on 06/07/2023, issued by Department of Planning and Investment of Ho Chi Minh City.
                            </Box>
                        </Stack>

                        <Stack
                            w={'30%'}
                            pl={'28px'}
                        >
                            <Box fontSize={'16px'} fontWeight={'bold'}>Address</Box>
                            <Box>39 Le Duan, Ben Nghe Ward, District 1, Ho Chi Minh city, Vietnam</Box>
                            <Box fontSize={'16px'} fontWeight={'bold'}>Stay in touch</Box>
                            <Flex w={'100%'}>
                                <AiOutlineFacebook fontSize={'45px'} />
                                <AiOutlineInstagram fontSize={'45px'} />
                            </Flex>
                        </Stack>

                        <Stack
                            w={'30%'}

                            align={'center'}
                        >
                            <img src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/dathongbao.png" width={'150px'}/>
                        </Stack>
                    </Flex>
                </Stack>
                :
                <Stack
                    w={'85%'}
                    h={'100%'}
                    py={'40px'}

                    spacing={4}

                    mx={'auto'}
                >
                    <Flex
                        alignItems={'center'}
                        mb={'10px'}

                        fontSize={'30px'}
                    >
                        <Logo />
                        <Text ml={'10px'} fontWeight={'500'} color={'white'}>Health Pulse</Text>
                    </Flex>

                    <Stack
                        w={'100%'}
                        pb={'32px'}

                        color={'white'}
                        fontSize={'14px'}

                        borderBottom={'1px solid white'}
                    >
                        <Stack
                            w={'100%'}
                            borderBottom={'1px solid white'}
                            pb={'16px'}    
                        >
                            <Box fontSize={'16px'} fontWeight={'bold'} >Services</Box>
                        </Stack>

                        <Stack
                            w={'100%'}
                            borderBottom={'1px solid white'}
                            pb={'16px'}    
                        >
                            <Box fontSize={'16px'} fontWeight={'bold'} >Learn more</Box>
                        </Stack>
                            
                        <Stack
                            w={'100%'}
                            mt={'32px'}    

                            spacing={2}
                        >
                            <Flex>
                                <Box fontWeight={'bold'}>Hotline</Box>
                                <Box ml={'3px'}>1900636893</Box>
                            </Flex>

                            <Flex>
                                <Box fontWeight={'bold'}>Email</Box>
                                <Box ml={'3px'}>support@healthpulse.com</Box>
                            </Flex>

                            <Box>
                                Copyright © 2017-2024 Rai and Rohl Technologies, Inc. All rights reserved.
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack
                        w={'100%'}
                        pt={'24px'}

                        color={'white'}
                        fontSize={'14px'}
                    >
                        <Stack
                            w={'100%'}

                            spacing={2}
                        >
                            <Box fontWeight={'bold'}>Health Pulse</Box>

                            <Box fontWeight={'bold'}>Business Registration Number:</Box>

                            <Box>
                                0309145924, first registered on 06/07/2009, ninth amended on 06/07/2023, issued by Department of Planning and Investment of Ho Chi Minh City.
                            </Box>
                        </Stack>

                        <Stack
                            w={'100%'}
                            mt={'16px'}
                        >
                            <Box fontSize={'14px'} fontWeight={'bold'}>Address</Box>
                            <Box>39 Le Duan, Ben Nghe Ward, District 1, Ho Chi Minh city, Vietnam</Box>
                            <Box fontSize={'14px'} fontWeight={'bold'} mt={'8px'}>Stay in touch</Box>
                            <Flex w={'100%'}>
                                <AiOutlineFacebook fontSize={'45px'} />
                                <AiOutlineInstagram fontSize={'45px'} />
                            </Flex>
                        </Stack>

                        <Stack
                            w={'100%'}
                            mt={'16px'}
                        >
                            <img src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/dathongbao.png" width={'150px'}/>
                        </Stack>
                    </Stack>
                </Stack>
                }
            </Box>
        </Box>
    )
}