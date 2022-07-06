import gql from 'graphql-tag'

const getTodos = gql`
  query getTodoQuery {
    todos {
      id
      description
      isFinished
    }
  }
`

export { getTodos }