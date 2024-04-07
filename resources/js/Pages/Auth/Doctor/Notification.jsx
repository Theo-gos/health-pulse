import {
    Box,
    Flex,
    Stack,
} from "@chakra-ui/react";
import { usePage } from '@inertiajs/react'
import { useEffect, useMemo, useState } from 'react'
import DoctorLayout from '@/Layouts/DoctorLayout'
import { Link, useForm } from "@inertiajs/react"

const TAB = {
    ALL: 'all',
    UNREAD: 'unread',
}

const TITLE = {
    M: 'Mr. ',
    F: 'Ms. ',
}

const dateFormatter = (date) => {
    const dateArray = date.split('-')
    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
}

export default function Notification({ notifications, unreadNotifications }) {
    const [selected, setSelected] = useState(TAB.ALL)

    return (
        <DoctorLayout state={'notification'}>
            <Box w={'100%'} h={'100vh'}>
                <Box
                    w={'100%'}
                    h={'100%'}
                    pt={'10px'}

                    bg={'#EDEEF3'}
                >
                    <Box
                        w={'95%'}
                        h={'97%'}
                        p={'20px 36px 60px'}
                        mt={'2px'}
                        mx={'auto'}

                        borderRadius={'25px'}
                        border={'gray.200'}

                        bg={'white'}
                    >
                        <Flex
                            justify={'space-between'}
                            align={'center'}

                            fontSize={'34px'}
                        >
                            <Box fontWeight={'bold'}>Your notification</Box>
                        </Flex>

                        <Flex
                            w={'100%'}
                            mt={'16px'}

                            justify={'flex-end'}
                        >
                            <Link
                                href={route('doctor.notifications.all-read')}
                            >
                                <Box
                                    mr={'16px'}
                                    fontSize={'14px'}
                                    fontWeight={'bold'}
                                    
                                    color={unreadNotifications.length > 0 ? '#1366DE' : 'gray'}
                                    _hover={unreadNotifications.length > 0 ? {
                                        cursor: 'pointer',
                                        color: 'blue',
                                    } : {
                                        cursor: 'not-allowed',
                                    }}
                                >
                                    Mark all as read
                                </Box>
                            </Link>
                        </Flex>

                        <Flex
                            w={'100%'}
                            mt={'8px'}

                            fontSize={'13px'}
                        >
                            <Box
                                w={'50%'}
                                p={'4px 8px'}

                                textAlign={'center'}

                                fontWeight={selected === TAB.ALL ? 'bold' : ''}
                                color={selected === TAB.ALL ? '#1366DE' : 'gray.500'}
                                borderBottom={selected === TAB.ALL ? '1px solid #1366DE' : '1px solid gray'}

                                onClick={() => {
                                    if (selected !== TAB.ALL)
                                        setSelected(TAB.ALL)
                                }}

                                _hover={selected === TAB.ALL ? {
                                    cursor: 'default',
                                } : {
                                    color: '#1366DE',
                                    borderBottom: '1px solid #1366DE',
                                    cursor: 'pointer'
                                }}
                            >
                                All Notifications
                            </Box>

                            <Box
                                w={'50%'}
                                p={'4px 8px'}

                                textAlign={'center'}

                                fontWeight={selected === TAB.UNREAD ? 'bold' : ''}
                                color={selected === TAB.UNREAD ? '#1366DE' : 'gray.500'}
                                borderBottom={selected === TAB.UNREAD ? '1px solid #1366DE' : '1px solid gray'}

                                onClick={() => {
                                    if (selected !== TAB.UNREAD)
                                        setSelected(TAB.UNREAD)
                                }}

                                _hover={selected === TAB.UNREAD ? {
                                    cursor: 'default',
                                } : {
                                    color: '#1366DE',
                                    borderBottom: '1px solid #1366DE',
                                    cursor: 'pointer'
                                }}
                            >
                                Unread Notifications
                            </Box>
                        </Flex>
                        
                        <Stack
                            w={'100%'}
                            h={'87%'}
                            mt={'16px'}

                            overflowY={'scroll'}

                            spacing={2}
                        >
                            {selected === TAB.ALL ? 
                                (notifications.length > 0 ? 
                                    notifications.map(notification => {
                                        const appointment = notification.data.appointment
                                        const patient = notification.data.patient
                                        return <Link
                                            key={notification.id}
                                            style={{
                                                width: '100%',
                                            }}
                                            href={route('doctor.notification.read', {notification: notification.id})}
                                        >
                                            <Box
                                                w={'100%'}
                                                p={'16px'}

                                                border={notification.read_at ? '1px solid #EDEEF3' : '1px solid #1366DE'}
                                                borderRadius={'xl'}

                                                bg={notification.read_at ? 'white' : 'blue.100'}
                                                color={notification.read_at ? 'gray' : '#1466DE'}
                                                style={notification.read_at ? { cursor: 'default' } : { cursor: 'pointer' }}
                                                _hover={notification.read_at ? '' : { color: 'blue' }}
                                                onClick={() => {
                                                    if (!notification.read_at) { 

                                                    }
                                                }}

                                                fontSize={'14px'}
                                            >
                                                <Flex
                                                    w={'100%'}

                                                    justify={'space-between'}
                                                    align={'center'}
                                                >
                                                    <Box>You've got an appointment with {`${TITLE[patient.sex]}${patient.name}`}</Box>
                                                    {notification.read_at ? <></> : <Box bg={'#1366DE'} w={'10px'} h={'10px'} borderRadius={'50%'} />}
                                                </Flex>
                                                <Box>On {dateFormatter(appointment.date)} at {appointment.start_time}</Box>
                                            </Box>
                                        </Link>
                                    })  
                                    :
                                    <Box fontSize={'16px'} fontWeight={'bold'}>No notifications.</Box>    
                                )
                                :
                                (unreadNotifications.length > 0 ? 
                                        unreadNotifications.map(notification => {
                                            const appointment = notification.data.appointment
                                            const patient = notification.data.patient
                                            return <Link
                                                key={notification.id}
                                                style={{
                                                    width: '100%',
                                                }}
                                                href={route('doctor.notification.read', {notification: notification.id})}
                                            >
                                                <Box
                                                    w={'100%'}
                                                    p={'16px'}
        
                                                    border={notification.read_at ? '1px solid #EDEEF3' : '1px solid #1366DE'}
                                                    borderRadius={'xl'}
        
                                                    bg={notification.read_at ? 'white' : 'blue.100'}
                                                    color={notification.read_at ? 'gray' : '#1466DE'}
                                                    style={notification.read_at ? { cursor: 'default' } : { cursor: 'pointer' }}
                                                    _hover={notification.read_at ? '' : { color: 'blue' }}
                                                    onClick={() => {
                                                        if (!notification.read_at) { 
        
                                                        }
                                                    }}
        
                                                    fontSize={'14px'}
                                                >
                                                    <Flex
                                                        w={'100%'}
        
                                                        justify={'space-between'}
                                                        align={'center'}
                                                    >
                                                        <Box>You've got an appointment with {`${TITLE[patient.sex]}${patient.name}`}</Box>
                                                        {notification.read_at ? <></> : <Box bg={'#1366DE'} w={'10px'} h={'10px'} borderRadius={'50%'} />}
                                                    </Flex>
                                                    <Box>On {dateFormatter(appointment.date)} at {appointment.start_time}</Box>
                                                </Box>
                                            </Link>
                                        })
                                    :
                                        <Box fontSize={'16px'} fontWeight={'bold'}>No unread notifications.</Box>
                                )
                            }
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </DoctorLayout>
    )
}