import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import {
    Box,
    Circle,
    CircularProgress,
    Flex,
    Grid,
    Icon,
    Square,
    Stack,
    Text,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import range from "lodash-es/range"
import { useEffect, useMemo, useState } from "react"
import { BsBluetooth, BsStopCircleFill } from "react-icons/bs"
import _ from 'lodash'
import { Link, useForm } from "@inertiajs/react"

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const today = dayjs()

let currentYear
let currentMonth
let daysInCurrentMonth
let dayObjOfFirst
let dateOfFirst
let dayObjOfLast
let dateOfLast
let firstDayOfMonth
let lastDayOfMonth

export default function DashboardSchedule({width, height, schedule, navigation}) {
    const [dayObj, setDayObj] = useState(dayjs())
    const [selected, setSelected] = useState(today)
    const [data, setData] = useState({})
    const [timeline, setTimeline] = useState([])
    const { get, processing } = useForm()

    useMemo(() => {
        currentYear = dayObj.year()
        currentMonth = dayObj.month() 
        daysInCurrentMonth = dayObj.daysInMonth()
    
        dayObjOfFirst = dayjs(`${currentYear}-${currentMonth + 1}-1`)
        dateOfFirst = dayObjOfFirst.day()
    
        dayObjOfLast = dayjs(`${currentYear}-${currentMonth + 1}-${daysInCurrentMonth}`)
        dateOfLast = dayObjOfLast.day()

        firstDayOfMonth = dayObjOfFirst.format('YYYY-MM-DD')
        lastDayOfMonth = dayObjOfLast.format('YYYY-MM-DD')
    }, [dayObj])


    useEffect(() => {
        if (typeof schedule !== 'undefined')
            setData(schedule)
    }, [schedule])
    
    useEffect(() => {
        setTimeline(data[selected.format('YYYY-MM-DD')])
    }, [data, selected])

    const handlePrev = () => { 
        setDayObj(dayObj.subtract(1, 'month'))
        get(route('doctor.dashboard.schedule', { start_date: firstDayOfMonth, end_date: lastDayOfMonth }), {
            preserveState: true,
        })
    }

    const handleNext = () => { 
        setDayObj(dayObj.add(1, 'month'))
        get(route('doctor.dashboard.schedule', { start_date: firstDayOfMonth, end_date: lastDayOfMonth }), {
            preserveState: true,
        })
    }

    return (
        <Flex
            border={'2px solid #F0F0F1'}
            align={'center'}
            justify={'space-between'}
            
            borderRadius={'xl'}
            bg={'white'}

            w={width}
            h={height}
        >
            <Box
                w={'50%'}
                h={'100%'}
                p={'20px 16px 0 16px'}

                borderLeftRadius={'xl'}

                bg={'transparent'}
            >
                <Flex color={'black'} fontWeight={'bold'} mb={'24px'} justify={'space-between'}  fontSize={'12px'}>
                    <Box>Schedule</Box>
                    <Flex align={'center'} justify={'space-evenly'} w={'40%'}>
                        <Box
                            style={{
                                cursor: 'pointer'
                            }}

                            onClick={handlePrev}
                        >
                            <ChevronLeftIcon />
                        </Box>
                        <Box fontWeight={'bold'} mr={'4px'}>{dayObj.format('MMMM YYYY')}</Box>
                        <Box
                            style={{
                                cursor: 'pointer'
                            }}
    
                            onClick={handleNext}
                        >
                            <ChevronRightIcon />
                        </Box>
                    </Flex>
                </Flex>
                <Grid
                    templateColumns='repeat(7, 1fr)'
                    gap={0}

                    textAlign={'center'}

                    w={'100%'}
                    h={'65%'}
                    mb={'14px'}
                    

                    bg={'transparent'}
                >
                    {weekDays.map(day => (
                        <Box fontSize={'11px'} key={day}>
                            {day}
                        </Box>
                    ))}

                    {range(dateOfFirst).map(i => (
                        <Box fontSize={'11px'} key={i} />
                    ))}

                    {range(daysInCurrentMonth).map(i => (
                        <Flex key={i} justify={'center'}>
                            <Circle
                                style={(i + 1 < today.date() && today.month() == currentMonth) || today.month() > currentMonth ?
                                {
                                    opacity: 0.4,
                                } : {
                                    cursor: 'pointer',
                                }}

                                _hover={(i + 1 < today.date() && today.month() == currentMonth) || today.month() > currentMonth ?
                                    {}
                                    :
                                    {
                                    backgroundColor: 'blue.100',
                                    color: 'white',
                                    }
                                }

                                size={'27px'}

                                bg={selected.date() === i + 1 && selected.month() == currentMonth ? 'blue.100' : 'transparent'}
                                color={selected.date() === i + 1 && selected.month() == currentMonth ? 'white' : 'black'}

                                onClick={() => {
                                    if (!(i + 1 < today.date() && today.month() == currentMonth)) {
                                        // setDayObj(dayjs(dayjs(`${currentYear}-${currentMonth + 1}-${i + 1}`)))
                                        setSelected(dayjs(dayjs(`${currentYear}-${currentMonth + 1}-${i + 1}`)))
                                    }
                                }}
                            > 
                                <Flex
                                    direction={'column'}
                                    align={'center'}

                                    fontSize={'11px'}
                                >
                                    {i + 1}
                                </Flex>
                            </Circle>
                        </Flex>
                    ))}

                    {range(6 - dateOfLast).map(i => (
                        <Box fontSize={'11px'} key={i} />
                    ))}
                </Grid>
            </Box>
            <Box
                w={'50%'}
                h={'100%'}

                p={'20px 16px 0 16px'}

                borderRightRadius={'xl'}

                bg={'white'}
            >
                <Flex
                    align={'flex-start'}
                    justify={'space-between'}
                >
                    <Text color={'black'} fontWeight={'bold'} mb={'24px'}>Timeline</Text>
                        {navigation ? 
                            <Square
                                border={'1px solid #BEE3F8'}
                                borderRadius={'sm'}
                                
                                style={{
                                    cursor: 'pointer'
                                }}

                                _hover={{
                                    backgroundColor: '#BEE3F8',
                                    color: 'white',
                                }}

                                size={'16px'}
                                mt={'3px'}
                            >
                                <Link href={route(`doctor.schedule`)}>
                                    <ChevronRightIcon />
                                </Link>
                            </Square>  
                            :
                            <></>
                        }
                </Flex>
                <Box
                    w={'100%'}
                    h={'80%'}
                    overflow={'scroll'}
                >
                    {typeof data[selected.format('YYYY-MM-DD')] !== 'undefined' && typeof timeline !== 'undefined' ? 
                        timeline.map(item => (
                            <Flex
                                key={item.id}
                                border={'1px solid #BEE3F8'}
                                borderRadius={'xl'}
                                
                                w={'100%'}
                                h={'auto'}
                                mb={'6px'}
        
                                fontSize={'10px'}
                            >
                                <Flex
                                    bg={'#BEE3F8'}
                                    borderLeftRadius={'xl'}
        
                                    w={'45px'}
                                    py={'3px'}
        
                                    color={'#1366DE'}
                                    direction={'column'}
                                    align={'center'}
                                    justify={'center'}
                                >
                                    <Text>{`${item.start_time.split(':')[0]}:${item.start_time.split(':')[1]}`}</Text>
                                    <Text>-</Text>
                                    <Text>{`${item.end_time.split(':')[0]}:${item.end_time.split(':')[1]}`}</Text>
                                </Flex>
                                <Box
                                    overflow={'hidden'}
                                    p={'13px 15px'}
                                    w={'97%'}
                                >
                                    <Text color={'black'} fontWeight={'bold'}>{item.task}</Text>
                                    <Box fontSize={'9px'} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{item.location}</Box>
                                </Box>
                            </Flex>
                            
                        ))
                        :
                        <Box w={'100%'} h={'100%'} p={'16px'}>No schedule</Box>
                    }
                </Box>
            </Box>
        </Flex>
    )
}