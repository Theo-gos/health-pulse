import {
    Box,
    Flex,
    Stack,
    Text,
    Icon,
} from "@chakra-ui/react";
import DashboardPiechart from "./DashboardPiechart";
import DashboardAreaChart from "./DashboardAreachart";
import { BsDropletFill, BsFillHospitalFill, BsFillShieldFill, BsFileEarmarkPlusFill } from "react-icons/bs";

export default function DashboardAside() {
    return (
        <Flex
            borderRadius={'xl'}

            direction={'column'}
            
            bg={'white'}
            
            w={'100%'}
            h={'99vh'}
        >
            <Box
                w={'100%'}
                h={'45%'}

                p={'16px 8px'}
            >
                <Box color={'black'}>Patients by age</Box>
                <Box
                    w={'100%'}
                    h={'95%'}
                >
                    <DashboardAreaChart />
                </Box>
            </Box>

            <Box
                w={'100%'}
                h={'37%'}

                p={'16px 8px'}
            >
                <Box color={'black'}>Patients by condition</Box>
                <DashboardPiechart />
            </Box>

            <Box
                w={'100%'}
                h={'18%'}

                p={'8px'}
            >
                <Box mb={'8px'} color={'black'}>Patients by treatment</Box>
                <Flex
                    justify={'space-around'}

                    fontSize={'12px'}

                >
                    <Box
                        border={'1px solid #FFF4EB'}
                        borderRadius={'lg'}

                        p={'8px'}
                        // h={'px'}
                        w={'22%'}
                    >
                        <Text mb={'30px'} textAlign={'center'}>Rehabilitation</Text>
                        <Flex justify={'space-between'} align={'center'}>
                            <Box borderRadius={'3px'} color={'blue'} bg={'blue.200'} p={'2px 2px 2px 0'} pl={'2.5px'}>
                                <BsFillShieldFill />
                            </Box>
                            <Box>
                                Value
                            </Box>
                        </Flex>
                    </Box>
                    <Box
                        border={'1px solid #FFF4EB'}
                        borderRadius={'lg'}

                        p={'8px'}
                        h={'50%'}
                        w={'22%'}
                    >
                        <Text mb={'30px'} textAlign={'center'}>Surgery</Text>
                        <Flex justify={'space-between'} align={'center'}>
                            <Box borderRadius={'3px'} color={'#ED983C'} bg={'#FFF4EB'} p={'2px 2px 2px 0'} pl={'2.5px'}>
                                <BsDropletFill />
                            </Box>
                            <Box>
                                Value
                            </Box>
                        </Flex>
                    </Box>
                    <Box
                        border={'1px solid #FFF4EB'}
                        borderRadius={'lg'}

                        p={'8px'}
                        h={'50%'}
                        w={'22%'}
                    >
                        <Text mb={'30px'} fontSize={'11px'} textAlign={'center'}>Hospitalization</Text>
                        <Flex justify={'space-between'} align={'center'}>
                            <Box borderRadius={'3px'} color={'#9D54E6'} bg={'#F3EEFE'} p={'2px 2px 2px 0'} pl={'2.5px'}>
                                <BsFillHospitalFill />
                            </Box>
                            <Box>
                                Value
                            </Box>
                        </Flex>
                    </Box>
                    <Box
                        border={'1px solid #FFF4EB'}
                        borderRadius={'lg'}

                        p={'8px'}
                        h={'50%'}
                        w={'22%'}
                    >
                        <Text mb={'30px'} textAlign={'center'}>Lab tests</Text>
                        <Flex justify={'space-between'} align={'center'}>
                            <Box borderRadius={'3px'} color={'#4EA44B'} bg={'#E4F8E3'} p={'2px 2px 2px 0'} pl={'2.5px'}>
                                <BsFileEarmarkPlusFill />
                            </Box>
                            <Box>
                                Value
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}