import {
    Box,
    Flex,
    UnorderedList,
    ListItem,
    Text,
    Input,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Link as ChakraLink,
    InputGroup,
    InputLeftAddon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Select,
    FormErrorMessage,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Logo from "../Pages/Shared/Logo"
import { useForm, Link } from "@inertiajs/react"
import dialCode from '../Assets/data/dial-code.json'
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"

export default function PatientLayout({ children, auth, name }) {
    
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    window.addEventListener('resize', () => { 
        setWindowSize(window.innerWidth)
    })

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
                            <UnorderedList listStyleType={'none'}>
                                <ListItem float={'left'}>
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            display: 'block',
                                            padding: '20px 2px',
                                            mr: '9px',
                                            color: 'gray.500',
                                            fontSize: '16px',
                                        }}
                                        href="/"
                                    >
                                        <Text _hover={{color: 'gray.700'}} >
                                            Menu Item 1
                                        </Text>
                                    </Link>
                                </ListItem>
                                <ListItem float={'left'}>
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            display: 'block',
                                            padding: '20px 2px',
                                            mr: '9px',
                                            color: 'gray.500',
                                            fontSize: '16px',
                                        }}
                                        href="/"
                                    >
                                        <Text _hover={{color: 'gray.700'}} >
                                            Menu Item 1
                                        </Text>
                                    </Link>
                                </ListItem>
                                <ListItem float={'left'}>
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            display: 'block',
                                            padding: '20px 2px',
                                            mr: '9px',
                                            color: 'gray.500',
                                            fontSize: '16px',
                                        }}
                                        href="/"
                                    >
                                        <Text _hover={{color: 'gray.700'}} >
                                            Menu Item 1
                                        </Text>
                                    </Link>
                                </ListItem>
                                <ListItem float={'left'}>
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            display: 'block',
                                            padding: '20px 2px',
                                            mr: '9px',
                                            color: 'gray.500',
                                            fontSize: '16px',
                                        }}
                                        href="/"
                                    >
                                        <Text _hover={{color: 'gray.700'}} >
                                            Menu Item 1
                                        </Text>
                                    </Link>
                                </ListItem>
                            </UnorderedList>
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
                                <ListItem id="search" mr={'10px'}>
                                    <Input
                                        borderColor={'gray.300'}
                                        borderRadius={'lg'}
                                        color={'gray.500'}
                                        bg={'white'}
                                        w={`calc(${windowSize}px * 25 / 100)`}
                                        size={'md'}
                                        name="search-bar"
                                        id="search-bar"
                                        placeholder="Search Bar..."
                                    />
                                </ListItem>
                                {!auth ? 
                                    <ListItem>
                                        <a
                                            href={route('patient.google.redirect')}
                                        >
                                            Login Using Google
                                        </a>
                                    </ListItem>
                                    :
                                    <>
                                        <ListItem mr={'10px'}>
                                            <Text>Welcome, {name}</Text>
                                        </ListItem>
                                        <ListItem>
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
                mt={75}
            >
                {children}
            </Box>
        </Box>
    )
}