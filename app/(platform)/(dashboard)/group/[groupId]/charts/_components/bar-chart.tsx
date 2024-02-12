"use client";

import "chart.js/auto";
import { BarChartBig } from "lucide-react";
import { Bar } from "react-chartjs-2";

interface ChartProps{
    balanceName: string[][];
    balanceAmount: string[];
}

export const BarChart = ({
    balanceAmount,
    balanceName
} : ChartProps) => {
    
    const backgroundColors = balanceAmount.map((bal) => (parseFloat(bal) >= 0 ? "rgba(127, 209, 6, 0.8)" : "rgba(210, 6, 6, 0.8)"));

    return (
        <div>
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <BarChartBig className="h-6 w-6 mr-2" />
                Balances Chart
            </div>
            <Bar
                data={{
                    labels: balanceName.map((bal) => bal),
                    datasets: [
                        {
                            label: "Balances",
                            data: balanceAmount.map((bal) => bal),
                            backgroundColor: backgroundColors,
                            borderRadius: 5
                        }
                    ]
                }}
            />
        </div>
    )
}