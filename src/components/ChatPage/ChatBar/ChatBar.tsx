import React, { FC, useEffect, useState } from 'react'
import s from './ChatBar.module.css'
import { Socket } from 'socket.io-client'

export type UserType = {
  name: string
  socketID: string
}

type PropsType = {
  socket: Socket
}

export const ChatBar: FC<PropsType> = ({ socket }) => {
  const [users, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    socket.on('newUserResponse', (users: UserType[]) => setUsers(users))
  }, [socket, users])

  return (
    <div className={s.chatBar}>
      <div className={s.logoWrapper}>
        <h2>Simple Chat</h2>
      </div>
      <div className={s.content}>
        <h4 className={s.header}>Active users</h4>
        <div className={s.activeUsers}>
          {users.map(u => (
            <p key={u.socketID}>{u.name}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
