import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Game = () => (
    <Container className="mt-top">
    <div>
        <h3>Game</h3>
    </div>
    </Container>

);

const INITIAL_STATE = {
    vtBorder: '',
    vtCounties: '',
    modalVisible: false,
    origView: {
        lat: 43.9000,
        lon: -72.7317,
    },
    markerPoint: {
        lat: 43.9886,
        lon: -72.7317,
    },
    mapZoom: 8,
    score: 100,
    moveArray: [],
    userName: '',
    infoBar: "Press Start to play!",
    gameStore: {
        userName: '',
        moveArray: '',
        gameScore: '',
    }
}

class GamePage extends Component {
    constructor(props){
        super(props);

    this.state = {
        //gets border data from border file
        vtBorder: borderData,
        //gets county data from counties file
        vtCounties: countyData,
        //move array
        
        //modal visible
        modalVisible: false,
        //origin lat-lon
        origView: {
            lat: 43.9000,
            lon: -72.7317,
        },
        //origin marker
        markerPoint: {
            lat: 43.9886,
            lon: -72.7317,
        },
        //map zoom set
        mapZoom: 8,
        //start state
        gameStart: false,
        //player score
        score: 100,
        moveArray: [],
        infoBar: "Press Start Game to Play!"
    }}
//generate random latitude and longitude for marker
getRandomLat() {
    let lat = (Math.random() * (45.005419 - 42.730315) + 42.730315)
    return lat;
}

getRandomLon() {
    let lon = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1;
    return lon;
}

//sets the game state on click of start button
startHandler = async () => {
    let randLat = this.getRandomLat();
    let randLon = this.getRandomLon();
    //sets point that player will guess
    let layerArray = leafletPip.pointInLayer([randLon, randLat], L.geoJSON(borderData));

    // checks that point is within borders of Vermont
    while (layerArray.length === 0) {
        randLat = this.getRandomLat();
        randLon = this.getRandomLon();

        layerArray = leafletPip.pointInLayer([randLon, randLat], L.geoJSON(borderData))
    }
    //fetches county and town of the point's lat/lon

    let randArray = [randLat, randLon]
    const { moveArray } = this.state
    const newMoves = moveArray.concat(randArray)
    
    //reverse lookup of lat lon to find county and town data
    let nomData = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${randLat}&lon=${randLon}&format=json`)
        .then(res => res.json())
        .then(result => {

            return (result)

        })

    //sets county for victory message
    let nomCounty = nomData.address.county

    //runs through potential keys for town
    let nomTown;
    if ('town' in nomData.address) {
        nomTown = nomData.address.town
    } else if ('city' in nomData.address) {
        nomTown = nomData.address.city
    } else if ('village' in nomData.address) {
        nomTown = nomData.address.village
    } else if ('hamlet' in nomData.address) {
        nomTown = nomData.address.hamlet
    } else { nomTown = "Unavailable" }

    //sets initial state for game start
    this.setState({
        gameStart: true,
        origView: {
            lat: randLat,
            lon: randLon
        },

        markerPoint: {
            lat: randLat,
            lon: randLon
        },

        mapZoom: 18,
        locTown: nomTown,
        locCounty: nomCounty,
        moveArray: [newMoves], //sets array to track moves
        infoBar: "Try to Guess Which County You're In!"
        
    })
    
}

//handles score change, and will generate county list popup 
guessHandler = () => {
    this.setState({
        modalVisible: true,    
    })
}

//handles quit game; resets conditions to original condition
quitHandler = () => {
    this.setState({
        gameStart: false,
        origView: {
            lat: 44.0886,
            lon: -72.7317,
        },
        //map zoom 
        mapZoom: 8,
        moveArray: [],
        infoBar: `Tough Luck! You were in ${this.state.locCounty}.`
    })
}



}

export default Game;