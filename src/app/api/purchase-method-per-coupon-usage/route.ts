import {NextRequest, NextResponse} from "next/server";
import {Connection} from "@/database/client";
import {purchaseMethodPerCouponUsage} from "@/database/queries";

export async function GET() {

    const c = await Connection.getInstance()
    const r = await c.aggregate(purchaseMethodPerCouponUsage) as Document[];

    return NextResponse.json(r)
}