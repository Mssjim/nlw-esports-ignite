interface ButtonProps{
  title: string;

}

function Button(props: ButtonProps){
  return(
    <button>
      {props.title}
    </button>
  )
}

function App() {
 return(
  <div>
    <Button title="Enviar 1"/>
    <Button title="Enviar 2"/>
    <Button title="Enviar 3"/>
   
  </div>
 )
}

export default App
