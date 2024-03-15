import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import {
    Box,
    Circle,
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

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const today = dayjs()

let currentYear
let currentMonth
let daysInCurrentMonth
let dayObjOfFirst
let dateOfFirst
let dayObjOfLast
let dateOfLast

export default function DashboardSchedule() {
    const [dayObj, setDayObj] = useState(dayjs())
    const [selected, setSelected] = useState(today)
    const [data, setData] = useState({})

    useMemo(() => {
        currentYear = dayObj.year()
        currentMonth = dayObj.month() 
        daysInCurrentMonth = dayObj.daysInMonth()
    
        dayObjOfFirst = dayjs(`${currentYear}-${currentMonth + 1}-1`)
        dateOfFirst = dayObjOfFirst.day()
    
        dayObjOfLast = dayjs(`${currentYear}-${currentMonth + 1}-${daysInCurrentMonth}`)
        dateOfLast = dayObjOfLast.day()
    }, [dayObj])

    // useEffect(() => {
    //     const firstDayOfMonth = dayObjOfFirst.format('YYYY-MM-DD')
    //     const lastDayOfMonth = dayObjOfLast.format('YYYY-MM-DD')

    //     fetch(`http://localhost:8000/schedule/${firstDayOfMonth}/${lastDayOfMonth}`)
    //     .then(res => {
    //         return res.json()
    //     })
    //     .then(items => {
    //         setData(items)
    //     })


    //     console.log('First Day: ', dayObjOfFirst.format('YYYY-MM-DD'), 'Last Day: ', dayObjOfLast.format('YYYY-MM-DD'))
    // }, [dayObj])

    const CircleIcon = (props) => (
        <Icon viewBox='0 0 200 200' {...props}>
            <path
            fill='currentColor'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
            />
        </Icon>
    )

    const handlePrev = () => { 
        setDayObj(dayObj.subtract(1, 'month'))
    }

    const handleNext = () => { 
        setDayObj(dayObj.add(1, 'month'))
    }

    console.log(selected.format('YYYY-MM-DD'))
    return (
        <Flex
            border={'2px solid #F0F0F1'}
            align={'center'}
            justify={'space-between'}
            
            borderRadius={'xl'}
            bg={'white'}

            w={'55vw'}
            h={'40vh'}
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
                                    <CircleIcon color={'blue.600'} boxSize={2} />
                                </Flex>
                            </Circle>
                        </Flex>
                    ))}

                    {range(6 - dateOfLast).map(i => (
                        <Box fontSize={'11px'} key={i} />
                    ))}
                </Grid>

                <Stack pl={'8px'} direction={'row'} spacing='12px'>
                    <Flex align={'center'} justify={'space-between'}>
                        <CircleIcon color={'blue.600'} boxSize={2} />
                        <Text fontSize={'11px'} ml={'3px'}>Work day</Text>
                    </Flex>
                    <Flex align={'center'} justify={'space-between'}>
                        <CircleIcon color={'green.600'} boxSize={2} />
                        <Text fontSize={'11px'} ml={'3px'}>Holiday</Text>
                    </Flex>
                </Stack>
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
                        <ChevronRightIcon />
                    </Square>
                </Flex>
                <Box
                    w={'100%'}
                    h={'80%'}
                    overflow={'scroll'}
                >
                    <Flex
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
                            <Text>7:00</Text>
                            <Text>-</Text>
                            <Text>8:00</Text>
                        </Flex>
                        <Box
                            overflow={'hidden'}
                            p={'13px 15px'}
                            w={'97%'}
                        >
                            <Text color={'black'} fontWeight={'bold'}>Consultation</Text>
                            <Box fontSize={'9px'} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>West Office, floor 2, room C206</Box>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}