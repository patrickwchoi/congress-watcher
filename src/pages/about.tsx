const AboutPage = () => {
  return (
    <div className="AboutPage flex flex-row">
      <div className="About-Left flex flex-col items-center p-8 bg-gray-100 w-full h-full">
        <h1 className="text-4xl font-bold mb-6">About</h1>
        <div className="mb-4 w-full max-w-2xl bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Purpose</h2>
          <p className="mb-4">
            I made this website to provide users with a straightforward method of tracking news related to the United States Congress.
          </p>
          <p>
            The data used in this site is primarily sourced from ProPublica's Congress API
            <a href="https://projects.propublica.org/api-docs/congress-api/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
              (Visit ProPublica)
            </a>.
          </p>
        </div>
        <div className="mb-4 w-full max-w-2xl bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Future Enhancements</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2">Adding a DB for users to create accounts and follow politicians, states, and bills.</li>
            <li>Introducing more details such as politician spending, committees, and more. Some of these may need extra APIs.</li>
          </ul>
        </div>
        <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2">Next.js with Typescript</li>
            <li className="mb-2">Tailwind.css</li>
          </ul>
          <p>This site uses Server Side Rendering to fetch data from the ProPublica API. Congress members are fetched during build time, while more recent activities like bills are fetched when necessary</p>
        </div>
      </div>
      <div className="About-Right w-1/4">
        <div>
          <h2>About Me</h2>
        </div>
      </div>
    </div>
  )
}

export default AboutPage;
