import './StartScreen.css'

const StartScreen = ({startGame}) => {
    return(
        <div className='start'>
            <h1>Palavra Secreta</h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <button className='btnStart' onClick={startGame}>Começar o jogo</button>
        </div>
    )
}

export default StartScreen