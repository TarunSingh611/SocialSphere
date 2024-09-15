import { getQuestions} from "@/frameworks/DSA/apiDSAQuestions";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request?.json();
    const response:any = await getQuestions(body)
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json({ error: 'Question fetch error' }, { status: 500 });
  }
}