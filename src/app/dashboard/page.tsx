import SalesPerMonth from "@/components/sales-per-month";
import SatisfactionPerGender from "@/components/satisfaction-per-gender";
import SatisfactionPerMonth from "@/components/satisfaction-per-month";
import PurchaseMethodPerCouponUsage from "@/components/purchase-method-per-coupon-usage";

export default async function Dashboard() {



    return (
        <div className={"flex flex-col items-center"}>
            <header className={"text-center"}>
                <h2>Welcome</h2>
                <p>the following are graphs constructed through aggregations run on MongoDB Atlas's sample dataset</p>
                <p>it uses Chart.js and Next.js</p>
                <p>components are client side and data is fetched through mongodb driver and exposed through next api routing</p>
                <p>database: sample_supplies</p>
                <p>collection: sales</p>
                <p>altough responsive, best seen on desktop browser</p>
            </header>
            <SalesPerMonth />
            <SatisfactionPerGender />
            <SatisfactionPerMonth />
            <PurchaseMethodPerCouponUsage />
        </div>
    )
}