# Web Of Things

## Steps to run the project.
### 1. Prepare the board as per the fritizing diagram.
![Fritizing](/Fritizing.png)

### 2. Upload [PingFirmata](https://gist.githubusercontent.com/rwaldron/0519fcd5c48bfe43b827/raw/f17fb09b92ed04722953823d9416649ff380c35b/PingFirmata.ino) to the arduino uno 3 board.
### 3. Clone the repo and cd into server dir. 
```console 
cd server
```
### 4. Install the necessary dependencies.
```console
npm i
```

### 5. Run the project
```console
npm run start
```

### 6. Navigate to `localhost:3000` on a browser to view the dashboard.