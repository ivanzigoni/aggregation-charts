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

export default function SalesPerMonth() {

    const [res, setRes] = useState<{ date: string, sales: number }[]>([]);

    useEffect(() => {
        (async () => {
            const r = await fetch("/api/sales-per-month", { method: "GET" });
            const d = await r.json();
            setRes(d)
        })()
    }, [])

    const data = {
        labels: res.map(a => new Date(a.date).toLocaleDateString("pt-br")),
        datasets: [
            {
                label: "Sales",
                data: res.map(a => a.sales),
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: "Sales per month from all available years",
            },
        },
    } as ChartOptions<"bar">;

    return (
        <div className={"w-[70vw]"}>
            <Bar options={options} data={data}/>
        </div>
    )

}