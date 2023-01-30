import React, { FC, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import s from './ChatPage.module.css'
import { ChatBar } from './ChatBar/ChatBar'
import { ChatBody } from './ChatBody/ChatBody'
import { ChatFooter } from './ChatFooter/ChatFooter'
import { useNavigate } from 'react-router-dom'
import { ChatHeader } from './ChatHeader/ChatHeader'

export type MessageType = {
  text: string
  name: string
  id: string
  socketID: string
}

type PropsType = {
  socket: Socket
}

export const ChatPage: FC<PropsType> = ({ socket }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userName = sessionStorage.getItem('userName')
    if (userName) {
      setIsInitialized(true)
      socket.emit('newUser', userName)
    } else {
      navigate('/')
    }

    return () => {
      sessionStorage.removeItem('userName')
      socket.emit('removeUser')
    }
  }, [])

  if (!isInitialized) {
    return <div>Loading...</div>
  }

  return (
    <div className={s.chat}>
      <ChatBar socket={socket} />
      <div className={s.chatMain}>
        <ChatHeader socket={socket} />
        <ChatBody socket={socket} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  )
}
