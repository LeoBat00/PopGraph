import { useState } from 'react'
import './App.css'
import GraphFlow from './components/GraphFlow'
import verticeService from './services/verticeService'
import arestaService from './services/arestaService'


function App() {

  console.log("All vertices",verticeService.getAllVertices())
  console.log("All arestas", arestaService.getAllArestas())
  return (
    <div className="containerGeral">
          <GraphFlow />
    </div>
  )
}

export default App
