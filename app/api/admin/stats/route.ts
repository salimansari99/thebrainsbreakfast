import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { requireAdmin } from "@/lib/adminGaurd";

export async function GET() {
  try {
    // 🔐 Admin auth
    const userinfo = await requireAdmin();
    console.log(userinfo, "userinfo");

    // 🔌 DB
    await connectDB();

    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const [totalThoughts, thisMonth, likesAgg, scheduled] = await Promise.all([
      Thought.countDocuments(),

      Thought.countDocuments({
        createdAt: { $gte: startOfMonth },
      }),

      Thought.aggregate([
        { $match: { updatedAt: { $gte: startOfDay } } },
        { $group: { _id: null, total: { $sum: "$likes" } } },
      ]),

      Thought.countDocuments({
        status: "PUBLISHED",
        publishDate: { $gt: now },
      }),
    ]);

    return NextResponse.json({
      totalThoughts,
      thisMonth,
      likesToday: likesAgg[0]?.total ?? 0,
      scheduled,
    });
  } catch (error: any) {
    console.error("ADMIN STATS API ERROR:", error);

    if (error?.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
