import apiUser from "@/frameworks/user/userProfile"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response:any = await apiUser()
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}