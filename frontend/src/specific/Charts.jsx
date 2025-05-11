import React from 'react'
import {Line,Doughnut} from "react-chartjs-2";
import { Chart as ChartJS,CategoryScale,Tooltip,Filler,LinearScale,PointElement,LineElement,ArcElement,Legend } from 'chart.js';
import { getLast7Days } from '../lib/features';

ChartJS.register(CategoryScale,Tooltip,Filler,LinearScale,PointElement,LineElement,ArcElement,Legend );

const labels=getLast7Days();

const lineChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false
        },
        title:{
            display:false
        }
    },
    scales:{
        x:{
           grid:{
            display:false
           } 
        },
        y:{
            beginAtZer:true,
            grid:{
            display:false
           } 
        }
    }
}

const LineChart = ({value=[]}) => {
    const data={
        labels:labels,
        datasets:[
        {
            data:value,
            label:"Messages",
            fill:true,
            backgroundColor:"rgba(75,12,192,0.1)",
            borderColor:"rgba(75,12,192,1)"
        },
    
    ]
    }
  return (
    <Line data={data} options={lineChartOptions}/>
  )
}

const doughnutOptions={
responsive:true,
    plugins:{
        legend:{
            display:false
        }
    },
    cutout:120
}

const DoughnutChart=({value=[],labels=[]})=>{

    const data={
        labels:labels,
        datasets:[
        {
            data:value,
            label:"Total Chats VS Group Chat",
            fill:true,
            backgroundColor:["rgba(75,12,192,0.1)","#CEA2FD"],
            borderColor:["rgba(75,12,192,1)","#CEA2FD"],
            offset:20
        },
    
    ]
    }

    return(
       <Doughnut data={data} options={doughnutOptions} style={{zIndex:10}}/>
    )
}

export  {LineChart,DoughnutChart};