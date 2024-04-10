import {
    Box,
    Stack,
    Input,
    InputGroup,
    InputLeftAddon,
    Flex,
} from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { useState } from "react";

const today = dayjs().second(0).millisecond(0)

const FILTER = {
    AGE: 'age',
    NAME: 'name',
}

const getAppointmentTime = (date, startTime) => {
    return dayjs(date).hour(startTime.split(':')[0]).minute(startTime.split(':')[1]).second(0).millisecond(0)
}

const getPatientData = (data, user) => {
    const patientData = {}
    let minDiff = Number.MAX_SAFE_INTEGER;
    patientData.patientId = data.patient.id
    patientData.name = data.patient.name
    patientData.age = data.patient.age
    if (data.appointments) {
        const foundItem = data.appointments.reduce((accumulator, currentItem) => {
            const appointmentDate = dayjs(currentItem.detail.date).second(0).millisecond(0)
            const diff = Math.abs(appointmentDate.diff(today))
            
            if (diff < minDiff && currentItem.doctor.id === user.id) {
                minDiff = diff
                accumulator = currentItem
                return accumulator
            } else {
                return accumulator
            }
        }, {})
        patientData.date = foundItem.detail.date
        const startTime = `${foundItem.detail.start_time.split(':')[0]}:${foundItem.detail.start_time.split(':')[1]}`
        const endTime = `${foundItem.detail.end_time.split(':')[0]}:${foundItem.detail.end_time.split(':')[1]}`
        patientData.startTime = startTime
        patientData.endTime = endTime
    }
    return patientData
}

const getFilteredData = (data, input, key = 'name') => {
    
    const filteredData = data.filter((item) => {
        if (input === '') {
            return item;
        }
        
        else {
            const patientFieldToTest = item.patient[key]
            const regex = new RegExp(input, "i")
            return regex.test(patientFieldToTest)
        }
    })

    return filteredData
}


export default function PatientList({ selectManager, medicalInfo }) {
    const { selected, setSelected } = selectManager
    const { auth } = usePage().props
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState(FILTER.NAME)
    
    const data = Object.values(medicalInfo)
    const filteredData = getFilteredData(data, input, filter);
    
    return (
        <Box
            w={'100%'}
            h={'100%'}
            p={'16px'}

            borderRadius={'xl'}
            
            bg={'#F6F7FA'}
        >
            <Box
                fontSize={'20px'}
                fontWeight={'bold'}
                
                borderBottom={'1px solid black'}
                mb={'24px'}
            >
                Patients List
            </Box>
            <Flex
                w={'100%'}
                mb={'16px'}
                align={'center'}
            >
                <Flex
                    w={'20%'}

                    align={'center'}

                    borderRadius={'20px'}
                    border={'1px solid #ECEDED'}

                    mr={'4px'}
                >
                    <Box
                        w={'50%'}
                        h={'100%'}
                        py={'10px'}

                        borderLeftRadius={'20px'}
                        _hover={filter == FILTER.AGE ? {
                            backgroundColor: '#EAF1FA',
                            color: '#1366DE',
                            cursor: 'pointer',
                        } : {
                            cursor: 'default',
                        }} 
                        bg={filter == FILTER.NAME ? 'blue.100' : 'white'}
                        color={filter == FILTER.NAME ? '#1366DE' : 'gray'}
                        fontWeight={filter == FILTER.NAME ? 'bold' : ''}

                        fontSize={'10px'}
                        textAlign={'center'}

                        onClick={() => setFilter(FILTER.NAME)}
                    >
                        Name
                    </Box>

                    <Box
                        w={'50%'}
                        h={'100%'}
                        py={'10px'}

                        borderRightRadius={'20px'}

                        _hover={filter == FILTER.NAME ? {
                            backgroundColor: '#EAF1FA',
                            color: '#1366DE',
                            cursor: 'pointer',
                        } : {
                            cursor: 'default',
                        }} 
                        bg={filter == FILTER.AGE ? 'blue.100' : 'white'}
                        color={filter == FILTER.AGE ? '#1366DE' : 'gray'}
                        fontWeight={filter == FILTER.AGE ? 'bold' : ''}
                        
                        fontSize={'10px'}
                        textAlign={'center'}

                        onClick={() => setFilter(FILTER.AGE)}
                    >
                        Age
                    </Box>
                </Flex>
                <Input
                    placeholder={`Type a patient ${filter}...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    
                    size={'md'}

                    borderRadius={'xl'}
                    bg={'white'}
                />
            </Flex>

            <Box
                w={'100%'}
                h={'90%'}

                overflowY={'scroll'}
            >
                <Stack spacing={3}>
                    {filteredData.length > 0 ?
                        filteredData.map((item) => {
                            const patientData = getPatientData(item, auth.doctor)
                            if (patientData) {
                                const { patientId, name, age, date, startTime, endTime } = patientData
                                const appointmentTime = getAppointmentTime(date, startTime)
                                return (
                                    <Box
                                        key={patientId}
                                        w={'100%'}
                                        p={'16px'}
    
                                        borderRadius={'xl'}
                                        border={'1px solid gray'}
    
                                        _hover={{
                                            cursor: 'pointer',
                                            backgroundColor: '#EAF1FA',
                                            color: '#1366DE'
                                        }}
    
                                        bg={selected === patientId ? '#EAF1FA' : 'transparent'}
                                        color={selected === patientId ? '#1366DE' : 'black'}
                                        onClick={() => setSelected(patientId)}
    
                                        fontSize={'14px'}
                                    >
                                        <Box fontWeight={'bold'}>{`${name}, ${age} years old`}</Box>
                                        {appointmentTime.diff(today) < 0 ? 
                                            <Box fontSize={'12px'} fontWeight={'bold'} mt={'4px'}>Last visit:</Box>
                                        :
                                            <Box fontSize={'12px'} fontWeight={'bold'} mt={'4px'}>Next Visit:</Box>
                                        }
                                        <Box fontSize={'12px'}>Date: {date}</Box>
                                        <Box fontSize={'12px'}>Time: {`${startTime} - ${endTime}`}</Box>
                                    </Box>
                                )
                            } else {
                                return <></>
                            }
                        })    
                    : 
                        <Box fontWeight={'bold'} ml={'8px'}>No booked patients</Box>
                    }
                </Stack>
            </Box>
        </Box>
    )
}