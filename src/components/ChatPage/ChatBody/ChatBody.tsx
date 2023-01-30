import React, { FC, useEffect, useRef, useState, UIEvent } from 'react'
import s from './ChatBody.module.css'
import { MessageType } from '../ChatPage'
import { Socket } from 'socket.io-client'

type PropsType = {
  socket: Socket
}

export const ChatBody: FC<PropsType> = ({ socket }) => {
  console.log('Render chatbody')
  const [messages, setMessages] = useState<MessageType[]>([])
  const [autoScroll, setAutoscroll] = useState(true)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const prevScrollTop = useRef(0)

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const currentScrollTop = e.currentTarget.scrollTop
    const hiddenScrollSize = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight
    if (autoScroll && currentScrollTop < prevScrollTop.current) {
      setAutoscroll(false)
    } else {
      prevScrollTop.current = currentScrollTop - 10
    }

    if (currentScrollTop >= hiddenScrollSize && !autoScroll) {
      setAutoscroll(true)
    }

    console.log('Current: ' + currentScrollTop)
    console.log('Hidden: ' + hiddenScrollSize)
  }

  useEffect(() => {
    socket.on('messageResponse', (message: MessageType) => setMessages([...messages, message]))
  }, [socket, messages])

  useEffect(() => {
    if (autoScroll) {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, autoScroll])

  return (
    <div className={s.messageContainer} onScroll={handleScroll}>
      {messages.map(m => {
        return m.socketID === socket.id ? (
          <div className={s.messageChats} key={m.id}>
            <p className={s.senderName}>You</p>
            <div className={s.messageSender}>
              <p>{m.text}</p>
            </div>
          </div>
        ) : (
          <div className={s.messageChats} key={m.id}>
            <p>{m.name}</p>
            <div className={s.messageRecipient}>
              <p>{m.text}</p>
            </div>
          </div>
        )
      })}

      <div ref={lastMessageRef}></div>
    </div>
  )
}
