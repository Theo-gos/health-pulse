import {
    Box,
    Flex,
    HStack,
    SimpleGrid,
    Stack,
} from "@chakra-ui/layout"

export default function PatientMedicalRecord() {
    return (
        <Box
            w={'100%'}
            h={'100%'}
            p={'16px'}

            borderRadius={'xl'}
            
            bg={'#F6F7FA'}
        >
            <Box
                mb={'24px'}
            >
                <Box
                    fontSize={'36px'}
                    fontWeight={'bold'}
                >
                    Medical Record
                </Box>
                <Flex
                    align={'center'}
                    justify={'flex-start'}

                    textAlign={'center'}
                    fontSize={'14px'}

                    mt={'16px'}
                >
                    <Box
                        p={'2px 6px'}

                        borderBottom={'1px solid #1366DE'}
                        color={'#1366DE'}
                    >
                        General
                    </Box>

                    <Box
                        p={'2px 6px'}

                        borderBottom={'1px solid gray'}
                        color={'gray'}
                    >
                        Prescriptions
                    </Box>
                </Flex>
            </Box>

            <Box
                w={'100%'}

                h={'82%'}
                overflowY={'scroll'}
            >
                <Stack spacing={6}>
                    <Box
                        w={'100%'}
                    >
                        <Box fontWeight={'bold'} ml={'6px'}>Allergies</Box>
                        <SimpleGrid
                            mt={'16px'}

                            columns={3} spacing='16px'
                        >
                            <Box
                                h={'10vh'}
                                p={'12px'}

                                fontSize={'12px'}

                                bg={'white'}
                                
                                border={'1px solid #EEEFF1'}
                                borderRadius={'xl'}
                            >
                                <Box color={'gray.500'}>Drug</Box>
                                <Box fontWeight={'bold'}>No known allergies</Box>
                            </Box>

                            <Box
                                h={'10vh'}
                                p={'12px'}

                                fontSize={'12px'}

                                bg={'white'}
                                
                                border={'1px solid #EEEFF1'}
                                borderRadius={'xl'}
                            >
                                <Box color={'gray.500'}>Food</Box>
                                <Box fontWeight={'bold'}>No known allergies</Box>
                            </Box>

                            <Box
                                h={'10vh'}
                                p={'12px'}

                                fontSize={'12px'}

                                bg={'white'}
                                
                                border={'1px solid #EEEFF1'}
                                borderRadius={'xl'}
                            >
                                <Box color={'gray.500'}>Environmental</Box>
                                <Box fontWeight={'bold'}>No known allergies</Box>
                            </Box>
                        </SimpleGrid>
                    </Box>

                    <Box
                        w={'100%'}
                        h={'28vh'}
                    >
                        <Box fontWeight={'bold'} ml={'6px'}>Diagnoses</Box>
                        <SimpleGrid
                            mt={'16px'}
                            h={'87%'}

                            overflowY={'scroll'}
                            columns={2} spacing='4px'
                        >
                            <Box
                                h={'11vh'}
                                p={'12px'}

                                fontSize={'12px'}

                                bg={'white'}
                                
                                border={'1px solid #EEEFF1'}
                                borderRadius={'xl'}
                            >
                                <Flex
                                    align={'center'}
                                    justify={'space-between'}
                                    p={'2px 6px'}
                                    mb={'4px'}

                                    fontSize={'11px'}
                                >
                                    <Box bg={'#1366DE'} p={'2px 6px'} borderRadius={'md'} color={'white'}>I70.231</Box>
                                    <Box fontSize={'13px'}>14.07.2016</Box>
                                </Flex>
                                <Box p={'8px'} fontWeight={'bold'}>Some description</Box>
                            </Box>
                        </SimpleGrid>
                    </Box>

                    <Box
                        w={'100%'}
                        mt={'12px'}
                    >
                        <Box fontWeight={'bold'} ml={'6px'}>Medications</Box>
                        <Box
                            w={'100%'}

                            overflowX={'scroll'}
                        >
                            <HStack
                                w={'fit-content'}
                                mt={'16px'}

                                overflowX={'scroll'}
                                spacing='4px'
                            >
                                <Box
                                    h={'10vh'}
                                    w={'180px'}
                                    p={'12px 18px'}

                                    fontSize={'12px'}

                                    bg={'white'}
                                    
                                    border={'1px solid #EEEFF1'}
                                    borderRadius={'xl'}
                                >
                                    <Box fontWeight={'bold'}>Medication</Box>
                                    <Box mt={'10px'} color={'gray.500'}>Dosage</Box>
                                </Box>
                            </HStack>
                        </Box>
                    </Box>

                    <Box
                        mt={'24px'}
                        w={'100%'}
                    >
                        <Box fontWeight={'bold'} ml={'6px'}>Visits history</Box>
                        <Box
                            w={'100%'}
                            h={'30vh'}
                            p={'4px'}
                        >
                            <Flex
                                align={'center'}

                                fontSize={'13px'}
                                color={'gray'}
                            >
                                <Box
                                    w={'25%'}
                                    p={'8px'}
                                >
                                    Date
                                </Box>  

                                <Box
                                    w={'25%'}
                                    p={'8px'}
                                >
                                    Doctor
                                </Box>  

                                <Box
                                    w={'31.7%'}
                                    p={'8px'}
                                >
                                    Specialty
                                </Box>  

                                <Box
                                    w={'fit-content'}
                                    p={'8px'}
                                >
                                    Note
                                </Box>  
                            </Flex>
                            
                            <Box
                                w={'100%'}
                                h={'90%'}
                                overflowY={'scroll'}
                            >
                                <Stack spacing={3}>
                                    <Flex
                                        w={'100%'}
                                        align={'center'}

                                        fontSize={'12px'}
                                        color={'black'}
                                        fontWeight={'bold'}
                                    >
                                        <Box
                                            w={'25%'}
                                            p={'8px'}
                                            borderBottom={'1px solid #D1D1D3'}
                                        >
                                            2024-03-21
                                        </Box>  

                                        <Box
                                            w={'25%'}
                                            p={'8px'}
                                            borderBottom={'1px solid #D1D1D3'}
                                        >
                                            Heisenberg
                                        </Box>  

                                        <Box
                                            w={'25%'}
                                            p={'8px'}
                                            borderBottom={'1px solid #D1D1D3'}
                                        >
                                            Chemistry
                                        </Box>  

                                        <Box
                                            w={'150px'}
                                            p={'8px'}
                                            borderBottom={'1px solid #D1D1D3'}
                                            textAlign={'center'}
                                            color={'#1366DE'}
                                        >
                                            Link
                                        </Box>  
                                    </Flex>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}