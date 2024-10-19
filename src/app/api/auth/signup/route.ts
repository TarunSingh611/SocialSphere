import { NextRequest, NextResponse } from "next/server";
import apiSignup from "@/frameworks/auth/signup";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data = body?.data;
        const response = await apiSignup({ data });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error in signup:', error);
        return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
    }
}
