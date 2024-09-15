
import { NextRequest, NextResponse } from "next/server";
import { removeToken } from "@/services/auth";
export async function DELETE(request: NextRequest) {
  try {
    removeToken()
    return NextResponse.json({ statusCode: 200, message : "Logout successful" }, { status: 200 });
  } catch (error) {
    console.error('Error in logout:', error);
    return NextResponse.json({ error: 'logout failed' }, { status: 500 });
  }
}