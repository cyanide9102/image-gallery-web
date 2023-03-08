import React, { Component } from 'react';

import * as imageService from '../services/imageService';

class Gallery extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    this.setState({ images: await imageService.getImages() });
  }

  render() {
    const { images } = this.state;
    const hasImages = !!images && images.length > 0;
    const baseUrl = process.env.REACT_APP_API_URI;

    return (
      <main className="container">
        <div className="my-3 text-end">
          <a href="/upload-image" className="btn btn-outline-secondary text-decoration-none">
            Upload New Image
          </a>
        </div>
        <div className="row">
          {!hasImages && (
            <div className="col-12">
              <p>There are no images to display. Please upload some images first!</p>
            </div>
          )}
          {hasImages &&
            images.map((image) => {
              return (
                <div className="col-lg-3 col-md-4 mb-3" key={image.id}>
                  <div className="card h-100">
                    <img src={`${baseUrl}${image.path}`} alt={image.name} />
                    <div className="card-body">
                      <h5 className="card-title">{image.name}</h5>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    );
  }
}

export default Gallery;
