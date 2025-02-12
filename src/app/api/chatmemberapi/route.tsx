import {ChatMemberApiData} from "@/Data/Application/Chats";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json(ChatMemberApiData);
}
