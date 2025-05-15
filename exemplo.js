import



    function name() {
        return
    }

//variavel teste recebe um função vazia 
const teste = () => {
    return (
        <>

        </>
    )
}

//onchange/onclick so funciona se a variavel for definida como " = useState('') "
const teste2 = () => {

    //variavel para ser usada no return
    var [getText, setText] = useState('')

    return (
        <>
        //onchange so funciona depois de clicar
            <input type="text" onChange={(e) => setText(e.target.value)} />
            <input type="button" />
        </>
    )
}



//setproduto funciona quando clicar no botão
//getproduto executa assim que entrar na tela
const teste3 = () => {
    //variavel para ser usada no return
    var [getProduto, setProduto] = useState('')

    return (
        <>
            <input type="text" onChange={(e) => setProduto(e.target.value)} value={getProduto}/>
            <input type="button"/>
        </>
    )
}



const Tela = () => {
    var [produto, setProduto] = useState('')


    

    return (
        <>
            <input type="text" onChange={(e) => setProduto(e.target.value)} value={produto}/>
            <input type="button"/>
        </>
    )
}

