import {
    Box,
    Flex,
    Circle,
    useDisclosure,
    Button,
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

export default function Home() {
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const { get } = useForm()
    const { auth } = usePage().props
    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalManager = {
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
    }

    const patient = auth.patient

    const bookingHandler = () => {
        if (patient) {
            get(route('patient.booking'))
        } else {
            onOpen()
        }
    }

    return (
        <PatientLayout state={'home'} modalManager={modalManager}>
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
                        
                        interval={7000}
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
                            height={'700px'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '50px',
                                }}
                                height={'700px'}
                                width={'50%'}
                                alt=""
                                src="https://res.cloudinary.com/dg2t3lprx/image/upload/v1712889826/im-e-health-the-formula-for-success-in-healthcare_w5zmlj.jpg"
                            />
                        </Box>
                        <Box
                            width={'80%'}
                            height={'700px'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '50px',
                                }}
                                width={'50%'}
                                alt=""
                                src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/smart-clinic/banner-03.jpg"
                            />
                        </Box>
                        <Box
                            width={'80%'}
                            height={'700px'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '50px',
                                }}
                                width={'50%'}
                                alt=""
                                src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/smart-clinic/banner-02.jpg"
                            />
                        </Box>
                        <Box
                            width={'80%'}
                            height={'700px'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '50px',
                                }}
                                width={'50%'}
                                alt=""
                                src="https://res.cloudinary.com/dg2t3lprx/image/upload/v1712889843/Healthcare-Management_horizontal_gmipz1.jpg"
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