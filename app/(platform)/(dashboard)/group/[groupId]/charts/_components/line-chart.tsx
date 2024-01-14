"use client";


import "chart.js/auto";
import { LineChartIcon } from "lucide-react";
import { Line } from "react-chartjs-2";

interface LineChartProps{
    expDay: string[],
    expAmt: number[]
}

export const LineChart = ({
    expDay,
    expAmt
}: LineChartProps) => {
    return(
        <div>
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <LineChartIcon className="h-6 w-6 mr-2" />
                Expenses Chart
            </div>
            <Line
                data={{
                    labels: expDay.map((bal) => bal),
                    datasets: [
                        {
                            label: "Previous 7 days expenses",
                            data: expAmt.map((bal) => bal),
                            borderColor: 'rgba(38, 34, 36, 1)',
                            backgroundColor: 'rgba(38, 34, 36, 1)'
                        }
                    ]
                }}
            />
        </div>
    )
}