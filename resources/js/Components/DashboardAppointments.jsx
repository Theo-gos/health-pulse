import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    CircularProgress,
    Flex,
    Grid,
    GridItem,
    Text,
    calc,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsCalendar2Event } from "react-icons/bs";
import Timeline from "./Timeline";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs"
import { useEffect, useState } from "react";
import _ from 'lodash';

// Using the duration (time_end - time_start) to calculate the rowspan
// Using the interval between 2 appointments (time_start - time_end) to calculate the rowspan

const rowSpanExchange = (number) => {
    let result = 0
    if (number > 10 && number <= 15)
        result = 1  
    if (number > 15 && number <= 30)
        result = 2  
    if (number > 30 && number <= 45)
        result = 3
    else if (number > 45)
        result = 4
    return result
}

const getSpan = (start, end) => {
    start = start.split(":")
    end = end.split(":")
    const startDate = new Date(0, 0, 0, start[0], start[1], 0)
    const endDate = new Date(0, 0, 0, end[0], end[1], 0)
    let diff = endDate.getTime() - startDate.getTime()
    const hours = Math.floor(diff / 1000 / 60 / 60)
    diff -= hours * 1000 * 60 * 60
    const minutes = Math.floor(diff / 1000 / 60)

    return hours * 4 + rowSpanExchange(minutes)
}

const renderItem = (data, initialTime = '8:00:00') => {
    let anchor = initialTime

    return data.map((item, index) => {
        const ret = []
        const emptySpan = getSpan(anchor, item.start_time)
        const duration = getSpan(item.start_time, item.end_time)
        const startTime = item.start_time.split(':')
        const endTime = item.end_time.split(':')
        const startHour = new Date(item.date).setHours(startTime[0], startTime[1], startTime[2])
        const endHour = new Date(item.date).setHours(endTime[0], endTime[1], endTime[2])
        const currentHour = new Date().getTime()
        const name = item.patient_name.split(' ')
        const current = currentHour > startHour && currentHour < endHour

        anchor = item.end_time

        if (emptySpan)
            ret.push(<GridItem key={`empty-${index}`} rowSpan={emptySpan} />)
        
        ret.push(
            <GridItem
                key={index}
                w={'100%'}
                h={'100%'}
                rowSpan={duration}
            >
                <Flex
                    border={'1px solid black'}
                    borderRadius={'md'}
                    borderColor={current ? 'blue.200' : 'gray.200'}

                    justify={'space-between'}
                    align={'center'}

                    p={'8px'}

                    w={'100%'}
                    h={'100%'}
                >
                    {duration <= 2 ?
                        <Flex justify={'space-between'} w={'100%'} fontSize={'12px'}>
                            <Box
                                color={'black'}
                                fontWeight={'bold'}
                            >
                                {`${name[0].charAt(0).toUpperCase()}. ${name[1]}`}
                            </Box>
                            <Box>{`${startTime[0]}:${startTime[1]}`}</Box>
                        </Flex>
                        :
                        <Box flexGrow={'1'}>
                            <Text fontSize={'12px'} fontWeight={'bold'} color={'black'}>{item.patient_name}</Text>
                            <Text fontSize={'10px'}>{`${startTime[0]}:${startTime[1]} - ${endTime[0]}:${endTime[1]}`}</Text>
                        </Box>
                    }
                    
                    {current ?
                        <Box borderRadius={'lg'} color={'#279111'} bg={'#9EE28D'} fontSize={'11px'} p={'4px'}>
                            Ongoing
                        </Box>
                        :
                        ''
                    }
                </Flex>
            </GridItem>
        )

        if (endTime[1] >= 45) {
            anchor = `${Number(endTime[0]) + 1}:00:00`
        }

        return ret
    })
}


