import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { ChatBookingModal } from './ChatBookingModal'

type ChatBookingContextValue = {
  open: boolean
  openChat: () => void
  closeChat: () => void
}

const ChatBookingContext = createContext<ChatBookingContextValue | null>(null)

export function ChatBookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openChat = useCallback(() => setOpen(true), [])
  const closeChat = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ open, openChat, closeChat }), [open, openChat, closeChat])

  return (
    <ChatBookingContext.Provider value={value}>
      {children}
      <ChatBookingModal open={open} onClose={closeChat} />
    </ChatBookingContext.Provider>
  )
}

export function useChatBooking() {
  const ctx = useContext(ChatBookingContext)
  if (!ctx) throw new Error('useChatBooking must be used within ChatBookingProvider')
  return ctx
}
