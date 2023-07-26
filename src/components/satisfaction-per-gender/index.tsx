"use client"

import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function SatisfactionPerGender() {

    const [res, setRes] = useState<{ customer: string, satisfactionMedian: number }[]>([]);

    useEffect(() => {
        (async () => {
            const r = await fetch("/api/satisfaction-per-gender", { method: "GET" });
            const d = await r.json();
            setRes(d)
        })()
    }, [])

    const data = {
        labels: res.map(a => a.customer),
        datasets: [
            {
                label: "Gender",
                data: res.map(a => a.satisfactionMedian),
                backgroundColor: 'rgba(255, 99, 50, 0.5)'
            }
        ]
    }

    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Average buying satisfaction per gender',
            },
        },
    } as ChartOptions<"bar">;

    return (
        <div className={"w-[70vw]"}>
            <Bar options={options} data={data}/>
        </div>
    )

}