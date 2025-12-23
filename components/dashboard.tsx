"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import CustomerList from "@/components/customer-list"
import CallTranscript, { TranscriptMessage } from "@/components/call-transcript"
import CallStats from "@/components/call-stats"
import CustomerInfo from "@/components/customer-info"
import { scenarios } from "@/app/data/scenarios"
import { Loader2, Mic, Square } from "lucide-react"

interface DashboardProps {
  account: string
}

export default function Dashboard({ account }: DashboardProps) {
  /* State */
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>("cust-003")
  const [isCallActive, setIsCallActive] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [activeTab, setActiveTab] = useState<"info" | "transcript">("info")
  const [messages, setMessages] = useState<TranscriptMessage[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [statsData, setStatsData] = useState<any>(null)

  /* Refs */
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null)

  /* Helpers */
  const playAudio = async (blob: Blob) => {
    setIsPlayingAudio(true)
    const url = URL.createObjectURL(blob)

    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = url
      audioPlayerRef.current.play()
      audioPlayerRef.current.onended = () => {
        setIsPlayingAudio(false)
        URL.revokeObjectURL(url)
      }
    }
  }

  /* Keyboard Listeners */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c" && !isRecording && isCallActive && !isProcessing && !isPlayingAudio) {
        startRecording()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c" && isRecording) {
        stopRecording()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [isRecording, isCallActive, isProcessing, isPlayingAudio])

  const handleStartCall = async () => {
    setIsCallActive(true)
    setMessages([])
    setStatsData(null)
    setActiveTab("transcript")

    // Find scenario linked to customer (mock logic for now, using the new scenario)
    const scenario = scenarios.find(s => s.id === selectedCustomerId) || scenarios[0]

    // Add initial message
    const initialMsg: TranscriptMessage = {
      id: "init",
      speaker: "customer",
      text: scenario.initialMessage,
      timestamp: Date.now()
    }
    setMessages([initialMsg])

    // Trigger TTS for initial message
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: scenario.initialMessage })
      })
      if (res.ok) {
        const blob = await res.blob()
        playAudio(blob)
      }
    } catch (e) {
      console.error("TTS Error:", e)
    }
  }

  const handleEndCall = async () => {
    setIsCallActive(false)
    setShowStats(true)
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
    }
    setIsPlayingAudio(false)

    // Save Transcript & Analyze
    const scenario = scenarios.find(s => s.id === selectedCustomerId) || scenarios[0]

    try {
      // Save Transcript
      await fetch("/api/transcripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          scenarioId: scenario.id,
          agentId: account
        })
      })

      // Analyze Call
      const analyzeRes = await fetch("/api/analyze-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages })
      })
      const data = await analyzeRes.json()
      setStatsData(data)

    } catch (e) {
      console.error("Error processing call end:", e)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.error("Error accessing microphone:", err)
      alert("Không thể truy cập microphone")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        setIsRecording(false)
        await processUserAudio(audioBlob)
      }
    }
  }

  const processUserAudio = async (audioBlob: Blob) => {
    setIsProcessing(true)
    try {
      // 0. Upload Audio (Background)
      const uploadFormData = new FormData()
      uploadFormData.append("file", audioBlob, `recording-${Date.now()}.webm`)
      fetch("/api/upload-audio", {
        method: "POST",
        body: uploadFormData
      }).then(res => res.json())
        .then(data => console.log("Audio uploaded:", data.url))
        .catch(err => console.error("Audio upload failed:", err))

      // 1. STT
      const formData = new FormData()
      formData.append("file", audioBlob, "recording.webm")

      const sttRes = await fetch("/api/stt", {
        method: "POST",
        body: formData
      })
      const sttData = await sttRes.json()

      if (!sttData.text) throw new Error("STT Failed")

      // Add User Message
      const userMsg: TranscriptMessage = {
        id: Date.now().toString(),
        speaker: "agent",
        text: sttData.text,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, userMsg])

      // 2. Chat
      const scenario = scenarios.find(s => s.id === selectedCustomerId) || scenarios[0]
      // Prepare history
      const history = messages.map(m => ({
        role: m.speaker === "agent" ? "user" : "assistant",
        content: m.text
      }))
      history.push({ role: "user", content: sttData.text })

      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          scenarioId: scenario.id
        })
      })
      const chatData = await chatRes.json()

      // Add Assistant Message
      const assistantMsg: TranscriptMessage = {
        id: (Date.now() + 1).toString(),
        speaker: "customer",
        text: chatData.content,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, assistantMsg])

      // 3. TTS
      const ttsRes = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: chatData.content })
      })
      const ttsBlob = await ttsRes.blob()
      playAudio(ttsBlob)

    } catch (error) {
      console.error("Processing Loop Error:", error)
      alert("Có lỗi xảy ra trong quá trình xử lý.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Call Center Agent</h1>
            <p className="text-slate-400 text-sm mt-1">Account: {account}</p>
          </div>
          <Button
            variant="destructive"
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700"
          >
            Đăng xuất
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Left Sidebar - Customer List */}
        <div className="w-80 bg-slate-800 border border-slate-700 rounded-lg flex flex-col overflow-hidden">
          <CustomerList
            selectedId={selectedCustomerId}
            onSelectCustomer={setSelectedCustomerId}
            isCallActive={isCallActive}
          />
        </div>

        {/* Right Panel - Call Interface */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Call Status */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Call Status</p>
                <p className="text-white font-semibold">{isCallActive ? "🔴 Đang gọi" : "⚫ Chưa gọi"}</p>
              </div>
              {!isCallActive ? (
                <Button onClick={handleStartCall} className="bg-green-600 hover:bg-green-700">
                  📞 Bắt đầu cuộc gọi
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  {/* Recording Controls */}
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    className={`${isRecording ? "animate-pulse" : ""} ${isProcessing ? "opacity-50" : ""}`}
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    disabled={isProcessing || isPlayingAudio}
                  >
                    {isProcessing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : isRecording ? (
                      <Square className="mr-2 h-4 w-4 fill-current" />
                    ) : (
                      <Mic className="mr-2 h-4 w-4" />
                    )}
                    {isRecording ? "Thả để gửi" : "Nhấn giữ để nói (hoặc nhấn giữ phím C)"}
                  </Button>

                  <Button onClick={handleEndCall} className="bg-red-600 hover:bg-red-700" variant="secondary">
                    ✕ Kết thúc
                  </Button>
                </div>
              )}
            </div>
          </div>

          <audio ref={audioPlayerRef} className="hidden" />

          <div className="flex-1 flex flex-col gap-0 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex gap-0 bg-slate-800 border border-slate-700 rounded-t-lg overflow-hidden">
              <button
                onClick={() => setActiveTab("info")}
                className={`flex-1 py-3 px-4 font-medium text-sm transition-colors ${activeTab === "info"
                  ? "bg-blue-600 text-white border-b-2 border-blue-400"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
              >
                📋 Thông tin khách hàng
              </button>
              <button
                onClick={() => setActiveTab("transcript")}
                className={`flex-1 py-3 px-4 font-medium text-sm transition-colors ${activeTab === "transcript"
                  ? "bg-blue-600 text-white border-b-2 border-blue-400"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
              >
                💬 Transcript cuộc gọi
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 bg-slate-800 border border-t-0 border-slate-700 rounded-b-lg p-6 overflow-y-auto">
              {activeTab === "info" ? (
                <CustomerInfo customerId={selectedCustomerId} />
              ) : (
                <>
                  {!showStats ? (
                    <CallTranscript isCallActive={isCallActive} messages={messages} />
                  ) : (
                    <div className="space-y-6">
                      <CallTranscript isCallActive={isCallActive} messages={messages} />
                      <CallStats
                        onClose={() => setShowStats(false)}
                        data={statsData}
                        messages={messages}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
