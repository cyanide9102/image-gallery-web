import React, { Component } from 'react';

import * as imageService from '../services/imageService';

class UploadImage extends Component {
  defaultImgSrc = 'https://dummyimage.com/192x108/000/fff.png';

  state = {
    imgName: '',
    imgSrc: this.defaultImgSrc,
    imgFile: null,
    validations: {},
  };

  componentDidMount() {
    this.setState({ imgName: '', imgSrc: this.defaultImgSrc, imgFile: null, validations: {} });
  }

  validateInputs = () => {
    let validations = {
      imgName: this.state.imgName === '' || this.state.imgName.length > 256 ? false : true,
      imgSrc: this.state.imgSrc === this.defaultImgSrc ? false : true,
    };

    this.setState({ validations: validations });

    return Object.values(validations).every((x) => x === true);
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!!this.validateInputs()) {
      const formData = new FormData();
      formData.append('name', this.state.imgName);
      formData.append('imageFile', this.state.imgFile);

      var response = await imageService.addImage(formData);
      if (!!response.ok) {
        window.location.href = '/';
      }
    }
  };

  handleImgNameChange = (e) => {
    this.setState({ imgName: e.target.value });
  };

  handleBackButton = () => {
    window.location.href = '/';
  };

  showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        this.setState({ imgFile: imgFile, imgSrc: x.target.result });
      };
      reader.readAsDataURL(imgFile);
    } else {
      this.setState({ imgFile: null, imgSrc: this.defaultImgSrc });
    }
  };

  applyErrorCssClass = (field) => (field in this.state.validations && this.state.validations[field] === false ? ' invalid-field' : '');

  render() {
    return (
      <main className="container my-3">
        <div className="row">
          <div className="col-lg-4 col-md-6 mx-auto">
            <form autoComplete="off" noValidate onSubmit={this.handleFormSubmit}>
              <div className="card">
                <img src={this.state.imgSrc} alt={this.state.imgName} className="card-img-top" />
                <div className="card-body">
                  <div className="mb-3">
                    <input type="file" accept="image/*" className={'form-control form-control-sm' + this.applyErrorCssClass('imgSrc')} onChange={this.showPreview} />
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className={'form-control' + this.applyErrorCssClass('imgName')} id="imgName" placeholder="Name" value={this.state.imgName} onChange={this.handleImgNameChange} />
                    <label htmlFor="imgName">Name</label>
                  </div>
                  <div className="text-end">
                    <button type="button" className="btn btn-secondary me-1" onClick={this.handleBackButton}>
                      Back to Gallery
                    </button>
                    <button type="submit" className="btn btn-success">
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default UploadImage;
