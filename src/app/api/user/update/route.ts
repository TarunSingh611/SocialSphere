import apiUpdateSecurity from "@/frameworks/user/userUpdate";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data = body?.data;
    const response:any = await apiUpdateSecurity({ data })
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json({ error: 'updateSecurity failed' }, { status: 500 });
  }
}