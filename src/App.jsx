import { useState } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import './frame.css';

function App() {
  const [location, setLocation] = useState('Click button to fetch location');
  const [asyncData, setAsyncData] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  // geolocation
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
        },
        () => {
          setLocation('Geolocation not supported or permission denied.');
        }
      );
    } else {
      setLocation('Geolocation is not supported by this browser.');
    }
  };

  // fetching async data
  const fetchAsyncData = async () => {
    try {
      setAsyncData({ loading: 'Fetching data...' });
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAsyncData(response.data.slice(0, 3));
    } catch (error) {
      setAsyncData({ error: 'Failed to fetch data' });
      console.error('Error fetching ', error);
    }
  };

  // XML to JSON converter
  const convertXMLtoJSON = () => {
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
  <students>
    <student id="1">
      <name>Steve Jobs</name>
      <grade>A</grade>
      <age>20</age>
    </student>
    <student id="2">
      <name>Tom Cruise</name>
      <grade>B</grade>
      <age>21</age>
    </student>
  </students>`;
    
    try {
      // DOMParser
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      const students = xmlDoc.getElementsByTagName('student');
      const result = {
        students: {
          student: []
        }
      };
      
      for (let i = 0; i < students.length; i++) {
        const student = students[i];
        result.students.student.push({
          id: student.getAttribute('id'),
          name: student.getElementsByTagName('name')[0].textContent,
          grade: student.getElementsByTagName('grade')[0].textContent,
          age: student.getElementsByTagName('age')[0].textContent
        });
      }
      
      console.log('Converted to JSON:', result);
      setJsonData(result);
    } catch (error) {
      console.error('Conversion error:', error);
      setJsonData({ error: 'Failed to parse XML' });
    }
  };


  // output
  return (
    <div className="main-container">
      <h1 className="page-heading">Web Technology Showcase</h1>
      
      <div className="boxes-container">
        
        {/* Box 1: HTML5 Multimedia */}
        <div className="section-box">
          <h2>HTML5 Multimedia</h2>
          <video width="100%" controls>
            <source src="228847_tiny.mp4" type="video/mp4" />
            Your browser does not support video.
          </video>
          <audio controls style={{ width: '100%', marginTop: '10px' }}>
            <source src="kansas-blues-blues-rock-instrumental-259874.mp3" type="audio/mpeg" />
            Your browser does not support audio.
          </audio>
        </div>

        {/* Box 2: Geolocation */}
        <div className="section-box">
          <h2>Geolocation</h2>
          <button className="fetch-button" onClick={fetchLocation}>
            Fetch Location
          </button>
          <p>{location}</p>
        </div>

        {/* Box 3: Async Data */}
        <div className="section-box">
          <h2>Async Data</h2>
          <button className="fetch-button" onClick={fetchAsyncData}>
            Fetch Data
          </button>
          {/* Display as markdown-style text */}
          {asyncData ? (
            <div style={{ textAlign: 'left', marginTop: '10px' }}>
              {Array.isArray(asyncData) && asyncData.map((post) => (
                <div key={post.id} style={{ marginBottom: '20px' }}>
                  {/* Simulate heading */}
                  <h3 style={{ marginBottom: '5px', fontWeight: 'bold' }}>{post.title}</h3>
                  {/* Simple paragraph */}
                  <p>{post.body}</p>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <p>Click button to fetch data</p>
          )}
        </div>


        {/* Box 4: XML to JSON */}
        <div className="section-box">
          <h2>XML to JSON</h2>
          <button className="fetch-button" onClick={convertXMLtoJSON}>
            Convert
          </button>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
