import React, { useState } from 'react';
import axios from 'axios';

function SolarAnlageBerechnen() {
  const [inputData, setInputData] = useState({
    strasse: '',
    hausnummer: '',
    plz: '',
    stadt: '',
    land: '',
    leistung: '',
    bundesland: '',
  });

  const [ergebnis, setErgebnis] = useState(null);
  const [fehler, setFehler] = useState(null);
  const endpoint = 'http://localhost:8080/rest/solarapi'
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErgebnis(null);
    setFehler(null);

    try {
      const response = await axios.post(endpoint, inputData);
      setErgebnis(response.data);
    } catch (error) {
      setFehler('Fehler beim Abrufen der Daten');
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Leistung der Solaranlage berechnen</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="strasse" className="form-label">
            Straße:
          </label>
          <input
            type="text"
            name="strasse"
            value={inputData.strasse}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hausnummer" className="form-label">
            Hausnummer:
          </label>
          <input
            type="text"
            name="hausnummer"
            value={inputData.hausnummer}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="plz" className="form-label">
            PLZ:
          </label>
          <input
            type="text"
            name="plz"
            value={inputData.plz}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stadt" className="form-label">
            Stadt:
          </label>
          <input
            type="text"
            name="stadt"
            value={inputData.stadt}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="land" className="form-label">
            Land:
          </label>
          <input
            type="text"
            name="land"
            value={inputData.land}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="leistung" className="form-label">
            Leistung der Solaranlage:
          </label>
          <input
            type="text"
            name="leistung"
            value={inputData.leistung}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bundesland" className="form-label">
            Bundesland:
          </label>
          <input
            type="text"
            name="bundesland"
            value={inputData.bundesland}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Berechnen
        </button>
      </form>
      {ergebnis && <p className="mt-3">Leistung der Solaranlage: {ergebnis} Wh</p>}
      {fehler && <p className="text-danger mt-3">{fehler}</p>}
    </div>
  );
}

export default SolarAnlageBerechnen;
