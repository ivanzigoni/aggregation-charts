import {NextRequest, NextResponse} from "next/server";
import {Connection} from "@/database/client";
import {salesPerMonth} from "@/database/queries";

export async function GET(req, res) {

    const c = await Connection.getInstance()
    const r = await c.aggregate(salesPerMonth) as Document[];

    return NextResponse.json(r)
}