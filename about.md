## Goals

Power Comp is a competition management system for Powerlifting. It was designed around the following goals:

- Can be run completely offline.
- Can run be reused across multiple meets.
- Can use multiple platforms in parallel.
- Single computer to run everything.
- Referee controller support.
- Multi monitor capability.
- Remotely accessible, with any modern browser.
- Open API, anyone should be able to study and use the API with ease.

## How it works

Power Comp is a client/server based software, meaning only one PC is needed to actually run the server and may be accessed by any device/computer on the same network with a modern browser.

More about this [here](access).

## FAQ

**Which operating systems does the program support?**

Currently executeables are only built for Windows but you can run the application via [docker](https://docs.docker.com/get-docker/), see [docker hub](https://hub.docker.com/repository/docker/jesperdahlgren/power-comp) for more info on the image. It is also possible to download the source and compile it for Linux and MacOS. The server can however always be accessed via any modern browser on devices that are on the same network.

**Is it open source?**

Yes! It can be found at [https://github.com/J-Dahlgren/Power-Comp](https://github.com/J-Dahlgren/Power-Comp) and is MIT licensed

**Which federations does it support?**

Only IPF.

**Will more federations be supported in the future?**

Could happen, but it is currently not a priority.

**Can I try it without downloading/installing?**

Yes! Go to the **[demo](http://pcms2.dahlgren.tech/)** and try the software. It is updated/reloaded once every week.

**What languages are supported?**

In web app:

- English
- Swedish

Templates only support english for now, but translations are coming.

**An open API was mentioned, where can I find this information?**

Go to **[demo/docs](http://pcms2.dahlgren.tech/docs)**.
