'use client'
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const response = await fetch('http://localhost:3002/workspace/all/')

  const workspaces = await response.json()
 
  return NextResponse.json(
    { data: workspaces },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 's-maxage=10, stale-while-revalidate',
      },
    }
  );
  // return Response.json({data: data}, {
  //   status: 200,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  //   },
  // })
}

