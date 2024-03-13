import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Text,
    calc,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsCalendar2Event } from "react-icons/bs";
import Timeline from "./Timeline";
import { Link } from "@inertiajs/react";

// Using the duration (time_end - time_start) to calculate the rowspan
// Using the interval between 2 appointments (time_start - time_end) to calculate the rowspan
export default function DashboardAppointments() {
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
                        <ChevronLeftIcon />
                        <Text>Date</Text>
                        <ChevronRightIcon />
                    </Flex>

                    <Flex
                        w={'100%'}
                        h={'86%'}

                        px={'8px'}
                        mb={'8px'}

                        overflow={'scroll'}
                    >
                        <Timeline pt={'8px'} />

                        <Grid
                            templateRows={'repeat(60, 1fr)'}
                            gap={1}

                            ml={'4px'}
                            mt={'10px'}

                            w={'95%'}
                            h={'932px'}
                        >
                            <GridItem
                                w='100%'
                                rowSpan='4'
                            >
                                <Flex
                                    border={'1px solid black'}
                                    borderRadius={'md'}

                                    justify={'space-between'}
                                    align={'center'}

                                    p={'8px'}

                                    w={'100%'}
                                    h={'100%'}
                                >
                                    <Box flexGrow={'1'}>
                                        <Text fontSize={'12px'} fontWeight={'bold'} color={'black'}>Amanda Smith</Text>
                                        <Text fontSize={'10px'}>8:00 - 9:00</Text>
                                    </Box>

                                    <Box borderRadius={'lg'} color={'#279111'} bg={'#9EE28D'} fontSize={'11px'} p={'4px'}>
                                        Ongoing
                                    </Box>
                                </Flex>
                            </GridItem>

                            <GridItem
                                w='100%'
                                rowSpan='4'
                            >
                                <Flex
                                    border={'1px solid black'}
                                    borderRadius={'md'}

                                    justify={'space-between'}
                                    align={'center'}

                                    p={'8px'}

                                    w={'100%'}
                                    h={'100%'}
                                >
                                    <Box flexGrow={'1'}>
                                        <Text fontSize={'12px'} fontWeight={'bold'} color={'black'}>Amanda Smith</Text>
                                        <Text fontSize={'10px'}>9:00 - 10:00</Text>
                                    </Box>
                                </Flex>
                            </GridItem>
                        </Grid>
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
                        <Flex
                            justify={'space-between'}
                            align={'center'}
                        >
                            <Text color={'black'} fontWeight={'bold'}>Amanda Smith</Text>
                            <Text>8:00 - 9:00</Text>
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
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}