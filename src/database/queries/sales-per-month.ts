import AggregateInterface from "@/database/queries/aggregate.interface";

const salesPerMonth = [
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
            sales: {
                $sum: 1
            },
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
            sales: 1,
            _id: 0,
        }
    },
];

export default {
    db: "sample_supplies",
    col: "sales",
    pipeline: salesPerMonth
} as AggregateInterface