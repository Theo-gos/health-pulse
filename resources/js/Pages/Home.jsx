import {
    Box,
    Flex,
    Circle,
    useDisclosure,
    Button,
    Stack,
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
import { useMediaQuery } from "react-responsive"

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
    const isMobile = useMediaQuery({ query: '(max-width: 844px)' })

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
                    h={'fit-content'}

                    ml={'7%'}

                    pb={'10px'}
                >
                    <Carousel
                        width={'100%'}
                        position={'relative'}
                        
                        interval={7000}
                        autoPlay={!isMobile}
                        showStatus={false}
                        showThumbs={false}
                        showIndicators={isMobile}
                        infiniteLoop={true}
                        stopOnHover={!isMobile}

                        renderArrowNext={!isMobile ? (clickHandler, hasNext) => {
                            return (
                                hasNext && (
                                    <Circle
                                        onClick={clickHandler}
                                        bg={'white'}

                                        position={'absolute'}
                                        top={'40%'}
                                        right={15}
                                        zIndex={4}
                                    
                                        
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
                        }
                            :
                            () => {return <></>}
                        }
                        
                        renderArrowPrev={!isMobile ? (clickHandler, hasPrev) => {
                            return (
                                hasPrev && (
                                    <Circle
                                        onClick={clickHandler}
                                        bg={'white'}

                                        position={'absolute'}
                                        top={'40%'}
                                        left={15}
                                        zIndex={4}
                                        
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
                        }
                            :
                            () => {return <></>}
                        }

                        renderIndicator={isMobile ? (onClickHandler, isSelected, index, label) => {
                                if (isSelected) {
                                    return (
                                        <li
                                            style={{
                                                height: 10,
                                                display: 'inline-block',
                                                margin: '0 8px',
                                                borderRadius: '25px',
                                                width: 40,
                                                background: '#1366DE',
                                            }}
                                            aria-label={`Selected: ${label} ${index + 1}`}
                                            title={`Selected: ${label} ${index + 1}`}
                                        />
                                    );
                                }
                                return (
                                    <li
                                        style={{
                                            background: 'gray',
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            margin: '0 8px',
                                        }}
                                        onClick={onClickHandler}
                                        onKeyDown={onClickHandler}
                                        value={index}
                                        key={index}
                                        role="button"
                                        tabIndex={0}
                                        title={`${label} ${index + 1}`}
                                        aria-label={`${label} ${index + 1}`}
                                    />
                                );
                            }
                            :
                            () => {return <></>}
                        }
                    >
                        <Box
                            width={'80%'}
                            height={'fit-content'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '30px',
                                }}
                                height={'700px'}
                                width={'50%'}
                                alt=""
                                src="https://res.cloudinary.com/dg2t3lprx/image/upload/v1712889826/im-e-health-the-formula-for-success-in-healthcare_w5zmlj.jpg"
                            />
                        </Box>
                        <Box
                            width={'80%'}
                            height={'fit-content'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '30px',
                                }}
                                height={'700px'}
                                width={'50%'}
                                alt=""
                                src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/smart-clinic/banner-03.jpg"
                            />
                        </Box>
                        <Box
                            width={'80%'}
                            height={'fit-content'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '30px',
                                }}
                                height={'700px'}
                                width={'50%'}
                                alt=""
                                src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/smart-clinic/banner-02.jpg"
                            />
                        </Box>
                        <Box
                            width={'80%'}
                            height={'fit-content'}
                            mx={'auto'}
                            mt={'40px'}
                        >
                            <img
                                style={{
                                    borderRadius: '30px',
                                }}
                                height={'700px'}
                                width={'50%'}
                                alt=""
                                src="https://res.cloudinary.com/dg2t3lprx/image/upload/v1712889843/Healthcare-Management_horizontal_gmipz1.jpg"
                            />
                        </Box>
                    </Carousel>

                    {!isMobile ? 
                            <Flex
                                direction={'column'}
                                justify={'center'}

                                position={'absolute'}
                                left={40}
                                bottom={20}

                                borderRadius={'xl'}

                                w={'40%'}
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
                                    px={'8px'}

                                    color={'#1366DE'}
                                >
                                    Let us help look after your health
                                </Box>
                                <Button
                                    onClick={bookingHandler}
                                    w={'60%'}
                                    mt={'8px'}
                                    px={'8px'}

                                    borderRadius={'30px'}

                                    colorScheme={'blue'}

                                    fontSize={'12px'}
                                >
                                    Book Appointment
                                </Button>
                            </Flex>
                        :
                            <></>
                    }
                </Box>

                {isMobile ? 
                        <Stack
                            spacing={2}
                        
                            alignItems={'center'}

                            w={'100%'}
                            p={'16px'}
                            mt={'32px'}
                        
                            bg={'gray.200'}
                        >
                            <Box
                                fontSize={'25px'}
                                w={'100%'}

                                px={'8px'}

                                textAlign={'center'}
                            
                                color={'#1366DE'}
                            >
                                Let us help look after your health
                            </Box>
                            <Button
                                onClick={bookingHandler}
                                w={'60%'}
                                mt={'8px'}
                                px={'8px'}

                                borderRadius={'30px'}

                                colorScheme={'blue'}

                                fontSize={'12px'}
                            >
                                Book Appointment
                            </Button>
                        </Stack>
                    :
                        <></>
                }
            </Box>
        </PatientLayout>
    )
}