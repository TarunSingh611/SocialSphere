import { NextRequest, NextResponse } from "next/server";
import cleanUpApp from "../../../../frameworks/projects/cleanUpApps";
export async function POST(request: NextRequest) {
    const body = await request.json();
    const appName = body?.appName;
  
    if (appName) {
      const response = await cleanUpApp(appName);
      return new Response(JSON.stringify(response), { status: 200 });
    }
  
    return new Response(JSON.stringify({ message: 'Cleanup complete' }), { status: 200 });
  }