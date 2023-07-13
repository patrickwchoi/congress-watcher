## Politicians Branch:
- add content, more api calls to specific member page
 - voting history:
  - fetch first 20 inside getServerProps, then in my component, fetch the rest using useEffect and next's fetch, like the old way.
- format, then css
- add lookup politicians feature somewhere
- add lookup all politicians and politicians by state somewhere

## Bills Branch:
- refactor api calls to use getServerSideProps
- css


## Timeline:
- finish politicians content
- add header
- add sidebar
- combine everything into a homepage, with tabs and links to all relevant content
- css to style and look nice (should be an MVP at this point)
- add database and auth
- add user functionality like following politicians, saving bills, etc. to the database and backend
  - connect to frontend
- Tidy up