"use client"

import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ChartOptions, ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function SatisfactionPerMonth() {

    const [res, setRes] = useState<{ satisfactionAverage: string, date: string }[]>([]);

    useEffect(() => {
        (async () => {
            const r = await fetch("/api/satisfaction-per-month", { method: "GET" });
            const d = await r.json();
            setRes(d)
        })()
    }, [])

    const data = {
        labels: res.map(a => new Date(a.date).toLocaleDateString("pt-br")),
        datasets: [
            {
                label: "Average satisfaction",
                data: res.map(a => a.satisfactionAverage),
                backgroundColor: 'rgba(255, 99, 50, 0.5)',
                borderColor: 'rgb(255, 99, 132)'
            }
        ]
    } as unknown as ChartData<"line">

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Average satisfaction per month from every year available',
            },
        },
    } as unknown as ChartOptions<"line">;

    return (
        <div className={"w-[70vw]"}>
            <Line options={options} data={data}/>
        </div>
    )

}