export default function DashboardAppointments() {
    const [date, setDate] = useState(dayjs())
    const [state, setState] = useState('')
    const [data, setData] = useState({})
    const [curData, setCurData] = useState({})

    useEffect(() => {
        setState('loading')
        const curDate = date.format('YYYY-MM-DD')
        const curTime = dayjs().format('HH:mm:ss')

        fetch(`http://localhost:8000/appointment/date/${curDate}`)
            .then(res => {
                return res.json()
            })
            .then(items => {
                setData(items)
                setState('loaded')
            })
        
        fetch(`http://localhost:8000/appointment/hour/${curTime}`)
            .then(res => {
                return res.json()
            })
            .then(items => {
                setCurData(items[0])
            })
    }, [date])
        
    const handlePrev = () => {
        setDate(date.subtract(1, 'day'))
    }

    const handleNext = () => {
        setDate(date.add(1, 'day'))
    }

    return (
        <Box
            border={'2px solid #F0F0F1'}
            
            borderRadius={'xl'}
            bg={'white'}
            color={'black'}

            w={'55vw'}
            h={'55vh'}
        >
            <Flex
                p={'16px 16px 8px'}

                justify={'space-between'}
                align={'center'}
            >
                <Text fontWeight={'bold'}>Appointments</Text>
                <BsCalendar2Event />
            </Flex>

            <Flex w={'100%'} h={'85.5%'}>
                <Box w={'50%'} h={'100%'}>
                    <Flex
                        w={'100%'}
                        py={'8px'}

                        justify={'space-evenly'}
                        align={'center'}
                    >
                        <ChevronLeftIcon onClick={handlePrev} style={{cursor: 'pointer'}}/>
                        <Box>{date.format('MMMM DD')}</Box>
                        <ChevronRightIcon onClick={handleNext} style={{cursor: 'pointer'}}/>
                    </Flex>

                    <Flex
                        w={'100%'}
                        h={'86%'}

                        px={'8px'}
                        mb={'8px'}

                        overflow={'scroll'}
                    >
                        <Timeline pt={'8px'} />

                        {state === 'loaded' && data ?
                            <Grid
                                templateRows={'repeat(60, 1fr)'}
                                gap={0.5}

                                ml={'4px'}
                                mt={'10px'}

                                w={'95%'}
                                h={'932px'}
                            >
                                {renderItem(data)}
                            </Grid>
                            :
                            <CircularProgress mx={'auto'} mt={'45%'} isIndeterminate color='blue.300' />
                        }

                    </Flex>
                </Box>
                <Box
                    w={'50%'}
                    h={'100%'}
                    p={'8px'}
                >
                    <Box
                        bg={'#ECF3FC'}
                        borderRadius={'xl'}

                        w={'100%'}
                        h={'100%'}
                        p={'8px'}
                    >
                        {!_.isEmpty(curData) ?
                            <>
                                <Flex
                                    justify={'space-between'}
                                    align={'center'}
                                    fontSize={'14px'}
                                >
                                    <Box color={'black'} fontWeight={'bold'} >{curData.patient_name}</Box>
                                    <Box>{`${curData.start_time.split(':')[0]}:${curData.start_time.split(':')[1]} - ${curData.end_time.split(':')[0]}:${curData.end_time.split(':')[1]}`}</Box>
                                </Flex>

                                <Box
                                    h={'90%'}
                                    w={'100%'}
                                    py={'8px'}

                                    color={'#818EA0'}
                                    fontSize={'12px'}

                                    borderTop={'1px solid #818EA0'}
                                >
                                    <Grid
                                        templateAreas={`"visit visit_content"
                                                        "diagnoses diagnoses_content"
                                                        "tests tests_content"`}
                                        gridTemplateRows={'auto auto 1fr'}
                                        gridTemplateColumns={'20% 1fr'}
                                        gap='1'
                                        
                                        h='auto'
                                    >
                                        <GridItem area={'visit'}>
                                            Last visit
                                        </GridItem>
                                        <GridItem color={'#74777A'} area={'visit_content'}>
                                            <Flex
                                                justify={'space-between'}
                                            >
                                                <Text>16.01.2024</Text>
                                                <Link>
                                                    <Flex color={'#1366DE'} fontSize={'12px'} align={'center'}>
                                                        <Text mr={'4px'}>Medical Record</Text>
                                                        <BsArrowUpRight />
                                                    </Flex>
                                                </Link>
                                            </Flex>
                                        </GridItem>

                                        <GridItem area={'diagnoses'}>
                                            Diagnoses
                                        </GridItem>
                                        <GridItem color={'#74777A'} area={'diagnoses_content'}>
                                            ---
                                        </GridItem>

                                        <GridItem area={'tests'}>
                                            Tests
                                        </GridItem>
                                        <GridItem color={'#74777A'} area={'tests_content'}>
                                            <Box border={'1px solid #818EA0'} maxW={'150px'} borderRadius={'lg'} p={'2px'} mb={'2px'}>File 1</Box>
                                            <Box border={'1px solid #818EA0'} maxW={'150px'} borderRadius={'lg'} p={'2px'} mb={'2px'}>File 2</Box>
                                            <Box border={'1px solid #818EA0'} maxW={'150px'} borderRadius={'lg'} p={'2px'} mb={'2px'}>File 3</Box>
                                        </GridItem>
                                    </Grid>
                                </Box>
                            </>
                            :
                            <Box p={'8px'}>No Ongoing Appointment</Box>
                        }
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}