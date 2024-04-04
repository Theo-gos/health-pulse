import {
    Box,
    Flex,
    Stack,
    Text,
    Icon,
} from "@chakra-ui/react";

import {
    Area,
    AreaChart,
    CartesianAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
        <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
        />
    </Icon>
)

export default function DashboardAreaChart({data}) {
    return (
        <>
            <ResponsiveContainer width={'100%'} height="80%">
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#105EDB" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#105EDB" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F3AA5C" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#F3AA5C" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis fontSize={'12px'} dataKey="age" />
                    <CartesianGrid stroke="#f5f5f5"  />
                    <Tooltip />
                    <Area type="monotone" dataKey="male" stroke="#105EDB" fillOpacity={1} fill="url(#colorMale)" />
                    <Area type="monotone" dataKey="female" stroke="#F3AA5C" fillOpacity={1} fill="url(#colorFemale)" />
                </AreaChart>
            </ResponsiveContainer>                
            <Stack pl={'12px'} direction={'row'} spacing='12px'>
                <Flex align={'center'} justify={'space-between'}>
                    <CircleIcon color={'#105EDB'} boxSize={4} />
                    <Text fontSize={'13px'} ml={'3px'}>Male</Text>
                </Flex>
                <Flex align={'center'} justify={'space-between'}>
                    <CircleIcon color={'#F3AA5C'} boxSize={4} />
                    <Text fontSize={'13px'} ml={'3px'}>Female</Text>
                </Flex>
            </Stack>
        </>
    )
}