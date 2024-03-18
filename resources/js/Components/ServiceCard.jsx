import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Image,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";

let cardContent

export default function ServiceCard({ data, viewManager, dataManager }) {
    const [selected, setSelected] = useState(false)    

    return (
        <Card position={'relative'} onMouseEnter={() => setSelected(true)} onMouseLeave={() => setSelected(false)}>
            <CardBody>
                <Image
                    bg={'blue.100'}
                    borderRadius={'xl'}
                    src={data.image}
                />

                <Stack mt={'20px'} spacing={1}>
                    <Box color={'#1366DE'} fontWeight={'bold'} fontSize={'13px'}>{data.name}</Box>
                    <Box color={'gray.500'} fontSize={'12px'}>Consultation starting at</Box>
                    <Box fontWeight={'bold'} fontSize={'14px'}>{data.price}VND</Box>
                </Stack>
            </CardBody>

            {selected ? 
                <Flex
                    justify={'center'}
                    align={'center'}
                    
                    position={'absolute'}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}

                    borderRadius={'xl'}

                    bg={'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(255,255,255,0.7591841668307948) 88%)'}
                >
                    <Box>
                        <Button
                            size={'md'}
                            colorScheme={'blue'}
                            onClick={() => {
                                viewManager.changeView('Doctor')
                                dataManager.changeData('service', data.id)
                            }}
                        >
                            Book Appointment
                        </Button>
                    </Box>
                </Flex>
            :
                ''}
        </Card>

    )
}