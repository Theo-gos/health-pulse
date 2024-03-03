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
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Logo from "./Shared/Logo"
import { useForm, Link } from "@inertiajs/react"
import dialCode from '../Assets/data/dial-code.json'
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"

export default function Home({ validated }) {
    
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [isSelOpen, setIsSelOpen] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const { data, setData, errors, get } = useForm({
        phone: '',
        otp: '',
    });

    window.addEventListener('resize', () => { 
        setWindowSize(window.innerWidth)
    })

    return (
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
                            <ListItem>
                                <ChakraLink
                                    _hover={{color: 'gray.700'}}
                                    style={{ textDecoration: 'none' }}
                                    display={'block'}
                                    padding={'20px 2px'}
                                    mr={'9px'}
                                    color={'gray.500'}
                                    onClick={onOpen}
                                >
                                    Login
                                </ChakraLink>
                            </ListItem>
                            <ListItem p={'0'}>
                                <ChakraLink
                                    _hover={{color: 'gray.700'}}
                                    style={{ textDecoration: 'none' }}
                                    display={'block'}
                                    padding={'20px 2px'}
                                    mr={'9px'}
                                    color={'gray.500'}
                                >
                                    Sign up
                                </ChakraLink>
                            </ListItem>
                        </UnorderedList>
                    </Flex>
                </Box>
            </Box>
            
            <Box>
                <Text>{ validated ? validated.email : '' }</Text>
            </Box>

            <Modal
                initialFocusRef={initialRef}
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset='scale'
                scrollBehavior={'outside'}
                size={'lg'}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Log in</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <FormLabel>Phone</FormLabel>
                        <Flex>
                            <FormControl w={'48%'}>
                                <Select
                                    placeholder={`${dialCode[234].country}, +${dialCode[234].code}`}
                                    icon={isSelOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                    onClick={() => setIsSelOpen(!isSelOpen)}
                                    id="dial-code"
                                    name="dial-code"
                                    variant={'filled'}
                                    borderLeftRadius={'xl'}
                                    borderRightRadius={'unset'}
                                >
                                    {dialCode.map((code, index) => {
                                        return <option value={code.code} key={index} >{ `${code.country}, +${code.code}` }</option>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <Input
                                    ref={initialRef}
                                    name="phone"
                                    id="phone"
                                    placeholder='Phone'
                                    value={data.phone}
                                    onChange={(e) => setData(phone, e.target.value)}
                                    borderRightRadius={'xl'}
                                    borderLeftRadius={'unset'}
                                />
                            </FormControl>
                        </Flex>
                        <FormControl mt={4}>
                            <Flex
                                bg={'rgba(22, 24, 35, .06)'}
                                borderRadius={'xl'}
                                onClick={(e) => {
                                    e.target.closest('div').style.border = '2px solid #3b82f6'
                                    e.target.closest('div').style.borderRadius = '14px'

                                }}
                                onBlur={(e) => { 
                                    e.target.closest('div').style.border = 'none'
                                    e.target.closest('div').style.borderRadius = 'none'
                                }}
                            >
                                <Input
                                    name="otp"
                                    id="otp"
                                    placeholder='OTP'
                                    value={data.otp}
                                    bg={'transparent'}
                                    borderColor={'transparent'}
                                    _hover={{
                                        borderColor: 'none'
                                    }}
                                    focusBorderColor="transparent"
                                    onChange={(e) => setData(otp, e.target.value)}
                                />
                                <Button bg={'blue.500'} color={'white'} borderRadius={'xl'}>Send OTP</Button>
                            </Flex>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            Save
                        </Button>
                        <Button colorScheme='red' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}