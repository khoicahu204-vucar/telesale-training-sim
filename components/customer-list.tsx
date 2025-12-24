"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  lastCall?: string
}

interface CustomerListProps {
  selectedId: string | null
  onSelectCustomer: (id: string) => void
  isCallActive: boolean
}

const mockCustomers: Customer[] = [
  {
    id: "cust-003",
    name: "Trịnh Văn Thành",
    phone: "0912345678",
    email: "thanh.tv@gmail.com",
    lastCall: "Chưa gọi",
  },
  {
    id: "cust-004",
    name: "Lê Văn Hùng",
    phone: "0909123456",
    email: "hung.le@gmail.com",
    lastCall: "Chưa gọi",
  },
  {
    id: "cust-005",
    name: "Phạm Thị Lan",
    phone: "0988776655",
    email: "lan.pham@gmail.com",
    lastCall: "Chưa gọi",
  },
  {
    id: "cust-006",
    name: "Thảo",
    phone: "09xxx (Chưa rõ)",
    email: "thao.kia@gmail.com",
    lastCall: "Chưa gọi",
  },
  {
    id: "cust-007",
    name: "Đặng Minh Vũ",
    phone: "09xxx (Chưa rõ)",
    email: "vu.sedona@gmail.com",
    lastCall: "Chưa gọi",
  },
  {
    id: "cust-008",
    name: "Lê Trà",
    phone: "09xxx (Chưa rõ)",
    email: "tra.vf5@gmail.com",
    lastCall: "Chưa gọi",
  },
  {
    id: "cust-009",
    name: "Phan Tuấn Thy",
    phone: "0934080443",
    email: "thy.chevrolet@gmail.com",
    lastCall: "Chưa gọi",
  },
  {
    id: "cust-010",
    name: "Khánh Linh",
    phone: "09xxx (Chưa rõ)",
    email: "linh.santafe@gmail.com",
    lastCall: "Chưa gọi",
  },
]

export default function CustomerList({ selectedId, onSelectCustomer, isCallActive }: CustomerListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold mb-3">Danh sách khách hàng</h2>
        <Input
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredCustomers.length === 0 ? (
          <div className="p-4 text-center text-slate-400">Không tìm thấy khách hàng</div>
        ) : (
          <div className="space-y-2 p-2">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => !isCallActive && onSelectCustomer(customer.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${selectedId === customer.id
                  ? "bg-blue-600 border border-blue-500"
                  : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                  } ${isCallActive && selectedId !== customer.id ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <p className="font-medium text-sm">{customer.name}</p>
                <p className="text-xs text-slate-300 mt-1">{customer.phone}</p>
                <p className="text-xs text-slate-400 mt-1">{customer.email}</p>
                <p className="text-xs text-slate-500 mt-2">Gọi lần cuối: {customer.lastCall}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
