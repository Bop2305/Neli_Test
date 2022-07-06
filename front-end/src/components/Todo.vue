<template>
  <div class="container shadow-lg px-5 py-5 rounded-3">
    <h1 class="mb-5">My To Do List</h1>

    <!-- <form> -->
    <div class="d-flex mb-5">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Enter To Do"
        class="form-control form-input me-3"
      />
      <button type="submit" class="submit-btn px-3 py-2" @click="addTodo()">
        +
      </button>
    </div>
    <!-- </form> -->

    <div
      class="row todo-list shadow px-3 pt-3 pb-2 align-items-center mb-4"
      v-for="todo in todos"
      :key="todo.id"
    >
      <div class="col-7 text-start">
        <h5 :class="{ 'todo-finished': todo.isFinished === true }">
          {{ todo.description }}
        </h5>
      </div>
      <div class="col-2">
        <div class="d-flex justify-content-start align-items-center">
          <div
            class="status-indicator mb-1 me-2"
            :class="{
              'status-indicator-todo': todo.isFinished === false,
              'status-indicator-finished': todo.isFinished === true,
            }"
          ></div>
          <div
            class="status-text"
            @click="changeStatus(todo)"
            :class="{
              'status-text-todo': todo.isFinished === false,
              'status-text-finished': todo.isFinished === true,
            }"
          >
            <h5 v-if="todo.isFinished === true">Finished</h5>
            <h5 v-else>Pending</h5>
          </div>
        </div>
      </div>
      <div class="col-3 text-end action-btn">
        <div class="d-flex justify-content-end">
          <div class="" @click="editTodo(todo)">
            <i class="uil uil-edit-alt ms-4"></i>
          </div>
          <div class="" @click="deleteTodo(todo.id)">
            <i class="uil uil-trash-alt ms-4"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTodos } from "../graphql-client/queries";
import { addTodo, editTodo, removeTodo } from "../graphql-client/mutations";
export default {
  name: "ToDo",

  data() {
    return {
      newTodo: "",
      indexEditTodo: null,
      todoStatus: ["Finished", "Pending"],
      todos: [],
    };
  },

  // Apollo GraphQL
  apollo: {
    todos: {
      query: getTodos,
    },
  },
  methods: {
    async addTodo() {
      if (this.newTodo.length === 0) return;
      if (this.indexEditTodo === null) {
        await this.$apollo.mutate({
          mutation: addTodo,
          variables: {
            id: this.todos.length + 1,
            description: this.newTodo,
            isFinished: false,
          },
        });
      } else {
        await this.$apollo.mutate({
          mutation: editTodo,
          variables: {
            id: this.indexEditTodo,
            description: this.newTodo,
            isFinished: false,
          },
        });
        this.indexEditTodo = null;
      }
      this.newTodo = "";
      location.reload();
    },
    editTodo(todo) {
      this.newTodo = todo.description;
      this.indexEditTodo = todo.id;
    },
    async deleteTodo(id) {
      const isRemove = window.confirm("Are you sure you want to delete?");
      if (isRemove !== true) return;
      await this.$apollo.mutate({
        mutation: removeTodo,
        variables: {
          id,
        },
      });
      location.reload();
    },
    async changeStatus(todo) {
      this.$apollo.mutate({
        mutation: editTodo,
        variables: {
          id: todo.id,
          description: todo.description,
          isFinished: !todo.isFinished,
        },
      });
    },
  },
};
</script>

<style scoped>
.form-input {
  border: 1px solid #333;
  border-radius: 50px;
}
.form-control:focus {
  box-shadow: none;
  /* border: none; */
}
.submit-btn {
  background-color: skyblue;
  border-radius: 50%;
  border: none;

  font-size: 20px;
  font-weight: 800;
  color: #333;
}
.todo-list {
  border-radius: 50px;
}
.todo-finished {
  font-style: italic;
  text-decoration: line-through;
}
.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.status-indicator-todo {
  background: red;
}
.status-indicator-ongoing {
  background: yellow;
}
.status-indicator-finished {
  background: green;
}
.status-text {
  font-weight: bold;
  cursor: pointer;
}
.status-text-todo {
  color: red;
}
.status-text-ongoing {
  color: yellow;
}
.status-text-finished {
  color: green;
}
.action-btn i {
  font-size: 25px;
  cursor: pointer;
}
</style>