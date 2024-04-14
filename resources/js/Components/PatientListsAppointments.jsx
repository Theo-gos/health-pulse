import {
    Box,
    Flex,
    SimpleGrid,
    Button,
} from "@chakra-ui/react";
import _ from "lodash";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

const today = dayjs()

const APPOINTMENT = {
    DONE: 'doneAppointment',
    ACTIVE: 'activeAppointments',
    CANCELED: 'canceledAppointments',
}

const color = {
    active: 'blue.100',
    done: 'green.100',
    canceled: 'red.100',
}

function isValidDateString(dateString) {
    return !isNaN(Date.parse(dateString));
}

const dateFormatter = (date) => {
    const dateArray = date.split('-')
    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
}

export default function PatientListsAppointments({ appointmentKeys, appointments, tab }) {
    const [hovered, setHovered] = useState(0)
    const { get } = useForm()

    const handleCancel = (id) => {
        get(route('patient.booking.cancel', {appointment: id}))
    }
    
    return (
        appointmentKeys.length > 0 ? 
            appointmentKeys.map(key => {
                return <Box
                    key={key}
                    w={'100%'}
                >
                    <Box
                        w={'100%'}
                        p={'8px'}

                        fontSize={'16px'}
                        fontWeight={'bold'}

                        borderBottom={'1px solid #ECEDED'}
                    >
                        {isValidDateString(key) ? dateFormatter(key) : `Dr. ${key}`}
                    </Box>
                    
                    <SimpleGrid
                        columns={{ sm: 1, md: 2, lg: 3 }}
                        w={'100%'}
                    
                        mt={'16px'}
                        spacingX={'16px'}
                        spacingY={'20px'}
                    >
                        {appointments[key].map(appointment => {
                            return <Box
                                position={'relative'}
                                onMouseEnter={() => setHovered(appointment.id)}
                                onMouseLeave={() => setHovered(0)}
                                key={appointment.id}
                                mr={'8px'}
                                w={'100%'}
                                h={'100%'}
                                p={'8px'}

                                flex={'0 0 auto'}

                                borderRadius={'xl'}

                                bg={color[appointment.status]}
                            >
                                <Flex
                                    w={'100%'}
                                    h={'25%'}
                                    p={'4px'}

                                    borderBottom={'1px solid #ECEDED'}

                                    justify={'space-between'}
                                >
                                    <Box
                                        w={'50%'}
                                    >
                                        <Box fontSize={'11px'} color={'gray'}>App. #</Box>
                                        <Box fontSize={'12px'} fontWeight={'bold'}>{appointment.id}</Box>
                                    </Box>

                                    <Box
                                        w={'50%'}
                                        textAlign={'right'}
                                    >
                                        <Box fontSize={'11px'} color={'gray'}>Date</Box>
                                        <Box fontSize={'12px'} fontWeight={'bold'}>{dateFormatter(appointment.date)}</Box>
                                    </Box>
                                </Flex>

                                <Box
                                    w={'100%'}
                                    h={'25%'}
                                    p={'8px 4px'}

                                    borderBottom={'1px solid #ECEDED'}
                                >
                                    <Box fontSize={'11px'} color={'gray'}>Booked doctor</Box>
                                    <Box fontSize={'12px'} fontWeight={'bold'}>Dr. {appointment.doctor_name}</Box>
                                </Box>

                                <Box
                                    w={'100%'}
                                    h={'50%'}
                                    px={'4px'}
                                    py={'16px'}
                                >
                                    <Box fontSize={'11px'} color={'gray'}>Time</Box>
                                    <Box
                                        w={'100%'}
                                        h={'95%'}

                                        fontSize={'12px'}
                                    >
                                        <Flex
                                            w={'100%'}

                                            align={'center'}
                                        >
                                            <Box w={'25%'} fontWeight={'bold'}>From:</Box>
                                            <Box>{appointment.start_time}</Box>
                                        </Flex>
                                        <Flex
                                            w={'100%'}

                                            align={'center'}
                                        >
                                            <Box w={'25%'} fontWeight={'bold'}>To:</Box>
                                            <Box>{appointment.end_time}</Box>
                                        </Flex>
                                    </Box>
                                </Box>

                                {hovered === appointment.id && tab === APPOINTMENT.ACTIVE ? 
                                    <Flex
                                        justify={'center'}
                                        align={'center'}
                                        
                                        position={'absolute'}
                                        top={0}
                                        left={0}
                                        right={0}
                                        bottom={0}

                                        borderRadius={'xl'}

                                        bg={'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(255,255,255,0.7591841668307948) 88%)'}
                                    >
                                        <Box>
                                            <Button
                                                size={'md'}
                                                colorScheme={'red'}
                                                onClick={() => handleCancel(appointment.id)}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </Flex>
                                :
                                    ''}
                            </Box>       
                        })}
                    </SimpleGrid>
                </Box>
            })
            :
            <Box fontSize={'16px'} fontWeight={'bold'} textAlign={'center'} w={'100%'}>No available appointments.</Box>
    )
}