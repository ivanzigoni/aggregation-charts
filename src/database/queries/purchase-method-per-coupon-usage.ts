import AggregateInterface from "@/database/queries/aggregate.interface";

const purchaseMethodPerCouponUsage = [
    {
        $group: {
            _id: {
                purchaseMethod: "$purchaseMethod",
                coupon: "$couponUsed"
            },
            occurrence: {
                $sum: 1
            },
        }
    },
    {
        $project: {
            purchaseMethod: "$_id",
            occurrence: 1,
            _id: 0,
        }
    },
]

export default {
    db: "sample_supplies",
    col: "sales",
    pipeline: purchaseMethodPerCouponUsage
} as AggregateInterface