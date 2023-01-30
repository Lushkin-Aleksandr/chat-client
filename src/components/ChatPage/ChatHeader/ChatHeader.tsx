import React, { FC, useEffect, useState } from 'react'
import s from './ChatHeader.module.css'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import leaveIcon from '../../../assets/icons/leave.svg'

type PropsType = {
  socket: Socket
}

export const ChatHeader: FC<PropsType> = ({ socket }) => {
  const navigate = useNavigate()
  const [typingUserName, setTypingUserName] = useState('')

  const handleLeaveChat = () => {
    sessionStorage.removeItem('userName')
    navigate('/')
    window.location.reload()
  }

  useEffect(() => {
    socket.on('typingResponse', (data: string) => setTypingUserName(data))
  }, [socket])

  return (
    <header className={s.header}>
      <p>Public chat</p>
      {typingUserName && (
        <div className={s.typingStatus}>
          <p>{typingUserName} is typing...</p>
        </div>
      )}
      <a className={s.leaveChatBtn} onClick={handleLeaveChat}>
        <span className={s.btnText}>Leave chat</span>
        <img className={s.leaveIcon} src={leaveIcon} alt="leave chat" />
      </a>
    </header>
  )
}
