"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TranscriptMessage } from "./call-transcript"
import { Loader2 } from "lucide-react"

interface CallStatsProps {
  onClose: () => void
  messages: TranscriptMessage[]
  data: {
    sentiment: string
    score: number
    summary: string
    strengths: string
    improvements: string
  } | null
}

export default function CallStats({ onClose, messages, data }: CallStatsProps) {
  const [stats, setStats] = useState({
    duration: "0 phút",
    messageCount: 0,
    agentMessages: 0,
    customerMessages: 0,
  })

  useEffect(() => {
    if (messages.length > 0) {
      const agentCount = messages.filter(m => m.speaker === "agent").length
      const custCount = messages.filter(m => m.speaker === "customer").length
      const startTime = messages[0].timestamp
      const endTime = messages[messages.length - 1].timestamp
      const durationSec = Math.floor((endTime - startTime) / 1000)
      const minutes = Math.floor(durationSec / 60)
      const seconds = durationSec % 60

      setStats({
        duration: `${minutes} phút ${seconds} giây`,
        messageCount: messages.length,
        agentMessages: agentCount,
        customerMessages: custCount
      })
    }
  }, [messages])

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleScoreSubmit = (value: number) => {
    setScore(value)
    setStats({
      ...stats,
      manualScore: value,
    })
    setFeedbackSubmitted(true)
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="border-b border-slate-700">
        <CardTitle>Thống kê cuộc gọi</CardTitle>
        <CardDescription>Phân tích chi tiết về cuộc gọi vừa rồi</CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Duration */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-slate-400 text-sm">Thời lượng</p>
            <p className="text-white font-bold text-lg mt-2">{stats.duration}</p>
          </div>

          {/* Message Count */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-slate-400 text-sm">Tổng tin nhắn</p>
            <p className="text-white font-bold text-lg mt-2">{stats.messageCount}</p>
          </div>

          {/* Agent Messages */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-slate-400 text-sm">Agent nói</p>
            <p className="text-white font-bold text-lg mt-2">{stats.agentMessages}</p>
          </div>

          {/* Customer Messages */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-slate-400 text-sm">Khách hàng nói</p>
            <p className="text-white font-bold text-lg mt-2">{stats.customerMessages}</p>
          </div>
        </div>

        {/* Score Section */}
        <div className="bg-slate-700 p-6 rounded-lg mb-6">
          <h3 className="text-white font-semibold mb-4">Chấm điểm cuộc gọi</h3>

          {/* Auto Score */}
          <div className="mb-6">
            <p className="text-slate-300 text-sm mb-2">Điểm tự động (dựa trên AI)</p>
            {data ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-slate-600 rounded-full h-3 overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${(data.score / 10) * 100}%` }} />
                  </div>
                  <p className="text-white font-bold text-xl">{data.score}/10</p>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Cảm xúc: <span className="text-white font-medium">{data.sentiment}</span>
                </p>
              </>
            ) : (
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Đang phân tích cuộc gọi...</span>
              </div>
            )}
          </div>

          {/* Manual Score */}
          <div>
            <p className="text-slate-300 text-sm mb-3">Đánh giá cá nhân của bạn</p>
            {!feedbackSubmitted ? (
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleScoreSubmit(num)}
                    className="w-10 h-10 rounded-lg bg-slate-600 text-white hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    {num}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-slate-600 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: `${(score / 10) * 100}%` }} />
                </div>
                <p className="text-white font-bold text-xl">{score}/10</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Preview */}
        <div className="bg-slate-700 p-4 rounded-lg mb-6">
          <h3 className="text-white font-semibold mb-3">Tóm tắt & Đánh giá AI</h3>
          {data ? (
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold mb-1">Tóm tắt</p>
                <p className="text-slate-300 text-sm">{data.summary}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-green-400 text-xs uppercase font-bold mb-1">Điểm mạnh</p>
                  <p className="text-slate-300 text-sm">{data.strengths}</p>
                </div>
                <div>
                  <p className="text-red-400 text-xs uppercase font-bold mb-1">Cần cải thiện</p>
                  <p className="text-slate-300 text-sm">{data.improvements}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-slate-400 text-sm italic">
              Đang chờ kết quả từ AI...
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-slate-600 text-white hover:bg-slate-700 bg-transparent"
          >
            Tiếp tục
          </Button>
          <Button className="flex-1 bg-green-600 hover:bg-green-700">Lưu báo cáo</Button>
        </div>
      </CardContent>
    </Card>
  )
}
