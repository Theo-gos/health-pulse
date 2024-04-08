import {
    Box,
    Flex,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import dayjs from "dayjs"
import _ from "lodash"
import { CircularProgress } from "@chakra-ui/react"
import { Link, useForm } from "@inertiajs/react";
import TestResultList from "./TestResultList"

const today = dayjs().second(0).millisecond(0)

const colors = {
    Stable: 'black',
    Fair: '#AF8CFA',
    Mild: '#FFC999',
    Severe: '#DE5031',
}

const FILTER = {
    DATE: 'date',
    DOCTOR: 'doctor_name',
}

const TAB = {
    GENERAL: 'general',
    PRESCRIPTION: 'prescription',
}

const STATE = {
    APPOINTMENTS: 'appointments',
    TESTS: 'tests',
}

function isValidDateString(dateString) {
    return !isNaN(Date.parse(dateString));
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

const getPrescriptionsByKey = (data, key = 'date') => {
    const prescriptionObj = {}
    data.forEach((prescriptionWithDoctor) => {
        const prescription = prescriptionWithDoctor.detail
        prescription['doctor_name'] = prescriptionWithDoctor.doctor.name
        if (prescriptionObj[prescription[key]]) {
            prescriptionObj[prescription[key]].push(prescription)
        } else {
            prescriptionObj[prescription[key]] = [prescription]
        }
    })
    return prescriptionObj
}

export default function PatientMedicalRecord({ selectManager, medicalInfo, icd }) {
    const [data, setData] = useState({})
    const [tab, setTab] = useState(TAB.GENERAL)
    const [prescriptions, setPrescriptions] = useState({})
    const [pastAppointments, setPastAppointments] = useState([])
    const [state, setState] = useState(STATE.APPOINTMENTS);
    const [filter, setFilter] = useState(FILTER.DATE)
    const { get } = useForm()

    const { selected } = selectManager

    const prescriptionKeys = Object.keys(prescriptions)

    useEffect(() => {
        setData(medicalInfo[selected])
    }, [selected])

    useEffect(() => {
        if (!_.isEmpty(data)) {
                setPastAppointments(getPastAppointments(data.appointments))
                setPrescriptions(getPrescriptionsByKey(data.prescriptions, filter))
        }
    }, [data])

    useMemo(() => {
        if (!_.isEmpty(data)) {
            setPrescriptions(getPrescriptionsByKey(data.prescriptions, filter))
        }
    }, [filter])

    const handleNoteClick = (id) => {
        get(route('appointment.note', {appointment: id}))
    }

    console.log(data);

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
                    <Flex
                        align={'center'}
                        justify={'flex-start'}

                        textAlign={'center'}
                        fontSize={'14px'}

                        mt={'16px'}
                    >
                        <Box
                            p={'2px 6px'}

                            _hover={tab != TAB.GENERAL ? {
                                color: '#1366DE',
                                cursor: 'pointer',
                            } : {}}

                            borderBottom={tab == TAB.GENERAL ? '1px solid #1366DE' : '1px solid gray'}
                            color={tab == TAB.GENERAL ? '#1366DE' : 'gray'}

                            onClick={() => {
                                if (tab != TAB.GENERAL)
                                {
                                    setTab(TAB.GENERAL)
                                }
                            }}
                        >
                            General
                        </Box>

                        <Box
                            p={'2px 6px'}

                            _hover={tab != 'prescription' ? {
                                color: '#1366DE',
                                cursor: 'pointer',
                            } : {}}

                            borderBottom={tab == 'prescription' ? '1px solid #1366DE' : '1px solid gray'}
                            color={tab == 'prescription' ? '#1366DE' : 'gray'}

                            onClick={() => {
                                if (tab != 'prescription')
                                {
                                    setTab('prescription')
                                }
                            }}
                        >
                            Prescriptions
                        </Box>
                    </Flex>
                </Box>

                {
                    tab == TAB.GENERAL ?
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
                                                        <Box bg={icd[item.icd_code].color} p={'2px 6px'} borderRadius={'md'} color={'white'}>{item.icd_code}</Box>
                                                        <Box fontSize={'13px'}>{dateFormatter(item.date)}</Box>
                                                    </Flex>
                                                    <Box p={'8px'} fontWeight={'bold'}>{icd[item.icd_code].icd_name}</Box>
                                                </Box>
                                            ))
                                            :
                                            <Box pl={'8px'}>No Available Diagnoses</Box>
                                        }
                                    </SimpleGrid>
                                </Box>

                                <Box
                                    mt={'24px'}
                                    w={'100%'}
                                >
                                    <Flex
                                        w={'99%'}
                                        ml={'6px'}
                                        mb={'8px'}

                                        align={'center'}
                                        justify={'space-between'}
                                    >
                                        <Box
                                            fontWeight={'bold'}
                                            fontSize={'14px'}
                                        >
                                            Visits history
                                        </Box>

                                        <Flex
                                            w={'20%'}

                                            align={'center'}

                                            borderRadius={'20px'}
                                            border={'1px solid #ECEDED'}
                                        >
                                            <Box
                                                w={'50%'}
                                                h={'100%'}
                                                p={'2px 4px'}

                                                borderLeftRadius={'20px'}
                                                _hover={state == STATE.TESTS ? {
                                                    backgroundColor: '#EAF1FA',
                                                    color: '#1366DE',
                                                    cursor: 'pointer',
                                                } : {
                                                    cursor: 'default',
                                                }} 
                                                bg={state == STATE.APPOINTMENTS ? 'blue.100' : 'white'}
                                                color={state == STATE.APPOINTMENTS ? '#1366DE' : 'gray'}
                                                fontWeight={state == STATE.APPOINTMENTS ? 'bold' : ''}

                                                fontSize={'10px'}
                                                textAlign={'center'}

                                                onClick={() => setState(STATE.APPOINTMENTS)}
                                            >
                                                Appointments
                                            </Box>

                                            <Box
                                                w={'50%'}
                                                h={'100%'}
                                                p={'2px 4px'}

                                                borderRightRadius={'20px'}

                                                _hover={state == STATE.APPOINTMENTS ? {
                                                    backgroundColor: '#EAF1FA',
                                                    color: '#1366DE',
                                                    cursor: 'pointer',
                                                } : {
                                                    cursor: 'default',
                                                }} 
                                                bg={state == STATE.TESTS ? 'blue.100' : 'white'}
                                                color={state == STATE.TESTS ? '#1366DE' : 'gray'}
                                                fontWeight={state == STATE.TESTS ? 'bold' : ''}
                                                
                                                fontSize={'10px'}
                                                textAlign={'center'}

                                                onClick={() => setState(STATE.TESTS)}
                                            >
                                                Tests
                                            </Box>
                                        </Flex>
                                    </Flex>

                                    {
                                        state === STATE.APPOINTMENTS ? (
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
                                                            w={'25%'}
                                                            p={'8px'}
                                                        >
                                                            Specialty
                                                        </Box>  
    
                                                        <Box
                                                            w={'15%'}
                                                            textAlign={'center'}
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
                                                                        {`Dr. ${appointment.doctor.name}`}
                                                                    </Box>  
    
                                                                    <Box
                                                                        w={'25%'}
                                                                        p={'8px'}
                                                                        borderBottom={'1px solid #D1D1D3'}
                                                                    >
                                                                        {`${appointment.doctor.type.charAt(0).toUpperCase()}${appointment.doctor.type.slice(1)}`}
                                                                    </Box>  
    
                                                                    <Box
                                                                        w={'15%'}
                                                                        p={'8px'}
                                                                        borderBottom={'1px solid #D1D1D3'}
                                                                        textAlign={'center'}
                                                                        color={'#1366DE'}

                                                                        _hover={{
                                                                            color: 'blue',
                                                                            cursor: 'pointer',
                                                                        }}

                                                                        onClick={() => handleNoteClick(appointment.detail.id)}
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
                                        ) : (
                                                <Stack
                                                    w={'100%'}
                                                    h={'30vh'}

                                                    spacing={3}

                                                    p={'4px'}
                                                    overflowY={'scroll'}   
                                                >
                                                    <TestResultList data={data}/>
                                                </Stack>
                                        )
                                    }
                                </Box>
                            </Stack>
                        </Box>
                        :
                        <Stack
                            w={'100%'}
                            h={'82%'}

                            overflowY={'scroll'}
                        >
                            <Box
                                w={'100%'}
                                h={'20px'}
                            >
                                <Flex
                                    w={'100px'}
                                    h={'100%'}

                                    borderRadius={'20px'}
                                    border={'1px solid #ECEDED'}
                                >
                                    <Box
                                        w={'50%'}
                                        h={'100%'}
                                        pt={'2px'}

                                        borderLeftRadius={'20px'}
                                        _hover={filter == FILTER.DOCTOR ? {
                                            backgroundColor: '#EAF1FA',
                                            color: '#1366DE',
                                            cursor: 'pointer',
                                        } : {
                                            cursor: 'default',
                                        }} 
                                        bg={filter == FILTER.DATE ? 'blue.100' : 'white'}
                                        color={filter == FILTER.DATE ? '#1366DE' : 'gray'}
                                        fontWeight={filter == FILTER.DATE ? 'bold' : ''}

                                        fontSize={'10px'}
                                        textAlign={'center'}

                                        onClick={() => setFilter(FILTER.DATE)}
                                    >
                                        Date
                                    </Box>

                                    <Box
                                        w={'50%'}
                                        h={'100%'}
                                        pt={'2px'}

                                        borderRightRadius={'20px'}

                                        _hover={filter == FILTER.DATE ? {
                                            backgroundColor: '#EAF1FA',
                                            color: '#1366DE',
                                            cursor: 'pointer',
                                        } : {
                                            cursor: 'default',
                                        }} 
                                        bg={filter == FILTER.DOCTOR ? 'blue.100' : 'white'}
                                        color={filter == FILTER.DOCTOR ? '#1366DE' : 'gray'}
                                        fontWeight={filter == FILTER.DOCTOR ? 'bold' : ''}
                                        
                                        fontSize={'10px'}
                                        textAlign={'center'}

                                        onClick={() => setFilter(FILTER.DOCTOR)}
                                    >
                                        Doctor
                                    </Box>
                                </Flex>
                            </Box>
                            {prescriptionKeys.map(key => {
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
                                        {isValidDateString(key) ? dateFormatter(key) : key}
                                    </Box>
                                    <Flex
                                        w={'auto'}
                                        h={'30vh'}
                                        p={'8px'}

                                        align={'center'}

                                        overflowX={'scroll'}
                                    >
                                        {prescriptions[key].map(prescription => {
                                            return <Box
                                                key={prescription.id}
                                                mr={'8px'}
                                                w={'13vw'}
                                                h={'100%'}
                                                p={'8px'}

                                                flex={'0 0 auto'}

                                                borderRadius={'xl'}

                                                bg={'white'}
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
                                                        <Box fontSize={'11px'} color={'gray'}>Prescription code</Box>
                                                        <Box fontSize={'12px'} fontWeight={'bold'}>{prescription.id}</Box>
                                                    </Box>

                                                    <Box
                                                        w={'50%'}
                                                        textAlign={'right'}
                                                    >
                                                        <Box fontSize={'11px'} color={'gray'}>Date of issue</Box>
                                                        <Box fontSize={'12px'} fontWeight={'bold'}>{dateFormatter(prescription.date)}</Box>
                                                    </Box>
                                                </Flex>

                                                <Box
                                                    w={'100%'}
                                                    h={'25%'}
                                                    p={'8px 4px'}

                                                    borderBottom={'1px solid #ECEDED'}
                                                >
                                                    <Box fontSize={'11px'} color={'gray'}>Issued by</Box>
                                                    <Box fontSize={'12px'} fontWeight={'bold'}>Dr. {prescription.doctor_name}</Box>
                                                </Box>

                                                <Box
                                                    w={'100%'}
                                                    h={'50%'}
                                                    px={'4px'}
                                                    py={'16px'}
                                                >
                                                    <Box fontSize={'11px'} color={'gray'}>Medication and Dosage</Box>
                                                    <Box
                                                        w={'100%'}
                                                        h={'95%'}
                                                        p={'8px'}

                                                        borderLeft={'1px solid green'}

                                                        fontSize={'12px'}
                                                    >
                                                        <Box fontWeight={'bold'}>{prescription.medication_name}</Box>
                                                        <Box color={'gray'}>{`${prescription.dose}, ${prescription.pill_per_day}`}</Box>
                                                        <Box fontSize={'10px'} overflow={'hidden'}>{prescription.recommendation}</Box>
                                                    </Box>
                                                </Box>
                                            </Box>       
                                        })}
                                    </Flex>
                                </Box>
                            })}
                        </Stack>
                }
            </Box>
            :
            <CircularProgress mx={'auto'} mt={'45vh'} isIndeterminate color='blue.300' />
    )
}