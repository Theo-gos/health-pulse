import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Circle,
    Flex,
    Image,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ClinicCard({ name, location, time, nextAvailableTime }) {
    const [selected, setSelected] = useState(false);

    return (
        <Card w={'29%'} h={'430px'} pb={'8px'} borderRadius={'20px'} onMouseEnter={() => setSelected(true)} onMouseLeave={() => setSelected(false)}>
            <CardBody>
                <Image
                    h={selected ? '80%' : '110%'}
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                {selected ? 
                    <Stack gap={1}>
                        <Box w={'100%'} fontSize={'18px'} color={'#1366DE'}>{name}</Box>
                        <Box w={'100%'} fontSize={'14px'} color={'gray.500'}>{location}</Box>
                        <Box fontSize={'14px'}>{time}</Box>
                        <Box fontSize={'12px'}>Next available time, Today at {nextAvailableTime}</Box>
                    </Stack>
                : ''}
            </CardBody>
            <CardFooter>
                {selected ? 
                    <Button
                        mt={'25px'}
                        h={'20px'}
                        w={'60%'}
                        p={'12px'}

                        borderRadius={'30px'}

                        fontSize={'12px'}

                        colorScheme={'blue'}
                    >
                        Book Appointment
                    </Button>
                    :
                    <Flex
                        w={'100%'}
                        h={'25%'}
                        px={'10px'}

                        justify={'space-between'}
                    >
                        <Box w={'50%'}>
                            <Box w={'100%'} fontSize={'18px'} color={'#1366DE'}>{name}</Box>
                            <Box w={'100%'} fontSize={'12px'} color={'gray.500'}>{`${location.split(', ')[3]}, ${location.split(', ')[4]}`}</Box>
                        </Box>
                        <Circle
                            boxShadow={''}
                            bg={'white'}

                            style={{
                                boxShadow: '1px 1px 7px 1px gray'
                            }}

                            size={'30px'}

                            color={'#1366DE'}
                        >
                            <ChevronRightIcon />
                        </Circle>
                    </Flex>
                }
            </CardFooter>
        </Card>
    )
}