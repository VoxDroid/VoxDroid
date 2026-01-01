import { NextResponse } from "next/server"

export async function GET() {
  const aiEnabled = process.env.ENABLE_AI_CHAT !== 'false'
  return NextResponse.json({ aiEnabled })
}