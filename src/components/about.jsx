import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <main className="container my-3">
        <h1>About</h1>
        <p>
          Project developed for demonstration purpose.
          <br />
          <a href="https://www.linkedin.com/in/muhammad-danish-malik/" className="text-decoration-none">
            My LinkedIn Profile
          </a>
        </p>
      </main>
    );
  }
}

export default About;
