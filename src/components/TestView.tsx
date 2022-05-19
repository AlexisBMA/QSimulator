import MM1 from '../stats/simulators/MM1'
import MMs from '../stats/simulators/MMs'
import MMsK from '../stats/simulators/MMsK'

type Props = {}

export default function TestView({ }: Props) {
    function testMM1(){
        console.log(MM1({tasaLlegadas: 2, tasaServicios: 3}))
    }

    function testMMs(){
        console.log(MMs({tasaLlegadas: 2, tasaServicios: 3, servidores: 2}))
    }

    function testMMsK(){
        console.log(MMsK({tasaLlegadas: 2, tasaServicios: 3, servidores: 1, maxClientes: 3}))
    }

    return (
        <div style={{display:'flex', textAlign:'center', justifyContent:'center', padding:'40px'}}>
            <button onClick={testMM1}>TestMM1</button>
            <button onClick={testMMs}>TestMMs</button>
            <button onClick={testMMsK}>TestMMsK</button>
        </div>
    )
}