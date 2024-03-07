import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    Sector,
    Tooltip,
} from "recharts";

const data = [
    { name: 'Stable', value: 25, color: '#1366DE' },
    { name: 'Fair', value: 15, color: '#6BB467' },
    { name: 'Serious', value: 2, color: '#F09E45'},
    { name: 'Critical', value: 3, color: '#DE5031'},
];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, name } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'
  
    return (
        <>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'black'}>
                {data.reduce((prev, cur) => (
                    prev + cur.value
                ), 0)}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
      </>
    )
  }
  

export default function DashboardPiechart() {
    const [activeIndex, setActiveIndex] = useState(0)
  
    const onPieEnter = (_, index) => {
        setActiveIndex(index)
    }
  
    return (
        <PieChart width={450} height={200}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="35%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                startAngle={450}
                endAngle={90}
                dataKey="value"
                onMouseEnter={onPieEnter}
            > 
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))
                }
            </Pie>
            <Tooltip></Tooltip>
            <Legend
                iconType='circle'
                layout='vertical'
                verticalAlign='middle'
                align="right"
                width={230}
                height={100}
                chartWidth={200}
                
                payload={
                    data.map((item, index) => ({
                        id: item.name,
                        value:
                        <Box
                            // ml={'20px'}        
                                fontSize={'14px'}
                                display={'inline-flex'}
                                w={'85%'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                        >
                                <Box color={'black'}>{item.name}</Box> 
                                <Box color={item.name === 'Critical' ? item.color : 'black'}>{item.value}</Box>
                        </Box>,
                        color: item.color
                    }))
                }
            />
        </PieChart>
    )
}