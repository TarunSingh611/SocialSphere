import apiLogin from "@/frameworks/auth/login"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = body?.data;
    const response:any = await apiLogin({ data })
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json({ error: 'login failed' }, { status: 500 });
  }
}