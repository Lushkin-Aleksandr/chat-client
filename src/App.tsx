import React from 'react'
import './App.css'
import { io } from 'socket.io-client'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { ChatPage } from './components/ChatPage/ChatPage'

const BACK_URL = process.env.REACT_APP_BACK_URL || 'http://localhost:5000'
const socket = io(BACK_URL)

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/chat'} element={<ChatPage socket={socket} />} />
    </Routes>
  )
}

export default App
