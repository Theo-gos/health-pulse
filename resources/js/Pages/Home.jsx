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
import Logo from "./Shared/Logo"
import { useForm, Link, usePage } from "@inertiajs/react"
import dialCode from '../Assets/data/dial-code.json'
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import PatientLayout from '@/Layouts/PatientLayout'

export default function Home() {
    
    // const initialRef = useRef(null)
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const { data, setData, errors, setError, post } = useForm({
    //     email: '',
    // });
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const { data } = usePage().props

    return (
        <PatientLayout
            auth={data ? true : false}
            name={data ? data.name : ''}
        >

            <Box>
                {data ? <Text>{data.name}</Text> : ''}
                Hello World
            </Box>

            {/* <Modal
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
                    <form onSubmit={submit}>
                        <ModalHeader>Log in via email</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody>
                            <FormLabel>Email</FormLabel>
                            <Box>
                                <FormControl isInvalid={errors.email}>
                                    <Input
                                        ref={initialRef}
                                        name="email"
                                        id="email"
                                        placeholder='Email to send you verification link'
                                        value={data.email}
                                        onChange={(e) => {
                                            setData('email', e.target.value)
                                            setError('email', '')
                                        }}
                                        borderRadius={'xl'}
                                    />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>
                            </Box> */}

                            
                            

                            {/* <FormControl mt={4}>
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
                            </FormControl> */}
                        {/* </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme='blue' mr={3} >
                                Send Verification Link
                            </Button>
                            <Button colorScheme='red' onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal> */}
        </PatientLayout>
            
    )
}