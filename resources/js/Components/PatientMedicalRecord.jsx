import {
    Box,
    Flex,
    HStack,
    SimpleGrid,
    Stack,
} from "@chakra-ui/layout"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import _ from "lodash"
import { CircularProgress } from "@chakra-ui/react"

const today = dayjs().second(0).millisecond(0)

const colors = {
    Stable: 'black',
    Fair: '#AF8CFA',
    Mild: '#FFC999',
    Severe: '#DE5031',
}

const dateFormatter = (date) => {
    const dateArray = date.split('-')
    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
}

const getPastAppointments = (data) => {
    const pastAppointments = data.filter((appointment) => {
        const appointmentStartTime = appointment.detail.start_time.split(':')
        const appointmentDate = dayjs(appointment.detail.date).hour(Number(appointmentStartTime[0])).minute(Number(appointmentStartTime[1])).second(0).millisecond(0)
        return today.diff(appointmentDate) > 0
    })
    return pastAppointments
}

export default function PatientMedicalRecord({ selectManager, medicalInfo }) {
    const [data, setData] = useState({})
    const [pastAppointments, setPastAppointments] = useState([])
    const { selected } = selectManager

    useEffect(() => {
        setData(medicalInfo[selected])
    }, [selected])
    
    useEffect(() => {
        if (!_.isEmpty(data)) {
            setPastAppointments(getPastAppointments(data.appointments))
        }
    }, [data])

    console.log(data);
    console.log(getPastAppointments(pastAppointments));

    return (
        !_.isEmpty(data) ? 
            <Box
                w={'100%'}
                h={'100%'}
                p={'16px'}

                borderRadius={'xl'}
                
                bg={'#F6F7FA'}
            >
                <Box
                    mb={'24px'}
                >
                    <Box
                        fontSize={'36px'}
                        fontWeight={'bold'}
                    >
                        Medical Record
                    </Box>
                    {/* <Flex
                        align={'center'}
                        justify={'flex-start'}

                        textAlign={'center'}
                        fontSize={'14px'}

                        mt={'16px'}
                    >
                        <Box
                            p={'2px 6px'}

                            borderBottom={'1px solid #1366DE'}
                            color={'#1366DE'}
                        >
                            General
                        </Box>

                        <Box
                            p={'2px 6px'}

                            borderBottom={'1px solid gray'}
                            color={'gray'}
                        >
                            Prescriptions
                        </Box>
                    </Flex> */}
                </Box>

                <Box
                    w={'100%'}

                    h={'82%'}
                    overflowY={'scroll'}
                >
                    <Stack spacing={6}>
                        <Box
                            w={'100%'}
                        >
                            <Box fontWeight={'bold'} ml={'6px'}>Allergies</Box>
                            <SimpleGrid
                                mt={'16px'}

                                columns={3} spacing='16px'
                            >
                                <Box
                                    h={'10vh'}
                                    p={'12px'}

                                    fontSize={'12px'}

                                    bg={'white'}
                                    
                                    border={'1px solid #EEEFF1'}
                                    borderRadius={'xl'}
                                >
                                    <Box color={'gray.500'}>Drug</Box>
                                    <Stack w={'100%'} spacing={1} mt={'2px'} overflowY={'scroll'}>
                                        {
                                            data.allergies ?
                                                (data.allergies.Drug ? 
                                                    data.allergies.Drug.map((allergy, index) => (
                                                        <Flex
                                                            key={`drug-${index}`}
                                                            w={'100%'}
                                                            justify={'space-between'}
                                                            align={'center'}
                                                        >
                                                            <Box color={colors[allergy.severity]} fontWeight={'bold'}>{allergy.severity}</Box>
                                                            <Box>{allergy.name}</Box>
                                                        </Flex>
                                                    ))
                                                    :
                                                    <Box fontWeight={'bold'}>No known allergies</Box>
                                                )
                                                :
                                                <Box fontWeight={'bold'}>No known allergies</Box>
                                        }
                                    </Stack>
                                </Box>

                                <Box
                                    h={'10vh'}
                                    p={'12px'}

                                    fontSize={'12px'}

                                    bg={'white'}
                                    
                                    border={'1px solid #EEEFF1'}
                                    borderRadius={'xl'}
                                >
                                    <Box color={'gray.500'}>Food</Box>
                                    <Stack w={'100%'} spacing={1} mt={'2px'} overflowY={'scroll'}>
                                        {
                                            data.allergies ?
                                                (data.allergies.Food ? 
                                                    data.allergies.Food.map((allergy, index) => (
                                                        <Flex
                                                            key={`food-${index}`}
                                                            w={'100%'}
                                                            justify={'space-between'}
                                                            align={'center'}
                                                        >
                                                            <Box color={colors[allergy.severity]} fontWeight={'bold'}>{allergy.severity}</Box>
                                                            <Box>{allergy.name}</Box>
                                                        </Flex>
                                                    ))
                                                    :
                                                    <Box fontWeight={'bold'}>No known allergies</Box>
                                                )
                                                :
                                                <Box fontWeight={'bold'}>No known allergies</Box>
                                        }
                                    </Stack>
                                </Box>

                                <Box
                                    h={'10vh'}
                                    p={'12px'}

                                    fontSize={'12px'}

                                    bg={'white'}
                                    
                                    border={'1px solid #EEEFF1'}
                                    borderRadius={'xl'}
                                >
                                    <Box color={'gray.500'}>Environmental</Box>
                                    <Stack w={'100%'} spacing={1} mt={'2px'} overflowY={'scroll'}>
                                        {
                                            data.allergies ?
                                                (data.allergies.Environmental ? 
                                                    data.allergies.Environmental.map((allergy, index) => (
                                                        <Flex
                                                            key={`environment-${index}`}
                                                            w={'100%'}
                                                            justify={'space-between'}
                                                            align={'center'}
                                                        >
                                                            <Box color={colors[allergy.severity]} fontWeight={'bold'}>{allergy.severity}</Box>
                                                            <Box>{allergy.name}</Box>
                                                        </Flex>
                                                    ))
                                                    :
                                                    <Box fontWeight={'bold'}>No known allergies</Box>
                                                )
                                                :
                                                <Box fontWeight={'bold'}>No known allergies</Box>
                                        }
                                    </Stack>
                                </Box>
                            </SimpleGrid>
                        </Box>

                        <Box
                            w={'100%'}
                            h={'28vh'}
                        >
                            <Box fontWeight={'bold'} ml={'6px'}>Diagnoses</Box>
                            <SimpleGrid
                                mt={'16px'}
                                h={'87%'}

                                overflowY={'scroll'}
                                columns={2} spacing='4px'
                            >
                                {data.diagnoses.length > 0 ? 
                                    data.diagnoses.map((item, index) => (
                                        <Box
                                            key={index}
                                            h={'11vh'}
                                            p={'12px'}

                                            fontSize={'12px'}

                                            bg={'white'}
                                            
                                            border={'1px solid #EEEFF1'}
                                            borderRadius={'xl'}
                                        >
                                            <Flex
                                                align={'center'}
                                                justify={'space-between'}
                                                p={'2px 6px'}
                                                mb={'4px'}

                                                fontSize={'11px'}
                                            >
                                                <Box bg={item.color} p={'2px 6px'} borderRadius={'md'} color={'white'}>{item.icd_code}</Box>
                                                <Box fontSize={'13px'}>{dateFormatter(item.date)}</Box>
                                            </Flex>
                                            <Box p={'8px'} fontWeight={'bold'}>{item.icd_name}</Box>
                                        </Box>
                                    ))
                                    :
                                    <Box pl={'8px'}>No Available Diagnoses</Box>
                                }
                            </SimpleGrid>
                        </Box>

                        <Box
                            w={'100%'}
                            mt={'12px'}
                        >
                            <Box fontWeight={'bold'} ml={'6px'}>Medications</Box>
                            <Box
                                w={'100%'}

                                overflowX={'scroll'}
                            >
                                <HStack
                                    w={'fit-content'}
                                    mt={'16px'}

                                    overflowX={'scroll'}
                                    spacing='4px'
                                >
                                    {data.prescriptions.length > 0 ? 
                                        data.prescriptions.map( (item, index) => (
                                            <Box
                                                key={`medication-${index}`}
                                                h={'10vh'}
                                                w={'180px'}
                                                p={'12px 18px'}

                                                fontSize={'13px'}

                                                bg={'white'}
                                                
                                                border={'1px solid #EEEFF1'}
                                                borderRadius={'xl'}
                                            >
                                                <Box fontWeight={'bold'}>{item.medication_name}</Box>
                                                <Box mt={'10px'} color={'gray.500'}>{`${item.dose} ${item.pill_per_day.split(' ')[1]}`}</Box>
                                            </Box>
                                        ))
                                    :
                                        <Box pl={'8px'}>No Available Medications</Box>    
                                    }
                                </HStack>
                            </Box>
                        </Box>

                        <Box
                            mt={'24px'}
                            w={'100%'}
                        >
                            <Box fontWeight={'bold'} ml={'6px'}>Visits history</Box>
                            {
                                pastAppointments.length > 0 ? 
                                    <Box
                                        w={'100%'}
                                        h={'30vh'}
                                        p={'4px'}
                                    >
                                        <Flex
                                            align={'center'}

                                            fontSize={'13px'}
                                            color={'gray'}
                                        >
                                            <Box
                                                w={'25%'}
                                                p={'8px'}
                                            >
                                                Date
                                            </Box>  

                                            <Box
                                                w={'25%'}
                                                p={'8px'}
                                            >
                                                Doctor
                                            </Box>  

                                            <Box
                                                w={'31.7%'}
                                                p={'8px'}
                                            >
                                                Specialty
                                            </Box>  

                                            <Box
                                                w={'fit-content'}
                                                p={'8px'}
                                            >
                                                Note
                                            </Box>  
                                        </Flex>
                                        
                                        <Box
                                            w={'100%'}
                                            h={'90%'}
                                            overflowY={'scroll'}
                                        >
                                            <Stack spacing={3}>
                                                {pastAppointments.map((appointment, index) => {
                                                    return <Flex
                                                        key={`appointment-${index}`}
                                                        w={'100%'}
                                                        align={'center'}

                                                        fontSize={'12px'}
                                                        color={'black'}
                                                        fontWeight={'bold'}
                                                    >
                                                        <Box
                                                            w={'25%'}
                                                            p={'8px'}
                                                            borderBottom={'1px solid #D1D1D3'}
                                                        >
                                                            {appointment.detail.date}
                                                        </Box>  

                                                        <Box
                                                            w={'25%'}
                                                            p={'8px'}
                                                            borderBottom={'1px solid #D1D1D3'}
                                                        >
                                                            {`Dr. ${appointment.booked_doctor.name}`}
                                                        </Box>  

                                                        <Box
                                                            w={'25%'}
                                                            p={'8px'}
                                                            borderBottom={'1px solid #D1D1D3'}
                                                        >
                                                            {`${appointment.booked_doctor.type.charAt(0).toUpperCase()}${appointment.booked_doctor.type.slice(1)}`}
                                                        </Box>  

                                                        <Box
                                                            w={'150px'}
                                                            p={'8px'}
                                                            borderBottom={'1px solid #D1D1D3'}
                                                            textAlign={'center'}
                                                            color={'#1366DE'}
                                                        >
                                                            Link
                                                        </Box>  
                                                    </Flex>
                                                })}
                                            </Stack>
                                        </Box>
                                    </Box>
                                :
                                    <Box>No past appointments</Box>
                            }
                        </Box>
                    </Stack>
                </Box>
            </Box>
            :
            <CircularProgress mx={'auto'} mt={'45vh'} isIndeterminate color='blue.300' />
    )
}