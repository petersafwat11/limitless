import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Get the authorization header if present
    const authorization = request.headers.get("authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/insurance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authorization && { Authorization: authorization }),
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    // Get the authorization header
    const authorization = request.headers.get("authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/insurance?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(authorization && { Authorization: authorization }),
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
