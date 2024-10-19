import { getToken } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {

    const token = await getToken();
    if (!token) {
      
      return NextResponse.json({ navTypes: 0 , authorized: false }, { status: 200 });
    }
    else {
        return NextResponse.json({ navTypes: 1 , authorized: false }, { status: 200 });
    }
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json({ error: 'getting Navs failed' }, { status: 500 });
  }
}



