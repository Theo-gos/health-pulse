import {
    Box,
    Flex,
    Stack,
    Text,
    Icon,
    HStack,
} from "@chakra-ui/react";
import DashboardPiechart from "./DashboardPiechart";
import DashboardAreaChart from "./DashboardAreachart";
import { BsDropletFill, BsFillHospitalFill, BsFillShieldFill, BsFileEarmarkPlusFill } from "react-icons/bs";

export default function DashboardAside({ pieChartData, areaChartData, commonIllnessStatistic }) {
    console.log(commonIllnessStatistic);
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
                    <DashboardAreaChart data={areaChartData} />
                </Box>
            </Box>

            <Box
                w={'100%'}
                h={'37%'}

                p={'16px 8px'}
            >
                <Box color={'black'}>Patients by condition</Box>
                <DashboardPiechart data={pieChartData} />
            </Box>

            <Box
                w={'100%'}
                h={'18%'}

                p={'8px'}
            >
                <Box mb={'8px'} color={'black'}>Common Illness</Box>
                <HStack
                    spacing={3}

                    fontSize={'12px'}

                >
                    {commonIllnessStatistic.map((illness) => {
                        return (
                            <Box
                                key={illness.icd_code}
                                border={'1px solid #FFF4EB'}
                                borderRadius={'lg'}
        
                                p={'8px'}
                                w={'22%'}
                            >
                                <Text mb={'30px'} title={illness.icd_name} textAlign={'center'} fontSize={'10px'} overflowX={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'}>{illness.icd_name}</Text>
                                <Flex justify={'space-between'} align={'center'}>
                                    <Box bg={illness.color} p={'2px 6px'} fontSize={'10px'} borderRadius={'md'} color={'white'}>{illness.icd_code}</Box>
                                    <Box>
                                        {illness.count}
                                    </Box>
                                </Flex>
                            </Box>
                        )
                    })}
                </HStack>
            </Box>
        </Flex>
    )
}