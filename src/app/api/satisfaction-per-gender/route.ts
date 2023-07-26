import {NextRequest, NextResponse} from "next/server";
import {Connection} from "@/database/client";
import {satisfactionPerGender} from "@/database/queries";

export async function GET() {

    const c = await Connection.getInstance()
    const r = await c.aggregate(satisfactionPerGender) as Document[];

    return NextResponse.json(r)
}