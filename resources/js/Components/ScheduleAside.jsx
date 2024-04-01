import {
    Box,
    CircularProgress,
    Flex,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from  "dayjs/plugin/weekday";
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useForm } from "@inertiajs/react";

dayjs.extend(weekOfYear)
dayjs.extend(weekday)

const today = dayjs()
const gridItems = []
let time = 8
let keyIndex = 1

for (let i = 0; i <= 45; i++) { 
    const item = i % 3 === 0 ? <GridItem fontSize={'11px'} rowSpan={1} key={i}>{`${time++}:00`}</GridItem> : <GridItem rowSpan={1} key={i}></GridItem>
    gridItems.push(item)
}

const rowSpanExchange = (number) => {
    let result = 0
    if (number > 10 && number <= 20)
        result = 1  
    if (number > 20 && number <= 40)
        result = 2
    else if (number > 40)
        result = 3
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

    return hours * 3 + rowSpanExchange(minutes)
}

const renderItem = (data, id, handleClick, initialTime = '8:00') => {
    let anchor = initialTime

    return data.map((item, index) => {
        const ret = []
        const emptySpan = getSpan(anchor, item.start_time)
        const duration = getSpan(item.start_time, item.end_time)
        const startTime = item.start_time.split(':')
        const endTime = item.end_time.split(':')

        anchor = item.end_time

        if (emptySpan)
            ret.push(<GridItem key={`empty-${index}`} rowSpan={emptySpan} />)
        
        ret.push(
            <GridItem
                key={index}
                
                _hover={{
                    backgroundColor: '#BEE3F8',
                    cursor: 'pointer',
                }}

                borderRadius={'md'}
                border={'1px solid #1366DE'}
                
                bg={id === item.id ? 'blue.100' : 'white'}

                onClick={() => handleClick(item.id)}

                p={'4px 4px'}

                overflow={'scroll'}
                
                rowSpan={duration}
            >
                {duration <= 2 ?
                    <Flex justify={'space-between'}>
                        <Box
                            color={'black'}
                            fontWeight={'bold'}
                        >
                            {item.task}
                        </Box>
                        <Box>{item.location.split(',')[0]}</Box>
                    </Flex>
                    :
                    <Box
                        h={'100%'}

                        p={'4px 4px'}
                    >
                        <Box color={'black'} fontWeight={'bold'} fontSize={'13px'}>{item.task}</Box>
                        <Box>{item.location}</Box>
                    </Box>
                }
            </GridItem>
        )

        if (endTime[1] >= 40) {
            anchor = `${Number(endTime[0]) + 1}:00:00`
            ret.push(<GridItem key={`empty-${index}-ex`} rowSpan={1} />)
        }

        return ret
    })
}

const getDayName = (dateStr, locale) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

export default function ScheduleAside({ idManager, asideData }) {
    const [data, setData] = useState({})

    const {get, processing} = useForm()

    const { changeId, id } = idManager
    
    const handleClick = (selectedId) => {
        changeId(selectedId)
        get(route('schedule.edit', selectedId), {
            preserveState: true,
        })
    }

    useEffect(() => {
        if (asideData) {
            setData(asideData)
        }
    }, [asideData])

    console.log(data);

    return (
        <Box
            border={'2px solid #F0F0F1'}
            
            borderRadius={'xl'}
            bg={'white'}

            w={'100%'}
            h={'100%'}
            fontSize={'12px'}
            
            pl={'4px'}
        >
            <Flex
                align={'center'}
                justify={'space-between'}

                w={'100%'}
                h={'5%'}
                p={'16px'}

            >
                <Box fontWeight={'bold'} fontSize={'14px'}>Your Schedule</Box>
                <Box fontSize={'13px'}>{today.format('MMMM DD, YYYY')}</Box>
            </Flex>

            <Flex
                borderRadius={'xl'}

                w={'100%'}
                h={'95%'}
                pt={'8px'}
                px={'4px'}

                overflow={'scroll'}
            >
                <Grid templateRows='repeat(45, 1fr)' w={'2%'} height={'1225px'} mt={'4.9vh'} pr={'40px'}>
                    {gridItems}
                </Grid>

                <Box
                    w={'98%'}
                >
                    <Grid templateColumns={'repeat(3, 1fr)'} gap={0} w={'100%'} h={'4%'} textAlign={'center'}>
                        <GridItem
                            borderTopRadius={'md'}
                            
                            w={'100%'}
                            
                            bg={'#F2F7FF'}
                            textAlign={'center'}
                            
                            color={'#1366DE'}
                        >
                            <Box
                                w={'100%'}
                                h={'50%'}
                            >
                                {today.date()}
                            </Box>

                            <Box
                                w={'100%'}
                                h={'50%'}
                            >
                                {getDayName(today.toISOString())}
                            </Box>
                        </GridItem>
                        <GridItem
                            borderTopRadius={'md'}
                            
                            w={'100%'}
                        >
                            <Box
                                w={'100%'}
                                h={'50%'}
                            >
                                {today.add(1, 'day').date()}
                            </Box>

                            <Box
                                w={'100%'}
                                h={'50%'}
                            >
                                {getDayName(today.add(1, 'day').toISOString())}
                            </Box>
                        </GridItem>
                        <GridItem
                            borderTopRadius={'md'}

                            w={'100%'}
                        >
                            <Box
                                w={'100%'}
                                h={'50%'}
                            >
                                {today.add(2, 'day').date()}
                            </Box>

                            <Box
                                w={'100%'}
                                h={'50%'}
                            >
                                {getDayName(today.add(2, 'day').toISOString())}
                            </Box>
                        </GridItem>
                    </Grid>
                    <Flex
                        w={'100%'}
                        h={'1225px'}

                        mt={'1.5vh'}
                    >
                        {!processing && data ?
                            <>
                                <Grid
                                    templateRows={'repeat(45, 1fr)'}
                                    gap={0.5}
                                    
                                    borderBottomRadius={'md'}
                                    
                                    bg={'#F2F7FF'} 

                                    w={'33.33%'}
                                    h={'100%'}
                                    pl={'1px'}
                                >
                                    {data[today.format('YYYY-MM-DD')] ? renderItem(data[today.format('YYYY-MM-DD')], id, handleClick) : ''}
                                </Grid>

                                <Grid
                                    templateRows={'repeat(45, 1fr)'}
                                    gap={0.5}

                                    borderBottomRadius={'md'}

                                    w={'33.33%'}
                                    h={'100%'}
                                    pl={'1px'}
                                >
                                    {data[today.add(1, 'day').format('YYYY-MM-DD')] ? renderItem(data[today.add(1, 'day').format('YYYY-MM-DD')], id, handleClick) : ''}
                                </Grid>

                                <Grid
                                    templateRows={'repeat(45, 1fr)'}
                                    gap={0.5}

                                    borderBottomRadius={'md'}

                                    w={'33.33%'}
                                    h={'100%'}
                                    pl={'1px'}
                                >
                                    {data[today.add(2, 'day').format('YYYY-MM-DD')] ? renderItem(data[today.add(2, 'day').format('YYYY-MM-DD')], id, handleClick) : ''}
                                </Grid>
                            </>
                            :
                            (!data ? '' : <CircularProgress mx={'auto'} mt={'45vh'} isIndeterminate color='blue.300' />)
                        }
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}