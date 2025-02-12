import {ChatApiData} from "@/Data/Application/Chats";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json(ChatApiData);
}