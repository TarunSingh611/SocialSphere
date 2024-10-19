import apiVerification from "@/frameworks/auth/verifyCode"
import { setToken } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = body?.data;
    const response:any = await apiVerification({data})
    console.log(response)
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in Verify:', error);
    return NextResponse.json({ error: 'Verify failed' }, { status: 500 });
  }
}