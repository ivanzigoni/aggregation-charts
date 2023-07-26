import AggregateInterface from "@/database/queries/aggregate.interface";

const mostSoldItem = [
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: "$items.name",
            count: { $sum: 1 }
        }
    },
    {
        $sort: {
            count: 1
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            name: "$_id",
            count: 1,
        }
    }
]

export default {
    pipeline: mostSoldItem,
    db: "sample_supplies",
    col: "sales"
} as AggregateInterface;
