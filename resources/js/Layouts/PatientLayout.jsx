import {
    Box,
    Flex,
    UnorderedList,
    ListItem,
    Text,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Logo from "../Pages/Shared/Logo"
import { useForm, Link } from "@inertiajs/react"

export default function PatientLayout({ children, auth, name }) {
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const { get } = useForm()

    window.addEventListener('resize', () => { 
        setWindowSize(window.innerWidth)
    })

    const bookingHandler = () => {
        get(route('patient.booking'))
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
                            {auth ? 
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
                                {!auth ? 
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
                                        p={'0 4px'}
                                    >
                                        <a
                                            href={route('patient.google.redirect')}
                                        >
                                            Login Using Google
                                        </a>
                                    </ListItem>
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
                                            <Text>Welcome, {name}</Text>
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