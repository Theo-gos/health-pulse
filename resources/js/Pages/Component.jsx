import {
    Container,
    Flex,
} from "@chakra-ui/react"
import DashboardSidebar from "@/Components/DashboardSidebar"
import DashboardSchedule from "@/Components/DashboardSchedule"


export default function Component() {

    return (
        <Flex
            bg={'#F6F7FA'}
            justify={'center'}
            align={'center'}

            h={'100vh'}
            w={'100vw'}
        >
            <DashboardSchedule />
        </Flex>
    )
}