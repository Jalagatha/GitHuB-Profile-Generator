import { useState } from 'react'
import { domain } from '../Domain'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate(`/users/${search}`)
  }

  return (
    <div className='profile'>
      <h2>Find Your Git Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type='search' name='search input' placeholder='Enter github username' value={search} onChange={(e) => setSearch(e.target.value)} />
      </form>
    </div>
  )
}

export default Home
