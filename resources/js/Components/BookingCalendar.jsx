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
import { useEffect, useMemo, useReducer, useRef, useState } from "react"
import { BsBluetooth, BsStopCircleFill } from "react-icons/bs"
import _ from 'lodash'
import { Link, useForm } from "@inertiajs/react"
import { useMediaQuery } from "react-responsive"

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const today = dayjs()

let currentYear
let currentMonth
let daysInCurrentMonth
let dayObjOfFirst
let dateOfFirst
let dayObjOfLast
let dateOfLast

export default function BookingCalendar({width, height, dateManager, dataManager, timeline, error}) {
    const [dayObj, setDayObj] = useState(dayjs())
    const [selected, setSelected] = useState(-1)
    const { selectedDate, setSelectedDate } = dateManager
    const timelineRef = useRef(null)
    const isMobile = useMediaQuery({ query: '(max-width: 844px)' })

    useEffect(() => {
        dataManager.changeData('date', selectedDate.format('YYYY-MM-DD'))
    },[selectedDate])

    useMemo(() => {
        currentYear = dayObj.year()
        currentMonth = dayObj.month() 
        daysInCurrentMonth = dayObj.daysInMonth()
    
        dayObjOfFirst = dayjs(`${currentYear}-${currentMonth + 1}-1`)
        dateOfFirst = dayObjOfFirst.day()
    
        dayObjOfLast = dayjs(`${currentYear}-${currentMonth + 1}-${daysInCurrentMonth}`)
        dateOfLast = dayObjOfLast.day()
    }, [dayObj])

    const handlePrev = () => { 
        setDayObj(dayObj.subtract(1, 'month'))
    }

    const handleNext = () => { 
        setDayObj(dayObj.add(1, 'month'))
    }

    const scrollTop = () => {
        timelineRef.current.scrollTop = 0
    }
    return (
        !isMobile ?
            <Flex
                border={error ? '2px solid red' : '2px solid #F0F0F1'}
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
                    <Flex
                        align={'center'}
                        justify={'space-between'}
                        
                        color={'black'}
                        fontWeight={'bold'}
                        fontSize={'12px'}
                        
                        w={'100%'}
                        mb={'24px'}
                    >
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

                                    bg={selectedDate.date() === i + 1 && selectedDate.month() == currentMonth ? 'blue.100' : 'transparent'}
                                    color={selectedDate.date() === i + 1 && selectedDate.month() == currentMonth ? 'white' : 'black'}

                                    onClick={() => {
                                        if (!(i + 1 < today.date() && today.month() == currentMonth)) {
                                            setSelectedDate(dayjs(dayjs(`${currentYear}-${currentMonth + 1}-${i + 1}`)))
                                        }
                                        dataManager.changeData('time', {})
                                        setSelected(-1)
                                        scrollTop()
                                    }}
                                > 
                                    <Box
                                        textAlign={'center'}
                                        fontSize={'11px'}
                                    >
                                        {i + 1}
                                    </Box>
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
                    </Flex>
                    <Box
                        w={'100%'}
                        h={'80%'}
                        overflow={'scroll'}
                        ref={timelineRef}
                    >
                        {
                            timeline.map((item, index) => (
                                <Flex
                                    key={index}
                                    border={'1px solid #BEE3F8'}
                                    borderRadius={'xl'}
                                        
                                    w={'100%'}
                                    h={'auto'}
                                    mb={'6px'}
                
                                    fontSize={'10px'}
                                >
                                    <Flex
                                        direction={'column'}
                                        align={'center'}
                                        justify={'center'}

                                        color={item.state == 'free' ? '#1366DE': 'black'}
                                        bg={item.state == 'free' ? '#BEE3F8' : 'gray.500'}
                                        borderLeftRadius={'xl'}
                
                                        w={'45px'}
                                        h={'7vh'}
                                        py={'3px'}

                                        style={{
                                            cursor: 'default'
                                        }}
                                    >
                                        <Text>{`${item.start_time.split(':')[0]}:${item.start_time.split(':')[1]}`}</Text>
                                        <Text>-</Text>
                                        <Text>{`${item.end_time.split(':')[0]}:${item.end_time.split(':')[1]}`}</Text>
                                    </Flex>
                                    <Flex
                                        align={'center'}

                                        p={'13px 15px'}
                                        h={'7vh'}
                                        w={'97%'}

                                        borderRightRadius={'xl'}

                                        bg={item.state == 'free' ? (selected == index ? '#E8F0FC' : 'white') : 'gray.300'}
                                        color={selected == index ? '#1366DE' : 'black'}

                                        onClick={() => {
                                            if (item.state == 'free') {
                                                dataManager.changeData('time', {
                                                    start_time: item.start_time,
                                                    end_time: item.end_time,
                                                })
                                                dataManager.setError('time', '')
                                                setSelected(index)
                                            }
                                        }}

                                        style={
                                            item.state == 'free' ?
                                                {
                                                    cursor: 'pointer'
                                                }
                                            :
                                                {
                                                    cursor: 'not-allowed'
                                                }
                                        }

                                        _hover={
                                            item.state == 'free' && selected != index ?
                                                {
                                                    opacity: '0.7',
                                                    backgroundColor: '#E8F0FC',
                                                    color: '#1366DE',
                                                }
                                            :   ''
                                        }
                                    >
                                        <Text fontWeight={'bold'}>{`${item.state.charAt(0).charAt(0).toUpperCase()}${item.state.slice(1)}`}</Text>
                                    </Flex>
                                </Flex>
                            ))
                        }
                    </Box>
                </Box>
            </Flex>
            :
            (
            <Stack
                border={error ? '2px solid red' : '2px solid #F0F0F1'}
                align={'center'}
                justify={'space-between'}    
                
                borderRadius={'xl'}

                w={width}
                h={height}
            >
                <Box
                    w={'100%'}
                    p={'20px 16px 0 16px'}

                    borderLeftRadius={'xl'}
                >
                    <Flex
                        align={'center'}
                        justify={'space-between'}
                        
                        color={'black'}
                        fontWeight={'bold'}
                        fontSize={'12px'}
                        
                        w={'100%'}
                        mb={'24px'}
                    >
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
                    <Grid
                        templateColumns='repeat(7, 1fr)'
                        gap={0}

                        textAlign={'center'}

                        w={'100%'}
                        h={'50%'}
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

                                    bg={selectedDate.date() === i + 1 && selectedDate.month() == currentMonth ? 'blue.100' : 'transparent'}
                                    color={selectedDate.date() === i + 1 && selectedDate.month() == currentMonth ? 'white' : 'black'}

                                    onClick={() => {
                                        if (!(i + 1 < today.date() && today.month() == currentMonth)) {
                                            setSelectedDate(dayjs(dayjs(`${currentYear}-${currentMonth + 1}-${i + 1}`)))
                                        }
                                        dataManager.changeData('time', {})
                                        setSelected(-1)
                                        scrollTop()
                                    }}
                                > 
                                    <Box
                                        textAlign={'center'}
                                        fontSize={'11px'}
                                    >
                                        {i + 1}
                                    </Box>
                                </Circle>
                            </Flex>
                        ))}

                        {range(6 - dateOfLast).map(i => (
                            <Box fontSize={'11px'} key={i} />
                        ))}
                    </Grid>
                </Box>
                <Box
                    w={'100%'}
                    h={'45%'}
                    mb={'16px'}

                    p={'20px 16px 0 16px'}

                    borderRightRadius={'xl'}
                >
                    <Flex
                        align={'flex-start'}
                        justify={'space-between'}
                    >
                        <Text color={'black'} fontWeight={'bold'} mb={'24px'}>Timeline</Text>
                    </Flex>
                    <Box
                        w={'100%'}
                        h={'80%'}
                        overflow={'scroll'}
                        ref={timelineRef}
                    >
                        {
                            timeline.map((item, index) => (
                                <Flex
                                    key={index}
                                    border={'1px solid #BEE3F8'}
                                    borderRadius={'xl'}
                                        
                                    w={'100%'}
                                    h={'auto'}
                                    mb={'6px'}
                
                                    fontSize={'10px'}
                                >
                                    <Flex
                                        direction={'column'}
                                        align={'center'}
                                        justify={'center'}

                                        color={item.state == 'free' ? '#1366DE': 'black'}
                                        bg={item.state == 'free' ? '#BEE3F8' : 'gray.500'}
                                        borderLeftRadius={'xl'}
                
                                        w={'45px'}
                                        h={'7vh'}
                                        py={'3px'}

                                        style={{
                                            cursor: 'default'
                                        }}
                                    >
                                        <Text>{`${item.start_time.split(':')[0]}:${item.start_time.split(':')[1]}`}</Text>
                                        <Text>-</Text>
                                        <Text>{`${item.end_time.split(':')[0]}:${item.end_time.split(':')[1]}`}</Text>
                                    </Flex>
                                    <Flex
                                        align={'center'}

                                        p={'13px 15px'}
                                        h={'7vh'}
                                        w={'97%'}

                                        borderRightRadius={'xl'}

                                        bg={item.state == 'free' ? (selected == index ? '#E8F0FC' : 'white') : 'gray.300'}
                                        color={selected == index ? '#1366DE' : 'black'}

                                        onClick={() => {
                                            if (item.state == 'free') {
                                                dataManager.changeData('time', {
                                                    start_time: item.start_time,
                                                    end_time: item.end_time,
                                                })
                                                dataManager.setError('time', '')
                                                setSelected(index)
                                            }
                                        }}

                                        style={
                                            item.state == 'free' ?
                                                {
                                                    cursor: 'pointer'
                                                }
                                            :
                                                {
                                                    cursor: 'not-allowed'
                                                }
                                        }

                                        _hover={
                                            item.state == 'free' && selected != index ?
                                                {
                                                    opacity: '0.7',
                                                    backgroundColor: '#E8F0FC',
                                                    color: '#1366DE',
                                                }
                                            :   ''
                                        }
                                    >
                                        <Text fontWeight={'bold'}>{`${item.state.charAt(0).charAt(0).toUpperCase()}${item.state.slice(1)}`}</Text>
                                    </Flex>
                                </Flex>
                            ))
                        }
                    </Box>
                </Box>
            </Stack>
            )

    )
}