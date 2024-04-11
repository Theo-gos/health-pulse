import {
    Box,
    Stack,
    Input,
    InputGroup,
    InputLeftAddon,
    Circle,
    HStack,
    Flex,
} from "@chakra-ui/react";
import { Link, usePage, useForm } from "@inertiajs/react";
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

const renderPaginator = (paginator) => {
    return <>
        <Box
            style={paginator.links[0].url ?
                { color: '#1366DE', cursor: 'pointer' } :
                { color: 'gray', cursor: 'not-allowed' }
            }
        >
            {paginator.links[0].url ? 
                <Link href={paginator.first_page_url}>{`<<`}</Link>
                :
                `<<`
            }
        </Box>
        <Box
            style={paginator.links[0].url ?
                { color: '#1366DE', cursor: 'pointer' } :
                { color: 'gray', cursor: 'not-allowed' }
            }
        >
            {paginator.links[0].url ? 
                <Link href={paginator.links[0].url}>{`<`}</Link>
                :
                `<`
            }
        </Box>
        {paginator.links
            .filter(link => {
                return link.url && Number(link.label)
            })
            .map(link => {
                return <Link key={link.label} href={link.url}>
                    <Circle
                        style={ link.active ?
                        {
                                opacity: 0.4,
                        } : {
                                cursor: 'pointer',
                        }}

                        _hover={link.active ?
                            {}
                            :
                            {
                                backgroundColor: 'blue.100',
                                color: 'white',
                            }
                        }

                        size={'27px'}

                        bg={link.active ? 'blue.100' : 'transparent'}
                        color={link.active ? 'gray' : '#1366DE'}
                    > 
                        <Box>{link.label}</Box>
                    </Circle>
                </Link>
            })
        }
        <Box
            style={paginator.links[paginator.links.length - 1].url ?
                { color: '#1366DE', cursor: 'pointer' } :
                { color: 'gray', cursor: 'not-allowed' }
            }
        >
            {paginator.links[paginator.links.length - 1].url ? 
                <Link href={paginator.links[paginator.links.length - 1].url}>{`>`}</Link>
                :
                `>`
            }
        </Box>
        <Box
            style={paginator.links[paginator.links.length - 1].url ?
                { color: '#1366DE', cursor: 'pointer' } :
                { color: 'gray', cursor: 'not-allowed' }
            }
        >
            {paginator.links[paginator.links.length - 1].url ? 
                <Link href={paginator.last_page_url}>{`>>`}</Link>
                :
                `>`
            }
        </Box>
    </>
}

export default function PatientList({ selectManager, medicalInfo, paginator }) {
    const queryParams = new URLSearchParams(window.location.search);
    const { selected, setSelected } = selectManager
    const { auth } = usePage().props
    const [input, setInput] = useState('')
    const [typingTimeout, setTypingTimeout] = useState(0)
    const [filter, setFilter] = useState(queryParams.get('age') ? FILTER.AGE : FILTER.NAME)
    const { get, data: formData, setData, reset } = useForm({
        name: queryParams.get('name') || '',
        age: queryParams.get('age') || '',
        page: paginator.current_page,
    });
    
    const data = Object.values(medicalInfo)

    console.log(paginator);

    const handleSearch = (query) => {
        formData[filter] = query
        get(route('doctor.records'))
    }

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

                        onClick={() => {
                            setData({
                                ...formData,
                                name: '',
                                age: '',
                            })
                            setFilter(FILTER.NAME)
                            if (typingTimeout) {
                                clearTimeout(typingTimeout)
                                setTypingTimeout(0)
                            }
                        }}
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

                        onClick={() =>{
                            setData({
                                ...formData,
                                name: '',
                                age: '',
                            })
                            setFilter(FILTER.AGE)
                            if (typingTimeout) {
                                clearTimeout(typingTimeout)
                                setTypingTimeout(0)
                            }
                        }}
                    >
                        Age
                    </Box>
                </Flex>
                <Input
                    placeholder={`Type a patient ${filter}...`}
                    value={formData[filter]}
                    onChange={(e) => {
                        setData(filter, e.target.value)

                        if (typingTimeout) {
                            clearTimeout(typingTimeout)
                        }

                        setTypingTimeout(setTimeout(() => {
                            handleSearch(e.target.value)
                        }, 1000))
                    }}
                    
                    size={'md'}

                    borderRadius={'xl'}
                    bg={'white'}
                />
            </Flex>

            <HStack
                justify={'center'}
                mb={'16px'}

                color={'#1366DE'}

                spacing={5}
            >
                {renderPaginator(paginator)}
            </HStack>

            <Box
                w={'100%'}
                h={'90%'}

                overflowY={'scroll'}
            >
                <Stack spacing={3}>
                    {data.length > 0 ?
                        data.map((item) => {
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