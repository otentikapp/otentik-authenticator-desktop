<p align="center"><img src="./banner.svg" width="500" height="150" alt="Project Logo"></p>
<p align="center">
    <a href="https://github.com/riipandi/otentik-authenticator-desktop/pulse">
        <img src="https://img.shields.io/badge/Contributions-welcome-blue.svg?style=flat-square" alt="Contribution welcome">
    </a>
    <a href="https://github.com/riipandi/otentik-authenticator-desktop/releases/tag/latest">
        <img src="https://github.com/riipandi/otentik-authenticator-desktop/actions/workflows/release.yml/badge.svg?branch=main" alt="Release Status">
    </a>
    <a href="https://choosealicense.com/licenses/apache-2.0">
        <img src="https://img.shields.io/github/license/riipandi/otentik-authenticator-desktop?style=flat-square" alt="License">
    </a>
    <a href="https://github.com/sponsors/riipandi">
        <img src="https://img.shields.io/static/v1?color=26B643&label=Sponsor&message=%E2%9D%A4&logo=GitHub&style=flat-square" alt="Sponsors">
    </a>
</p>

## Introduction

Feeling bothered about having to switch devices when you want to enter an OTP code when logging into a website or service?
Now you can use Otentik Authenticator to manage your OTP code. Otentik is a secure app to manage your 2-step verification (2FA)
tokens for your online services. This app compatible with Google Authenticator.

Watch the [demo video](https://youtu.be/5hPbu7xgFl4) to see how it works.

This project is an Open Source project for contributing to [The Supabase Open Source Hackathon](https://supabase.com/blog/launch-week-5-hackathon).

## Can I use this app?

Is this application finished yet? Yes and no. The main functions (OTP code generator and synchronization) are completed. I want this app to be available
in multi-platform and on mobile devices.

You can download the binary at the [release page](https://github.com/riipandi/otentik-authenticator-desktop/releases).
Currently only supports macOS with Intel chipset. Windows, Linux, and mobile versions are included in the roadmap.

## How was this built?

This app was created during the [Supabase Launch Week 5 Hackathon](https://supabase.com/blog/launch-week-5-hackathon). The idea is based on my personal
problem, everytime I want to log in to a website I have to reach for my phone just to get the OTP code. So I thought that having an application to
manage OTP code that could sync to the desktop would be helpful.

This app uses [Supabase](https://supabase.com/) for storing the collections and authenticating the user. Users can signup and log in using their
email addresses. I have no plan for using social authentication. The sensitive data such as 2FA secret and backup code
are encrypted with [AES256 encryption](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) before storing at
Supabase.

### The complete tech stack:

-   [Supabase](https://supabase.com/): auth and database.
-   [Tauri](https://tauri.app/): for the desktop app.
-   [Rust](https://www.rust-lang.org/): Tauri is using Rust.
-   [TypeScript](https://www.typescriptlang.org/): for type checking.
-   [React](https://reactjs.org/): for the UI frontend library.
-   [Vite](https://vitejs.dev/): for the frontend tooling.
-   [Tailwind CSS](https://tailwindcss.com/): for the styling.
-   [Headless UI](https://headlessui.com/): create interactive UI.

### Why Tauri?

The simple answer is: the binary file size is smaller rather than Electron.

## Quick Start

### Prerequisites

At least you will need `Nodejs >=16` and `Rust >= 1.63` to develop this project, and your favorite IDE or code editor.
Use [rustup](https://rustup.rs/) to install Rust on your machine. Also, if you want to run Supabase instance at your
local machine, you will need `Docker >= 20.10` and [Supabase CLI](https://github.com/supabase/cli).

### Up and Running

Create `.env` file (you can copy from `.env.example`) then fill the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values with yours.

For detailed explanation on how things work, check out [Supabase documentation](https://supabase.com/docs) and
[Tauri documentation](https://tauri.app/v1/guides/) page.

## Roadmaps

-   [ ] Account management
-   [ ] Export & import collections
-   [ ] Offline synchronization
-   [ ] Create mobile version
-   [ ] Create Windows version
-   [ ] Create Linux version

## Security Issue

If you discover any security-related issues, please send an e-mail to [aris@duck.com](mailto:aris@duck.com)
instead of using the issue tracker.

## Contributing

Thank you for considering contributing to this project! If you want to start contributing or discover a security
vulnerability within Otentik Authenticator, please send me a direct message on [Twitter](https://s.id/dmaris).

## Thanks to...

In general, I'd like to thank every single one who open-sources their source code for their effort to contribute
something to the open-source community. Your work means the world! 🌍 ❤️

## Maintainers

Currently, Aris Ripandi ([@riipandi](https://twitter.com/riipandi)) is the only maintainer.

## License

This project is open-sourced software licensed under the [Apache License 2.0][choosealicense].

Copyrights in this project are retained by their contributors.

See the [license file](./LICENSE) for more information.

[choosealicense]: https://choosealicense.com/licenses/apache-2.0/
