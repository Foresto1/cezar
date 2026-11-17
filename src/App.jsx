import { useState } from 'react'
import './App.css'

const ALFABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function szyfrujZnak(znak, przesuniecie) {
  const pozycja = ALFABET.indexOf(znak)
  if (pozycja === -1) return znak
  return ALFABET[(pozycja + przesuniecie) % ALFABET.length]
}

function Okienko({ litera, przesuniecie, zaszyfrowane }) {
  const widocznaLitera = zaszyfrowane ? szyfrujZnak(litera, przesuniecie) : litera

  return (
    <span>{widocznaLitera}</span>
  )
}

function App() {
  const [tekst, setTekst] = useState('')
  const [przesuniecie, setPrzesuniecie] = useState(1)
  const [liczbaZaszyfrowanych, setLiczbaZaszyfrowanych] = useState(0)

  const litery = [...tekst].filter((znak) => ALFABET.includes(znak))

  function zmienTekst(event) {
    setTekst(event.target.value.toUpperCase())
    setLiczbaZaszyfrowanych(0)
  }

  function zmienPrzesuniecie(event) {
    setPrzesuniecie(Number(event.target.value))
    setLiczbaZaszyfrowanych(0)
  }

  return (
    <main>
      <h1>Szyfr Cezara</h1>

      <label>
       
        <input type="text" value={tekst} onChange={zmienTekst} placeholder="Wpisz tekst..." />
      </label>

      <label>
         {przesuniecie}
        <input type="range" min="1" max="25" value={przesuniecie} onChange={zmienPrzesuniecie} />
      </label>

      <div className="okienka">
        {litery.map((litera, index) => (
          <Okienko key={index} litera={litera} przesuniecie={przesuniecie}
            zaszyfrowane={index < liczbaZaszyfrowanych} />
        ))}
      </div>

      <button onClick={() => setLiczbaZaszyfrowanych((liczba) => liczba + 1)}
        disabled={liczbaZaszyfrowanych === litery.length}>
        Następna litera
      </button>

    </main>
  )
}

export default App
