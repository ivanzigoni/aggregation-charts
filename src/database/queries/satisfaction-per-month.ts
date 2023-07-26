import AggregateInterface from "@/database/queries/aggregate.interface";

const satisfactionPerMonth = [
    {
        $group: {
            _id: {
                year: {
                    $year: "$saleDate"
                },
                month: {
                    $month: "$saleDate"
                },
            },
            satisfactionTotal: {
                $sum: "$customer.satisfaction"
            },
            occurrence: {
                $sum: 1
            }
        }
    },
    {
        $project: {
            date: {
                $dateFromString: {
                    dateString: {
                        $concat: [{ $substr: ["$_id.year", 0, -1] }, "-" ,{ $substr: ["$_id.month", 0, -1] }]
                    }
                }
            },
            satisfactionAverage: {
                $round: [{$divide: ["$satisfactionTotal", "$occurrence"]}, 1]
            },
            _id: 0,
        }
    },
    {
        $sort: {
            "date": 1
        }
    }
]

export default {
    db: "sample_supplies",
    col: "sales",
    pipeline: satisfactionPerMonth
} as AggregateInterface