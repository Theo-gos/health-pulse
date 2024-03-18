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
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import ServiceCard from "../../../Components/ServiceCard";
import AppointmentBookingContent from "@/Components/AppointmentBookingContent";

export default function AppointmentBooking({bookingData}) {
    const { post, data, setData } = useForm({
        service: 0,
        doctor: 0,
        time: '',
    })
    const dataManager = {
        data: data,
        changeData: setData,
    }

    const [view, setView] = useState('Service')
    const viewManager = {
        view: view,
        changeView: setView,
    }

    console.log(bookingData)

    return (
        <PatientLayout>
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
                        <AppointmentBookingContent data={view == 'Service' && bookingData ? bookingData.services : bookingData.doctors} viewManager={viewManager} dataManager={dataManager} />
                    </Box>
                </Box>
            </Box>
        </PatientLayout>
    )
}