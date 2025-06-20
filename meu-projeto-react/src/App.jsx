"use client"

import { useState } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Badge } from "./components/ui/badge"
import { Shuffle, History, Trash2, Gamepad2 } from "./components/ui/icons"

export default function RaffleGenerator() {
  const [minNumber, setMinNumber] = useState(1)
  const [maxNumber, setMaxNumber] = useState(50)
  const [numbersPerGame, setNumbersPerGame] = useState(5)
  const [totalGames, setTotalGames] = useState(2)
  const [currentGameSet, setCurrentGameSet] = useState(null)
  const [history, setHistory] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateUniqueNumbers = (min, max, count) => {
    const availableNumbers = Array.from({ length: max - min + 1 }, (_, i) => min + i)
    const selectedNumbers = []

    for (let i = 0; i < count && availableNumbers.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length)
      selectedNumbers.push(availableNumbers[randomIndex])
      availableNumbers.splice(randomIndex, 1)
    }

    return selectedNumbers.sort((a, b) => a - b)
  }

  const generateGames = () => {
    const rangeSize = maxNumber - minNumber + 1

    if (rangeSize < numbersPerGame) {
      alert(`Not enough numbers in range! You need at least ${numbersPerGame} numbers in your range.`)
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      const games = []

      for (let i = 0; i < totalGames; i++) {
        const numbers = generateUniqueNumbers(minNumber, maxNumber, numbersPerGame)
        games.push({
          id: i + 1,
          numbers,
          timestamp: new Date(),
        })
      }

      const newGameSet = {
        id: Date.now(),
        games,
        settings: {
          minNumber,
          maxNumber,
          numbersPerGame,
          totalGames,
        },
        timestamp: new Date(),
      }

      setCurrentGameSet(newGameSet)
      setHistory((prev) => [newGameSet, ...prev.slice(0, 4)]) // Keep last 5 game sets
      setIsGenerating(false)
    }, 800)
  }

  const clearHistory = () => {
    setHistory([])
    setCurrentGameSet(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">GeNumeros</h1>
            <p className="text-slate-600">Gere seus números da sorte para o sorteio</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Generator Settings Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-slate-800">Configuração</CardTitle>
              <CardDescription className="text-slate-600">Configure seu jogo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Number Range */}
              <div className="space-y-4">
                <Label className="text-slate-700 font-medium text-base">Intervalo</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="min" className="text-sm text-slate-600">
                      Mínimo
                    </Label>
                    <Input
                      id="min"
                      type="number"
                      value={minNumber}
                      onChange={(e) => setMinNumber(Number.parseInt(e.target.value) || 1)}
                      className="bg-white/80 border-slate-300 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max" className="text-sm text-slate-600">
                      Máximo
                    </Label>
                    <Input
                      id="max"
                      type="number"
                      value={maxNumber}
                      onChange={(e) => setMaxNumber(Number.parseInt(e.target.value) || 50)}
                      className="bg-white/80 border-slate-300 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                </div>
              </div>

              {/* Game Configuration */}
              <div className="space-y-4">
                <Label className="text-slate-700 font-medium text-base">Configuração do jogo</Label>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="numbersPerGame" className="text-sm text-slate-600">
                      Números por jogo
                    </Label>
                    <Input
                      id="numbersPerGame"
                      type="number"
                      min="1"
                      value={numbersPerGame}
                      onChange={(e) => setNumbersPerGame(Number.parseInt(e.target.value) || 5)}
                      className="bg-white/80 border-slate-300 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalGames" className="text-sm text-slate-600">
                      Número de jogos
                    </Label>
                    <Input
                      id="totalGames"
                      type="number"
                      min="1"
                      max="10"
                      value={totalGames}
                      onChange={(e) => setTotalGames(Number.parseInt(e.target.value) || 2)}
                      className="bg-white/80 border-slate-300 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateGames}
                disabled={isGenerating || minNumber >= maxNumber || maxNumber - minNumber + 1 < numbersPerGame}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 text-lg shadow-lg transition-all duration-200"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gerando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shuffle className="w-5 h-5" />
                    Gerar jogos
                  </div>
                )}
              </Button>

              {/* Info */}
              <div className="text-xs text-slate-500 bg-slate-50/50 p-3 rounded-lg">
                <p className="font-medium mb-1">Nota:</p>
                <p>
                  Cada jogo vai ter {numbersPerGame} números unicos. O intervalo deve ter pelo menos {numbersPerGame}{" "}
                  números.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Current Games Display */}
          <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5" />
                Jogos gerados
              </CardTitle>
              <CardDescription className="text-slate-600">
                {currentGameSet
                  ? `${currentGameSet.games.length} jogos com ${currentGameSet.settings.numbersPerGame} números cada`
                  : "Seus jogos aparecerão aqui"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!currentGameSet ? (
                <div className="text-center py-16 text-slate-500">
                  <Gamepad2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg mb-2">Nenhum jogo gerado ainda</p>
                  <p className="text-sm">Configure agora e gere seu primeiro jogo</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentGameSet.games.map((game) => (
                    <div key={game.id} className="p-4 bg-white/60 rounded-lg border border-slate-200/50">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 font-semibold"
                        >
                          Jogo {game.id}
                        </Badge>
                        <span className="text-sm text-slate-500">{game.numbers.length} números</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {game.numbers.map((number, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                          >
                            {number}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <Card className="mt-8 bg-white/50 backdrop-blur-sm border-slate-200/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Jogos recentes
                  </CardTitle>
                  <CardDescription className="text-slate-600">Seus ultimos 5 jogos gerados</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearHistory}
                  className="bg-white/80 border-slate-300 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {history.map((gameSet, index) => (
                  <div
                    key={gameSet.id}
                    className="p-4 bg-white/40 rounded-lg border border-slate-200/30 cursor-pointer hover:bg-white/60 transition-colors"
                    onClick={() => setCurrentGameSet(gameSet)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-white/60">
                        Set #{index + 1}
                      </Badge>
                      <span className="text-xs text-slate-500">{gameSet.timestamp.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">{gameSet.games.length} jogos</span> •
                      <span className="ml-1">{gameSet.settings.numbersPerGame} números cada</span> •
                      <span className="ml-1">
                        Intervalo: {gameSet.settings.minNumber}-{gameSet.settings.maxNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
