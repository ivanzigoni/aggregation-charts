import AggregateInterface from "@/database/queries/aggregate.interface";

const satisfactionPerGender = [
    {
        $group: {
            _id: "$customer.gender",
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
            customer: "$_id",
            satisfactionMedian: {
                $round: [{ $divide: ["$satisfactionTotal", "$occurrence"] }, 2]
            },
            _id: 0,
        }
    },
]

export default {
    db: "sample_supplies",
    col: "sales",
    pipeline: satisfactionPerGender
} as AggregateInterface