import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-Demand Revalidation API
 *
 * Your Go backend can call this endpoint when content changes:
 * POST /api/revalidate?secret=YOUR_SECRET
 * {
 *   "type": "page" | "tag" | "path",
 *   "value": "home" | "page-home" | "/home"
 * }
 */
export async function POST(request: NextRequest) {
  // Verify secret to prevent unauthorized revalidation
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, value } = body;

    if (!type || !value) {
      return NextResponse.json(
        { error: "Missing type or value" },
        { status: 400 },
      );
    }

    switch (type) {
      case "tag":
        // Revalidate by cache tag
        revalidateTag(value);
        break;

      case "path":
        // Revalidate specific path
        revalidatePath(value);
        break;

      case "page":
        // Revalidate page by slug
        revalidatePath(`/${value}`);
        revalidateTag(`page-${value}`);
        break;

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({
      revalidated: true,
      type,
      value,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}
