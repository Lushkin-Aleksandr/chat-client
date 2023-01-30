import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import s from './ChatFooter.module.css'
import { Socket } from 'socket.io-client'
import { MessageType } from '../ChatPage'
import useDebounce from '../../../hooks/useDebounce'
import sendIcon from '../../../assets/icons/send.svg'
import { SendIcon } from './SendIcon/SendIcon'

type PropsType = {
  socket: Socket
}

export const ChatFooter: FC<PropsType> = ({ socket }) => {
  const [typing, setTyping] = useState(false)
  const [messageText, setMessageText] = useState('')
  const debouncedValue = useDebounce(messageText, 2000)

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!typing) {
      setTyping(true)
    }
    socket.emit('typing', sessionStorage.getItem('userName'))

    setMessageText(e.currentTarget.value)
  }

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userName = sessionStorage.getItem('userName')

    if (messageText.trim() && userName) {
      const message: MessageType = {
        text: messageText,
        name: userName,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      }

      socket.emit('message', message)
    }
    socket.emit('finishTyping', sessionStorage.getItem('userName'))
    setMessageText('')
  }

  useEffect(() => {
    if (typing) {
      socket.emit('finishTyping', sessionStorage.getItem('userName'))
      setTyping(false)
    }
  }, [debouncedValue])

  return (
    <div className={s.chatFooter}>
      <form className={s.form} onSubmit={handleSendMessage}>
        <input
          className={s.messageInput}
          type="text"
          placeholder={'Type a message...'}
          value={messageText}
          onChange={handleMessageChange}
        />
        <button className={s.sendMessageBtn}>
          <SendIcon />
        </button>
      </form>
    </div>
  )
}
