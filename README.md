# TAIM (Frontend)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

TAIM is an educational game for learning gardening basics. This is the frontend part of the project designed to work with the backend part. 

Instructions are for Windows computer and Android phone.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## Prerequisites

[Visual Studio Code](https://code.visualstudio.com/)

[Node LTS 64-bit](https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi)

Install Linux on Windows (WSL 2) via your terminal:

```wsl --install```

Or if it does not install automatically follow [this](https://learn.microsoft.com/en-us/windows/wsl/install).

[Docker Desktop on Windows](https://docs.docker.com/desktop/install/windows-install/) (use WSL2)

Install extensions for VS Code:


* dsznajder.es7-react-js-snippets
* dbaeumer.vscode-eslint
* eamodio.gitlens
* GraphQL.vscode-graphql
* GraphQL.vscode-graphql-syntax
* esbenp.prettier-vscode
* Prisma.prisma

[Set up the development environment](https://reactnative.dev/docs/environment-setup?guide=native)

## Installation

```npm i```

Create .env.development file and add:

```GRAPHQL_URL=http://[YOUR_IP_ADDRESS]:4000/graphql```

## Usage

Make sure Docker is running.

* Create a virtual device in Android Studio and start it up. Instructions [Set up the development environment](https://reactnative.dev/docs/environment-setup?guide=native)
OR
* Use the Expo app on your smartphone and connect it to your development computer via USB. Follow instructions [here](https://reactnative.dev/docs/running-on-device).

```npm start```

## Contributing

Guidelines for contributing to your project.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- Email: your-email@example.com
- GitHub: [Your GitHub Username](https://github.com/your-username)
