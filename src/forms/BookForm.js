import React, { Component } from 'react'
import { observer } from 'mobx-react'

import bookStore from '../stores/bookStore'

class BookForm extends Component {
  state = {
    title: '',
    color: ''
  }

  submitBook = async event => {
    event.preventDefault()
    await bookStore.addBook(this.state, this.props.author)
    if (!bookStore.errors) {
      this.props.closeModal()
    }
  }

  textChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    return (
      <div className='mt-5 p-2'>
        <form onSubmit={this.submitBook}>
          {bookStore.errors && (
            <div className='alert alert-danger' role='alert'>
              {bookStore.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Book title</span>
            </div>
            <input
              type='text'
              className='form-control'
              name='title'
              onChange={this.textChangeHandler}
            />
          </div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Book color</span>
            </div>
            <select
              name='color'
              class='form-control'
              onChange={this.textChangeHandler}
            >
              <option value='black'>black</option>
              <option value='white'>white</option>
              <option value='yellow'>yellow</option>
              <option value='blue'>blue</option>
              <option value='green'>green</option>
              <option value='red'>red</option>
              <option value='purple'>purple</option>
              <option value='grey'>grey</option>
            </select>
          </div>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default observer(BookForm)
