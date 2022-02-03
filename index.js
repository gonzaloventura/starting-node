const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const express = require("express");
const app = express();

app.use(express.json());

puerto = 3001;

let marcadores = [
      {
        "appkey": "a1",
        "latitude": 40.416875,
        "longitude": -3.703308,
        "city": "Madrid",
        "description": "Puerta del Sol"
      },
      {
        "appkey": "b2",
        "latitude": 40.417438,
        "longitude": -3.693363,
        "city": "Madrid",
        "description": "Paseo del Prado"
      },
      {
        "appkey": "c3",
        "latitude": 40.407015,
        "longitude": -3.691163,
        "city": "Madrid",
        "description": "Estación de Atocha"
        },
];

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})

app.get("/", (req, res) => {
    res.send("<h1>Hola mundo</h1>");
});

app.get("/api/marcadores/:appkey", (req, res) => {
    const appkey = req.params.appkey;
    const marcador = marcadores.find(marcador => marcador.appkey === appkey);

    if(marcador){
        res.json(marcador);
    }else{
        res.status(404).end();
    }
});

app.delete("/api/marcadores/:appkey", (req, res) => {
    const appkey = req.params.appkey;
    marcadores = marcadores.filter(marcador => marcador.appkey !== appkey);
    res.status(204).end();
});

app.get("/api/marcadores", (req, res) => {
    res.json(marcadores);
});

app.post("/api/marcadores/:appkey", (req, res) => {
    const marcador = req.body;
    const nuevoMarcador = {
        appkey: uuidv4(),
        latitude: "123",
        longitude: "321",
        city: "Buenos Aires",
        description: "Capital Argentina"
    }
    marcadores = [...marcadores, nuevoMarcador];
    res.json(nuevoMarcador);
});