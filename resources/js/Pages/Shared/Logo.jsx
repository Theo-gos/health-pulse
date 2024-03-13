import logo from '../../Assets/imgs/logo.svg'

export default function Logo({ width = '50px'}) {
    return (
        <img src={logo} width={width} />
    )
}