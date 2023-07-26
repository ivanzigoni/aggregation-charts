"use client"

import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, ChartOptions, ChartData,
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

export default function PurchaseMethodPerCouponUsage() {

    const [res, setRes] = useState<{ [key:string]: { usedCoupon: number, didntUseCoupon: number }}>({});

    useEffect(() => {
        (async () => {
            const r = await fetch("/api/purchase-method-per-coupon-usage", { method: "GET" });
            const d = await r.json() as {
                occurrence: number, purchaseMethod: { purchaseMethod: string, coupon: boolean }
            }[];

            const serialized = d.reduce((acc, e) => {
                const {
                    purchaseMethod: {
                        purchaseMethod: method,
                        coupon
                    },
                    occurrence
                } = e;

                acc[method] = {
                    usedCoupon: coupon ? acc[method] && acc[method].usedCoupon ? acc[method].usedCoupon : occurrence : occurrence,
                    didntUseCoupon: !coupon ? acc[method] && acc[method].didntUseCoupon ? acc[method].didntUseCoupon : occurrence : occurrence,
                }

                return acc;
            }, {} as { [key:string]: { usedCoupon: number, didntUseCoupon: number } })

            setRes(serialized)
        })()
    }, [])

    const data = {
        labels: Object.keys(res),
        datasets: [
            {
                label: "Used coupon",
                data: Object.values(res).map(e => e.usedCoupon),
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
                label: "Did not use coupon",
                data: Object.values(res).map(e => e.didntUseCoupon),
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
        ]
    } as ChartData<"bar">

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: "Coupon usage per purchase method",
            },
        },
    } as ChartOptions<"bar">;

    return (
        <div className={"w-[70vw]"}>
            <Bar options={options} data={data}/>
        </div>
    )

}