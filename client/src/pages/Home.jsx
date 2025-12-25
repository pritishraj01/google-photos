import React, { useContext, useEffect, useState } from 'react'
import { dataContext } from '../UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  let { serverUrl, setUserData } = useContext(dataContext)
  let [backendImage, setBackendImage] = useState(null)
  let [title, setTitle] = useState("")
  let [loading, setLoading] = useState(false)
  let [image, setImages] = useState([])
  let navigate = useNavigate()

  const handleCreatePic = async () => {
    try {
      setLoading(true)
      let formdata = new FormData()
      formdata.append("title", title)
      formdata.append("photo", backendImage)

      await axios.post(`${serverUrl}/api/createPic`, formdata, {
        withCredentials: true
      })
      alert("your image uploaded")
      await getPic()
      setTitle("")
      setBackendImage(null)
    } catch (error) {
      console.log(`createpic error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const getPic = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/getpic`, {
        withCredentials: true
      })
      setImages(Array.isArray(result.data) ? result.data : [])
    } catch (error) {
      console.log(`getpic error: ${error}`)
      setImages([])
    }
  }

  const deletePic = async (id) => {
    try {
      await axios.delete(`${serverUrl}/api/deletepic/${id}`, {
        withCredentials: true
      })
      await getPic()
    } catch (error) {
      console.log(`deletePic error: ${error}`)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/auth/logout`, {
        withCredentials: true
      })
      setUserData("")
      navigate("/login")
    } catch (error) {
      console.log(`logout error axios: ${error}`)
    }
  }

  const handleImage = (e) => {
    setBackendImage(e.target.files[0])
  }

  useEffect(() => {
    getPic()
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 via-black to-slate-900 text-white">

      {/* Mobile Top Bar */}
      <header className="md:hidden sticky top-0 z-20 bg-black/70 backdrop-blur border-b border-white/10 p-4 flex flex-col gap-3">
        <h1 className="text-xl font-bold text-purple-400">PicVault</h1>

        <input
          type="text"
          placeholder="Image title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none"
        />

        <input
          type="file"
          onChange={handleImage}
          className="file:bg-purple-600 file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-white"
        />

        <div className="flex gap-2">
          <button
            onClick={handleCreatePic}
            disabled={loading}
            className={`flex-1 py-2 rounded-lg font-semibold
              ${loading
                ? "bg-zinc-600"
                : "bg-gradient-to-r from-purple-600 to-pink-600"
              }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500/80"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-[280px] bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-wide text-purple-400">
          PicVault
        </h1>

        <input
          type="text"
          placeholder="Image title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none"
        />

        <input
          type="file"
          onChange={handleImage}
          className="file:bg-purple-600 file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-white cursor-pointer"
        />

        <button
          onClick={handleCreatePic}
          disabled={loading}
          className={`py-3 rounded-xl font-semibold transition
            ${loading
              ? "bg-zinc-600"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105"
            }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        <button
          onClick={handleLogout}
          className="mt-auto py-2 rounded-lg bg-red-500/80 hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="md:ml-[300px] px-4 sm:px-6 py-6">
        {image.length === 0 && (
          <p className="text-zinc-400 text-lg">
            No images yet. Start uploading 🚀
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {image.map((item) => (
            <div
              key={item._id}
              className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:scale-[1.02] transition"
            >
              <img
                src={item.photo}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-3 flex flex-col gap-2">
                <p className="font-semibold truncate">{item.title}</p>

                <button
                  onClick={() => deletePic(item._id)}
                  className="self-start text-sm px-3 py-1 rounded-full bg-rose-500/80 hover:bg-rose-600"
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
