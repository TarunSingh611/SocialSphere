import apiSendVerificationCode from "@/frameworks/auth/sendverificationCode"
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = body?.data;
    const response = await apiSendVerificationCode({data})
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in resend:', error);
    return NextResponse.json({ error: 'resend failed' }, { status: 500 });
  }
}