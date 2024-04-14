import PatientLayout from "@/Layouts/PatientLayout";
import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Image,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";
import { useForm, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";
import ServiceCard from "../../../Components/ServiceCard";
import AppointmentBookingContent from "@/Components/AppointmentBookingContent";
import { useMediaQuery } from "react-responsive";

export default function AppointmentBooking({ bookingData }) {
    const isMobile = useMediaQuery({ query: '(max-width: 844px)' })
    const { post, data, setData, errors, setError, processing } = useForm({
        service: 0,
        doctor: 0,
        date: '',
        time: {},
    })
    const dataManager = {
        data: data,
        changeData: setData,
        errors: errors,
        setError: setError,
        post: post,
        processing: processing,
    }

    const [view, setView] = useState('Service')
    const viewManager = {
        view: view,
        changeView: setView,
    }

    const { message } = usePage().props

    return (
        <PatientLayout state={'none'}>
            {!isMobile ? 
                <Box mt={'80px'}>
                    <Box
                        fontSize={'32px'}

                        color={'#1366DE'}
                        
                        w={"fit-content"}
                        mx={'auto'}
                        my={'36px'}
                    >
                        Book Appointment
                    </Box>

                    <Box
                        w={'100%'}
                        h={'auto'}
                        pt={'10px'}

                        bg={'#E8F0FC'}
                    >
                        <Box
                            w={'60%'}
                            h={'100%'}
                            p={'20px 36px 60px'}

                            borderTopRadius={'25px'}
                            border={'gray.200'}
                            mx={'auto'}

                            bg={'white'}
                        >
                            <AppointmentBookingContent
                                data={view == 'Service' && bookingData ? bookingData.services : bookingData.doctors}
                                bookedAppointments={bookingData ? bookingData.bookedAppointments : {}}
                                duration={view == 'Doctor' ? bookingData.services[dataManager.data.service - 1].duration : ''}
                                
                                viewManager={viewManager}
                                dataManager={dataManager}
                            />
                        </Box>
                    </Box>
                </Box>
                :
                <Box mt={'80px'}>
                    <Box
                        fontSize={'32px'}

                        color={'#1366DE'}
                        bg={'#E8F0FC'}
                        
                        w={"100%"}
                        mx={'auto'}
                        py={'20px'}
                        textAlign={'center'}
                    >
                        Book Appointment
                    </Box>

                    <Box
                        w={'100%'}
                        h={'auto'}
                        pt={'10px'}
                    >
                        <Box
                            w={isMobile ? '80%' : '60%'}
                            h={'100%'}
                            p={'20px 36px 60px'}

                            borderTopRadius={'25px'}
                            border={'gray.200'}
                            mx={'auto'}

                            bg={'white'}
                        >
                            <AppointmentBookingContent
                                data={view == 'Service' && bookingData ? bookingData.services : bookingData.doctors}
                                bookedAppointments={bookingData ? bookingData.bookedAppointments : {}}
                                duration={view == 'Doctor' ? bookingData.services[dataManager.data.service - 1].duration : ''}
                                
                                viewManager={viewManager}
                                dataManager={dataManager}
                            />
                        </Box>
                    </Box>
                </Box>
            }
        </PatientLayout>
    )
}