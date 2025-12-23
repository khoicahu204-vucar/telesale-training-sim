"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface AccountSelectionProps {
  onSelectAccount: (accountId: string) => void
}

const mockAccounts = [
  {
    id: "agent-001",
    name: "Nguyễn Minh Anh",
    role: "Senior Call Center Agent",
    email: "minh.anh@company.com",
    avatar: "👤",
  },
  {
    id: "agent-002",
    name: "Trần Văn Hùng",
    role: "Call Center Agent",
    email: "van.hung@company.com",
    avatar: "👤",
  },
  {
    id: "agent-003",
    name: "Phạm Thị Linh",
    role: "Call Center Agent",
    email: "thi.linh@company.com",
    avatar: "👤",
  },
]

export default function AccountSelection({ onSelectAccount }: AccountSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Call Center Agent</h1>
          <p className="text-slate-400 text-lg">Chọn tài khoản của bạn để bắt đầu</p>
        </div>

        <div className="grid gap-4">
          {mockAccounts.map((account) => (
            <Card
              key={account.id}
              className="bg-slate-800 border-slate-700 hover:border-blue-500 hover:bg-slate-750 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
              onClick={() => onSelectAccount(account.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                      {account.avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{account.name}</h3>
                      <p className="text-slate-400 text-sm">{account.role}</p>
                      <p className="text-slate-500 text-xs mt-1">{account.email}</p>
                    </div>
                  </div>
                  <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                    Đăng nhập
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <p className="text-slate-400 text-sm text-center">
            Đây là giao diện mô phỏng. Trong thực tế, bạn sẽ cần xác thực bằng email hoặc SSO.
          </p>
        </div>
      </div>
    </div>
  )
}
