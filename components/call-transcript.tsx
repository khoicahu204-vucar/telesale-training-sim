"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface TranscriptMessage {
  id: string
  speaker: "agent" | "customer"
  text: string
  timestamp: number
}

interface CallTranscriptProps {
  isCallActive: boolean
  messages: TranscriptMessage[]
}

export default function CallTranscript({ isCallActive, messages }: CallTranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <Card className="flex-1 bg-slate-800 border-slate-700 flex flex-col overflow-hidden">
      <CardHeader className="border-b border-slate-700">
        <CardTitle>Transcript cuộc gọi</CardTitle>
        <CardDescription>{isCallActive ? "Đang ghi âm..." : "Chưa có cuộc gọi"}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-6" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            <p>Bắt đầu một cuộc gọi để xem transcript</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.speaker === "agent" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-md px-4 py-2 rounded-lg ${message.speaker === "agent" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-100"
                    }`}
                >
                  <p className="text-sm font-medium mb-1">
                    {message.speaker === "agent" ? "👤 Agent" : "👤 Khách hàng"}
                  </p>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-2 opacity-70">{new Date(message.timestamp).toLocaleTimeString("vi-VN")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
