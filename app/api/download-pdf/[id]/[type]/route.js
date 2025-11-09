import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/utils/config";

export async function GET(request, { params }) {
  try {
    const { id, type } = params;
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    console.log(`📥 Server-side PDF download proxy - ID: ${id}, Type: ${type}`);
    console.log(`🍪 JWT token present: ${!!token}`);

    if (!token) {
      console.log("❌ No JWT token found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Make request to backend with the JWT cookie
    const backendUrl = `${API_BASE_URL}/api/insurance/download-pdf/${id}/${type}`;
    console.log(`📡 Fetching from backend: ${backendUrl}`);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Cookie: `jwt=${token}`,
        Accept: "application/pdf",
      },
    });

    console.log(`📡 Backend response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Backend error: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { error: `Failed to download PDF: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Get the PDF buffer
    const pdfBuffer = await response.arrayBuffer();
    console.log(`✅ PDF received, size: ${pdfBuffer.byteLength} bytes`);

    // Get filename from content-disposition header
    const contentDisposition = response.headers.get("content-disposition");
    let filename = `Document_${id}.pdf`;
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(
        /filename="([^"]+)"|filename=([^;\s]+)/
      );
      if (filenameMatch) {
        filename = filenameMatch[1] || filenameMatch[2];
      }
    }

    // Return the PDF with proper headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.byteLength.toString(),
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("❌ Server-side download error:", error);
    return NextResponse.json(
      { error: "Failed to download PDF" },
      { status: 500 }
    );
  }
}
