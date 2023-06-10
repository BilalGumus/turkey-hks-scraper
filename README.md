# Turkey HKS Web Scraper Tool

This desktop application was developed as an interface to the terminal application previously developed with [Nodejs](https://nodejs.org/) & [Puppeteer](https://pptr.dev/) (All server code available in "/server" folder). With [Tauri](https://tauri.app/), this application was implemented as "sidecar" and an interface was developed with [React](https://react.dev/).

All data source is obtained from http://www.hal.gov.tr/ and it enables to scrape the data collectively and convert it into JSON and CSV format thanks to this application. 

**Has been developed for educational purposes only.**

![gif](https://github.com/BilalGumus/turkey-hks-scraper/assets/57847805/ff6db2c3-bd3f-40b5-81bc-c0e90cbf06ac)

## Technologies Used

- Tauri & Tauri API & React in Vite
- Puppeteer & Fastify
- TailwindCSS & Flowbite

## Installation

### Prerequisites
  - Make sure you already have installed [Nodejs](https://nodejs.org/) on your computer.
  - Follow Tauri development prerequisites on [here](https://tauri.app/v1/guides/getting-started/prerequisites) & install Rust and system dependencies.

### Run on Local

1. Clone the repository:

```bash
   git clone https://github.com/BilalGumus/turkey-hks-scraper.git
```

2. Navigate to the project directory:

```bash
  cd ./turkey-hks-scraper
```

3. Install the dependencies:

```bash
  npm install
```

4. Install the server  dependencies:
```bash
  cd ./server && npm install
```

*Important Note:* This application runs with binaries so you have to locate server executable file into **/src-tauri/binaries/** path. (for detailed information please check [here](https://tauri.app/v1/guides/building/sidecar/#__docusaurus_skipToContent_fallback).)

- To create excecutable file i recommend [pkg](https://www.npmjs.com/package/pkg) package. First install pkg globally with npm and navigate to server folder and create excecutable files:

```bash
  npm i -g pkg && pkg --public index.js
```

- Then move excecutable file into "/src-tauri/binaries/" folder and rename file. To find how to rename executable file open a new terminal and run `rustup show` to find your host name. Then add **scraping-server-** prefix to file name. 
  - e.g. Windows: **scraping-server-x86_64-pc-windows-msvc.exe**

7. Start the desktop application (or simply run on the browser with `npm run dev`):

```bash
  npm run tauri dev
```

The application will open automatically.

## Contributing
Contributions are welcome! If you find any bugs or want to improve the application, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
