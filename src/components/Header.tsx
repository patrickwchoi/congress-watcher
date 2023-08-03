

const Header = () => {

  const handleHome = () => {
    window.location.href = '/';
  }
  return (
    <div className="header flex flex-row w-full py-4 mb-4 bg-blue-100 justify-center">
      <div className="header-content w-4/5 flex flex-row">
        <div className="logo flex flex-col cursor-pointer w-fit" onClick={handleHome}>
          <h2>Congress Watcher</h2>
          {/* <h2>Watcher</h2> */}
        </div>
        {/* more content in header goes here */}
      </div>
    </div>
  )
}

export default Header;