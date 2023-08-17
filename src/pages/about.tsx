
const AboutPage = () => {

  const githubLink = "https://github.com/patrickwchoi";
  const linkedInLink = "https://linkedin.com/in/patrickwchoi";

  return (
    <div className="AboutPage flex flex-col p-8 w-11/12 items-center">
      <h1 className="mb-6">About</h1>
      <div className="flex flex-row">
        <section className="content w-3/4 bg-gray-100 p-8 rounded shadow">
          <section className="purpose mb-6">
            <h2 className="mb-4">Purpose</h2>
            <p className="mb-4">
              I made this website to provide users with a straightforward method of tracking news related to the United States Congress.
            </p>
            <p>
              The data used in this site is primarily sourced from ProPublica's Congress API.
              <a href="https://projects.propublica.org/api-docs/congress-api/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                (Visit ProPublica)
              </a>
            </p>
          </section>
          <section className="enhancements mb-6">
            <h2 className="mb-4">Future Enhancements</h2>
            <ul className="list-disc pl-6">
              <li className="mb-2">Adding a DB for users to create accounts and follow politicians, states, and bills.</li>
              <li>Introducing more details such as politician spending, committees, and more. Some of these may need extra APIs.</li>
            </ul>
          </section>
          <section className="technologies">
            <h2 className="mb-4">Technologies Used</h2>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Next.js with Typescript</li>
              <li className="mb-2">Tailwind.css</li>
            </ul>
            <p>This site uses Server Side Rendering to fetch data from the ProPublica API. Congress members are fetched during build time, while more recent activities like bills are fetched when necessary</p>
          </section>
        </section>
        {/* Sidebar */}
        <section className="sidebar flex flex-col items-center w-1/4 space-y-6">
          <h2 className="mb-2">About Me</h2>
          <div className="links flex space-x-4">
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
            </a>
            <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>
            </a>
          </div>
        </section>
      </div>

    </div>
  )
}

export default AboutPage;
