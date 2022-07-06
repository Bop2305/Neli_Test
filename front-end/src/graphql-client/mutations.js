import gql from 'graphql-tag'

const addTodo = gql`
  mutation addTodoMutation(
    $id: Int!,
    $description: String!,
    $isFinished: Boolean!,
  ) {
    createTodo (id: $id, description: $description, isFinished: $isFinished) {
        id
        description
        isFinished
      }
  }
`
const editTodo = gql`
  mutation editTodoMutation(
    $id: Int!,
    $description: String!,
    $isFinished: Boolean!,
  ) {
    updateTodo (id: $id, description: $description, isFinished: $isFinished) {
      id
      description
      isFinished
    }
  }
`
const removeTodo = gql`
  mutation removeTodoMutation(
    $id: Int!,
  ) {
    deleteTodo (id: $id) {
      id
      description
      isFinished
    }
  }
`

export { addTodo, editTodo, removeTodo }