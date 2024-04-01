import {
    Box,
    Flex,
    Grid,
    GridItem,
    Text,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import { MdOutlineArrowOutward } from "react-icons/md";

const today = dayjs()

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

const renderItem = (data, handleClick, initialTime = '8:00') => {
    let anchor = initialTime

    return data.map((item, index) => {
        const ret = []
        const emptySpan = getSpan(anchor, item.start_time)
        const duration = getSpan(item.start_time, item.end_time)
        const startTime = item.start_time.split(':')
        const endTime = item.end_time.split(':')

        const name = item.patient.name.split(' ')

        anchor = item.end_time

        if (emptySpan)
            ret.push(<GridItem key={`empty-${index}`} rowSpan={emptySpan} />)
        
        ret.push(
            <GridItem
                key={index}
                
                borderRadius={'md'}
                
                bg={duration > 1 ? 'purple.100' : 'orange.100'}

                p={'4px 4px'}

                rowSpan={duration}
            >
                {duration === 1 ?
                    <Flex justify={'space-between'}>
                        <Box
                            color={'black'}
                            fontWeight={'bold'}
                        >
                            {`${name[0].charAt(0).toUpperCase()}. ${name[1]}`}
                        </Box>
                        <Box>{`${startTime[0]}:${startTime[1]}`}</Box>
                    </Flex>
                    :
                    <Flex
                        direction={'column'}

                        h={'100%'}

                        p={'4px 4px'}

                        justify={'space-between'}
                    >
                        <Flex
                            w={'100%'}

                            justify={'space-between'}
                            align={'center'}
                        >
                            <Box color={'black'} fontWeight={'bold'} fontSize={'13px'}>{item.patient.name}</Box>
                            <MdOutlineArrowOutward style={{cursor: 'pointer'}} title="Go to appointment note" onClick={() => handleClick(item.id)} />
                        </Flex>
                        <Box>{`${startTime[0]}:${startTime[1]} > ${endTime[0]}:${endTime[1]}`}</Box>
                    </Flex>
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

export default function AppointmentContent({ data, date }) {
    const { get } = useForm()

    const handleClick = (appointment_id) => {
        get(route('appointment.note', {appointment: appointment_id}, {
            forceFormData: true,
        }))
    }

    return (
        <>
            <Grid
                templateRows={'repeat(45, 1fr)'}
                gap={0.5}
                
                borderBottomRadius={'md'}
                
                bg={today.date() === date.date() ? '#F2F7FF' : 'transparent'} 

                w={'14.26%'}
                h={'100%'}
                pl={'1px'}
            >
                {data.Monday ? renderItem(data.Monday, handleClick) : ''}
            </Grid>

            <Grid
                templateRows={'repeat(45, 1fr)'}
                gap={0.5}
                
                bg={today.date() === date.add(1, 'day').date() ? '#F2F7FF' : 'transparent'}

                w={'14.26%'}
                h={'100%'}
                pl={'1px'}
            >
                {data.Tuesday ? renderItem(data.Tuesday, handleClick) : ''}
            </Grid>

            <Grid
                templateRows={'repeat(45, 1fr)'}
                gap={0.5}

                borderBottomRadius={'md'}
                
                bg={today.date() === date.add(2, 'day').date() ? '#F2F7FF' : 'transparent'}

                w={'14.26%'}
                h={'100%'}
                pl={'1px'}
            >
                {data.Wednesday ? renderItem(data.Wednesday, handleClick) : ''}
            </Grid>

            <Grid
                templateRows={'repeat(45, 1fr)'}
                gap={0.5}

                borderBottomRadius={'md'}
                
                bg={today.date() === date.add(3, 'day').date() ? '#F2F7FF' : 'transparent'}

                w={'14.26%'}
                h={'100%'}
                pl={'1px'}
            >
                {data.Thursday ? renderItem(data.Thursday, handleClick) : ''}
            </Grid>

            <Grid
                templateRows={'repeat(45, 1fr)'}
                gap={0.5}

                borderBottomRadius={'md'}
                
                bg={today.date() === date.add(4, 'day').date() ? '#F2F7FF' : 'transparent'}

                w={'14.26%'}
                h={'100%'}
                pl={'1px'}
            >
                {data.Friday ? renderItem(data.Friday, handleClick) : ''}
            </Grid>

            <Grid
                templateRows={'repeat(45, 1fr)'}
                gap={0.5}

                borderBottomRadius={'md'}
                
                bg={today.date() === date.add(5, 'day').date() ? '#F2F7FF' : 'transparent'}

                w={'14.26%'}
                h={'100%'}
                pl={'1px'}
            >
                {data.Saturday ? renderItem(data.Saturday, handleClick) : ''}
            </Grid>

            <Grid
                templateRows={'repeat(45, 1fr)'}
                gap={0.5}

                borderBottomRadius={'md'}
                
                bg={today.date() === date.add(6, 'day').date() ? '#F2F7FF' : 'transparent'}

                w={'14.26%'}
                h={'100%'}
                pl={'1px'}
            >
                {data.Sunday ? renderItem(data.Sunday, handleClick) : ''}
            </Grid>
        </>
    )
}