import React, { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './Home.module.css'

type PropsType = {}

export const Home: FC<PropsType> = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userName.trim()) {
      return
    }
    sessionStorage.setItem('userName', userName)
    navigate('/chat')
  }

  return (
    <form className={s.homeForm} onSubmit={handleSubmit}>
      <h2 className={s.homeHeader}>Sign in to Simple chat</h2>
      <label htmlFor="username">Your name</label>
      <input
        className={s.usernameInput}
        type="text"
        placeholder={'Type your name...'}
        minLength={3}
        maxLength={10}
        name={'username'}
        id={'username'}
        value={userName}
        autoComplete={'new-password'}
        onChange={e => setUserName(e.currentTarget.value)}
      />
      <button className={s.submitBtn}>SIGN IN</button>
    </form>
  )
}
