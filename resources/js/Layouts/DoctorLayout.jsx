import {
    Box,
    Flex,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import Logo from '../Pages/Shared/Logo'
import { Link, usePage } from '@inertiajs/react';
import DashboardSidebar from '@/Components/DashboardSidebar';
import Pusher from 'pusher-js';


export default function DoctorLayout({ children, state }) {
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const toast = useToast()

    const { auth, message, flash } = usePage().props
    const [messageData, setMessageData] = useState(message)
    const [isNewNotification, setIsNewNotification] = useState(false)

    const newNotificationManager = {
        isNewNotification: isNewNotification,
        setIsNewNotification: setIsNewNotification,
    }

    window.addEventListener('resize', () => { 
        setWindowSize(window.innerWidth)
    })

    useEffect(() => {
        const pusher = new Pusher('2c39a692a4324a5d3cdb', {
            cluster: 'ap1'
        });

        const channel = pusher.subscribe(`appointment-booking-channel.${auth.doctor.id}`);
        channel.bind('appointment-booked-event', function(e) {
            console.log('Received data:', e.data.message);
            toast({
                title: `Info`,
                description: e.data.message,
                status: 'info',
                position: 'top',
                duration: 5000,
                isClosable: true,
            })
            setIsNewNotification(true)
        });


        return () => {
            channel.unbind();
            pusher.unsubscribe(`appointment-booking-channel.${auth.doctor.id}`);
        };
    }, []);

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

    return (
        <Box
            position={'relative'}
            bg={'white'}

            w={'100vw'}
            h={'100vh'}
        >
            <Flex
                w={'100%'}
                h={'95vh'}
            >
                <DashboardSidebar state={state} newNotificationManager={newNotificationManager}  />

                {children}
            </Flex>
        </Box>
    )
}