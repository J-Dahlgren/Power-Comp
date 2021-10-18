## Windows

### Prerequisites

- A PC with Windows 7 or newer version.
- Full administrator rights.

### Steps

- **Windows installer:** Get the latest installation file called `powercomp-setup.exe` at https://github.com/J-Dahlgren/Power-Comp/releases/latest in the assets section.

  - The browser may warn against downloading the file, download/keep anyway.

- Run the installer by double-clicking it.

  - You may get a warning about the software because it isn't signed with a certificate, run anyway.

- The installer will prompt you for an install location. The default is usually correct.

- If selected, a shortcut is created on your desktop. Double click it to start the server.
  - A console window should open up, this means everything is up and running.

## Configuration

To configure the application, go to the install location.
There will be a file that is called "power-comp.env", you can modify the following environment variables in it:

**NOTE:** The application need to be restarted for any changes to take effect.

### `PORT`

Which port the server is accessible on.

All clients need to "refresh" with the new port number if changed

Default is `80`

### `STORAGE_PATH`

Folder where application data is stored.

Defaults to `<home directory>/power-comp` which on Windows 10 usually is `C:\Users\<USERNAME>\power-comp`

If the default is used along with the default installation path, all application files will reside in the same folder (`C:\Users\<USERNAME>\power-comp`)

### `DATABASE_NAME`

If you want to have a playground with a prepopulated temporary database, set the variable `DATABASE_NAME = ":memory:"`. This will give you an environment similar to the demo site.

The database file will be stored at `<STORAGE_PATH>/<DATABASE_NAME>`

Default is `db/power-comp.sqlite` i.e. `<STORAGE_PATH>/db/power-comp.sqlite`

### `LOG_LEVEL`

Choose between `"ERROR"`, `"WARN"`,`"INFO"`,`"DEBUG"`,`"TRACE"`.

Default is `"INFO"`

### `PASSWORD`

Setting the password is completly optional and is usually not needed when run on a private network, e.g., behind your own router that you control access to.

If the password is not set, the application data can be edited by anyone that has access to the server.

Power Comp uses something called [JSON Web Token (JWT)](https://jwt.io/introduction) to secure itself.
Securing the application can be done with two variables:

- `PASSWORD`
- `JWT_SECRET` (optional)

If the application is hosted and accessible from anywhere in the world, it is recommended to set
`JWT_SECRET = "s0m3-l0ng-@nd-compl!cted-5ecr3t"` and serving the application over HTTPS. Nobody is ever required to enter this secret anywhere.

If `JWT_SECRET` is not set, `PASSWORD` will be used as `JWT_SECRET` making the application less secure as anyone with the password can issue JWTs unhindered.

### `LANGUAGE_RESTRICTION`

It is possible to restrict client language to a single one and removes the ability to change it.

Available languages are: `"en"` (english) and `"sv"` (svenska).
