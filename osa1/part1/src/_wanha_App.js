const Hello = ({ name, age }) => {
  
  const bornYear = () => new Date().getFullYear() - age;
  //ylläoleva toisella tavalla: 
  /* 
  const bornYear = () => {
    return new Date().getFullYear() - age
  }
  */
  
  return (
    <div>
      <p>
        Hello {name}, you are <b>{age}</b> years old!
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="https://github.com/mluukkai"> mluukkai</a>
    </div>
  )
}

const App = () => {
  const nimi = 'Simppa'
  const ika = 33
  return (
    <div>
    
      <h1>Greetings!</h1>
      <Hello name="Timppa" age={2690 + 10} />
      <Hello name={nimi} age={ika} />
      <Footer />
    
    </div>
  )
}
export default App