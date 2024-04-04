import {
    Box,
    Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import Logo from '../Pages/Shared/Logo'
import { Link, usePage } from '@inertiajs/react';
import DashboardSidebar from '@/Components/DashboardSidebar';


export default function DoctorLayout({ children, state }) {
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const {auth, message, flash} = usePage().props

    window.addEventListener('resize', () => { 
        setWindowSize(window.innerWidth)
    })

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
                <DashboardSidebar state={state} />

                {children}
            </Flex>
        </Box>
    )
}