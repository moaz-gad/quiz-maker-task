import logo from "../assets/crocusoft-log.jpg"
const Header = () => {
  return (
    <header className="bg-white p-5">
      <nav className="flex justify-center">
        <div className="header-info flex flex-col items-center">
          <img src={logo} alt="croco-soft-logo" style={{ width: 50 }} />
          <p className="text-lg">Quiz Maker</p>
        </div>
      </nav>
    </header>
  )
}
export default Header
