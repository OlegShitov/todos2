import { Component } from "react";

export default class TodoAdd extends Component {
  constructor(props) {
    super()
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescChange = this.handleDescChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.clearformData()
  }

  clearformData() {
    this.formData = {
      title: '',
      desc: '',
      image: ''
    }
  }
  handleTitleChange(evt) {
    this.formData.title = evt.target.value
  }
  handleDescChange(evt) {
    this.formData.desc = evt.target.value
  }
  handleImageChange(evt) {
    const cFiles = evt.target.files 
    if (cFiles.lengh > 0) {
      const filereader = new FileReader()
      const that = this 
      filereader.onload = () => {
        that.formData.image = filereader.result
      }
      filereader.readAsDataURL(cFiles[0])
    } else {
      this.formData.image = ''
    }
  }
  handleFormSubmit(evt) {
    evt.preventDefault()
    const newDeed = { ...this.formData }
    const date = new Date()
    newDeed.done = false 
    newDeed.createdAt = date.toLocaleDateString()
    newDeed.key = date.getTime()
    this.props.add(newDeed)
    this.clearformData()
    evt.target.reset()
  }
  render() {
    return (
      <section>
        <h1>Создание нового дела</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="field">
            <label htmlFor="" className="label">Заголовок</label>
            <div className="control">
              <input className="input" 
                onChange={this.handleTitleChange}/>
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">Примечание</label>
            <div className="control">
              <input className="textarea"
                onChange={this.handleDescChange} />
            </div>
          </div>
          <div className="field">
            <div className="file">
              <label htmlFor="" className="file-label">
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  onChange={this.handleImageChange}
                />
                <span className="file-cta">
                  <span className="file-lable">
                    Графическая иллюстрация...
                  </span>
                </span>
              </label>
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <input type="reset" className="button is-link is-light" value='Сброс' />
                </div>
                <div className="control">
                  <input type="submit"
                    className="button is-primary" 
                    value='Создать дело'
                    />
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    )
  }
}