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
    Container,
    Circle,
    Card,
    CardBody,
    CardFooter,
    ButtonGroup,
    Image,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Logo from "./Shared/Logo"
import { useForm, Link, usePage } from "@inertiajs/react"
import dialCode from '../Assets/data/dial-code.json'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "@chakra-ui/icons"
import React from "react"
import PatientLayout from '@/Layouts/PatientLayout'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ClinicCard from "@/Components/ClinicCard"

const clinics = [
    {
        name: 'M Plaza',
        location: '1st Floor, M Plaza - 39 Le Duan, Ben Nghe, District 1, HCMC',
        time: 'Everyday, 08:00 - 20:00',
        timeAvailable: '10:45'
    },
    {
        name: 'Republic Plaza',
        location: 'Ground floor, 18E Cong Hoa, Ward 4, Tan Binh, HCMC',
        time: 'Everyday, 08:00 - 20:00',
        timeAvailable: '10:15'
    },
    {
        name: 'Q2 Thao Dien',
        location: '21 Vo Truong Toan (Street 10 Gate), Thao Dien, District 2, HCMC',
        time: 'Everyday, 08:00 - 20:00',
        timeAvailable: '11:00'
    }
]

export default function Home() {
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const { get } = useForm()

    const bookingHandler = () => {
        get(route('patient.booking'))
    }

    return (
        <PatientLayout state={'home'}>
            <Box
                w={'100vw'}
            >
                <Box
                    position={'relative'}

                    w={'90%'}
                    ml={'7%'}

                    pb={'10px'}
                >
                    <Carousel
                        width={'100%'}
                        
                        autoPlay
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        infiniteLoop={true}
                        stopOnHover={true}

                        renderArrowNext={(clickHandler, hasNext) => {
                            return (
                              hasNext && (
                                    <Circle
                                        onClick={clickHandler}
                                        bg={'white'}

                                        position={'absolute'}
                                        top={'50%'}
                                        right={'5%'}
                                        zIndex={4}
                                    
                                        transform={'translateY(-50%)'}
                                        
                                        size={'40px'}

                                        color={'gray.500'}

                                        style={{
                                            cursor: 'pointer',
                                            boxShadow: '1px 1px 5px 1px gray',
                                        }}

                                        _hover={{
                                            opacity: '0.7',
                                        }}
                                    >
                                        <ChevronRightIcon />
                                    </Circle>
                              )
                            );
                        }}
                        
                        renderArrowPrev={(clickHandler, hasPrev) => {
                            return (
                                hasPrev && (
                                    <Circle
                                        onClick={clickHandler}
                                        bg={'white'}

                                        position={'absolute'}
                                        top={'50%'}
                                        left={'5%'}
                                        zIndex={4}
                                    
                                        transform={'translateY(-50%)'}
                                        
                                        size={'40px'}

                                        color={'gray.500'}

                                        style={{
                                            cursor: 'pointer',
                                            boxShadow: '1px 1px 5px 1px gray',
                                        }}

                                        _hover={{
                                            opacity: '0.7',
                                        }}
                                    >
                                        <ChevronLeftIcon />
                                    </Circle>
                                )
                            );
                        }}
                    >
                        <Box
                            width={'80%'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '50px',
                                }}
                                width={'50%'}
                                alt=""
                                src="https://nursesgroup.co.uk/assets/images/blog/healthcare-technology.jpg"
                            />
                        </Box>
                        <Box
                            width={'80%'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '50px',
                                }}
                                width={'50%'}
                                alt=""
                                src="https://nursesgroup.co.uk/assets/images/blog/healthcare-technology.jpg"
                            />
                        </Box>
                        <Box
                            width={'80%'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '50px',
                                }}
                                width={'50%'}
                                alt=""
                                src="https://nursesgroup.co.uk/assets/images/blog/healthcare-technology.jpg"
                            />
                        </Box>
                        <Box
                            width={'80%'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '50px',
                                }}
                                width={'50%'}
                                alt=""
                                src="https://nursesgroup.co.uk/assets/images/blog/healthcare-technology.jpg"
                            />
                        </Box>
                    </Carousel>

                    <Flex
                        direction={'column'}
                        justify={'center'}

                        position={'absolute'}
                        left={40}
                        bottom={20}

                        borderRadius={'xl'}

                        w={'25%'}
                        h={'30%'}
                        py={'8px'}
                        px={'8px'}

                        bg={'white'}
                        opacity={'0.9'}

                        zIndex={'5'}
                    >
                        <Box
                            fontSize={'25px'}

                            h={'60%'}
                            w={'85%'}

                            py={'10px'}

                            color={'#1366DE'}
                        >
                            Let us help look after your health
                        </Box>
                        <Button
                            onClick={bookingHandler}
                            w={'60%'}
                            mt={'8px'}

                            borderRadius={'30px'}

                            colorScheme={'blue'}

                            fontSize={'12px'}
                        >
                            Book Appointment
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </PatientLayout>
    )
}