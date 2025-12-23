"use client"

import { useState } from "react"
import AccountSelection from "@/components/account-selection"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

  if (!selectedAccount) {
    return <AccountSelection onSelectAccount={setSelectedAccount} />
  }

  return <Dashboard account={selectedAccount} />
}
