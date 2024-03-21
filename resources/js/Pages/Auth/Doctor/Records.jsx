import DashboardSidebar from "@/Components/DashboardSidebar";
import {
    Box,
    Flex,

} from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";

export default function Records() {
    const { auth, message, flash } = usePage().props

    return (
        <Box
            w={'100vw'}
            h={'100vh'}
        >
            <Flex
                w={'100%'}
                h={'100vh'}
            >
                <DashboardSidebar state={'records'} user={auth.user}/>
                <Box
                    w={'55%'}
                    h={'100%'}

                    bg={'green.100'}
                >
                    <Box
                        w={'100%'}
                        h={'5%'}

                        bg={'orange.100'}
                    >
                        Header
                    </Box>

                    <Box
                        w={'100%'}
                        h={'94.5%'}
                        p={'4px 8px'}
                        
                        bg={'red.100'}

                        overflowY={'scroll'}
                    >
                        <Box
                            w={'100%'}
                            b

                            bg={'gray.100'}
                        >
                            List
                        </Box>
                    </Box>
                </Box>

                <Box
                    w={'32%'}
                    h={'100%'}

                    bg={'blue.100'}
                >

                </Box>
            </Flex>
        </Box>
    )
}