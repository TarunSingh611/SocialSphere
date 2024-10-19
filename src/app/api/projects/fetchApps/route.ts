import fetchNNA from "../../../../frameworks/projects/fetchNNA";
import fetchReactApp from "../../../../frameworks/projects/fetchReactApps";
import { NextRequest, NextResponse } from "next/server";
const appList = require("@/data/projectApps.json");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const appName = body?.appName;
    const action = body?.action;
    let response:any = {
      body : `<>"Error in FetchApps response creation "</>`,
      status: 200,
      headers: {
        'Content-Type': "text/html",
      },};
      if (!appName) {
        response = {
          body: `<>"Error in FetchApps: No appName provided"</>`,
          status: 400,
          headers: {
            'Content-Type': "text/html",
          },
        }
      }
      const app = appList?.find( (app:any) => app?.name?.toLowerCase() === appName?.toLowerCase() );
      if(!app){ 
        response = {
          body : `<>"Error in FetchApps: Invalid appName provided : App not found"</>`,
          status: 400,
          headers: {
            'Content-Type': "text/html",
          },
        }
      }
      else if ( app?.type === "jsApp" ){ response = await fetchNNA(appName?.toLowerCase()) }
      else if ( app?.type === "reactApp" || app?.type === "nextApp") response = await fetchReactApp(appName?.toLowerCase(), app.type)
      else {

        response = {
          body: `<>"Error in FetchApps: Invalid appName provided : App type not supported"</>`,
          status: 400,
          headers: {
            'Content-Type': "text/html",
          },
        }
      }

      const nextResponse = new NextResponse(response.body, {
        status: response.status,
        headers: {
          'Content-Type': response.headers.get('Content-Type'|| null) || 'text/html',
        },
      });
        
    return nextResponse;
  } catch (error) {
    console.error("Error in FetchApps:", error);
    return NextResponse.json(
      { error: "Something went wrong in FetchNNA" },
      { status: 500 }
    );
  }
}