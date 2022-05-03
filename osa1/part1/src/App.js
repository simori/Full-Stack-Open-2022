const Hello = (props) => {
  //console.log("aaa");
  return (
    <div>
      <p>
        Hello {props.name}, you are <b>{props.age}</b> years old
      </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  )
}

const App = () => {
  const nimi = 'Simppa'
  const ika = 102
  //console.log("ddd");
  return (
    <>
    
      <h1>Greetings</h1>
      <Hello name="Timppa" age={269 + 10} />
      <Hello name={nimi} age={ika} />
      <Footer />
    
    </>
  )
}
export default App