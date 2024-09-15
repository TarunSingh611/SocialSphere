import { addQuestion } from "@/frameworks/DSA/apiDSAQuestions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json();
    const response:any = await addQuestion(body)
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Question add error' }, { status: 500 });
  }
}