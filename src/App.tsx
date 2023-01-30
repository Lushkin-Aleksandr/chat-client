import React from 'react'
import './App.css'
import { io } from 'socket.io-client'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { ChatPage } from './components/ChatPage/ChatPage'

const socket = io(process.env.BACK_URL || 'http://localhost:5000')

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/chat'} element={<ChatPage socket={socket} />} />
    </Routes>
  )
}

export default App
