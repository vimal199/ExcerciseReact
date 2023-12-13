import { useState } from 'react'
import { Link, Navigate, Route, BrowserRouter as Router, Routes, useMatch, useNavigate } from 'react-router-dom'
import { useField } from './hooks'
const Menu = ({ anecdotes, addNew, message }) => {
  const navigate = useNavigate()
  const padding = {
    paddingRight: 5
  }
  return (

    <div>

      {/*  <a href='#' style={padding}>anecdotes</a>
        <a href='#' style={padding}>create new</a>
        <a href='#' style={padding}>about</a> */}

      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding} to="/create">Create new</Link>
      <Link style={padding} to="/about">about</Link>
      <Notification message={message} />
      <Routes>
        <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path='/create' element={<CreateNew addNew={addNew} />}></Route>
        <Route path='/about' element={<About />}></Route>
        {/*         <Route path='/' element={<Navigate replace to="/anecdotes" />}></Route>
 */}
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
      </Routes>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
      </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}
const Anecdote = ({ anecdote }) => {
  console.log(anecdote);
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}
const Notification = (props) => {
  if (props.message == '') {
    return null;
  } else {
    return (
      <p>a new anecdote {props.message}</p>
    )
  }
}
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const matchAnecdote = useMatch('/anecdote/:id')
  const anecdote = matchAnecdote ? anecdotes.find(anecdote => anecdote.id == matchAnecdote.params.id) : null
  const navigate = useNavigate()
  const addNew = (anecdote_in) => {
    const anecdote = {
      content: anecdote_in.content.value,
      author: anecdote_in.content.value,
      info: anecdote_in.info,
      votes: anecdote_in.votes
    }
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    //Notification(anecdote.content)
    setNotification(anecdote.content)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate('/anecdotes')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} message={notification} />
      {/* <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} /> */}
      <Routes>
        <Route path='/anecdote/:id' element={<Anecdote anecdote={anecdote} />}></Route>
        {/* <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />}></Route> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
