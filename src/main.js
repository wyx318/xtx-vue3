// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'todomvc-app-css/index.css'
import Vue from 'vue'
// import App from './App'


// Vue.config.productionTip = false;
// 定义过滤器 对 完成状态进行过滤 all Active Completed
var filters = {
  // 所有的
  all(todos) {
    return todos
  },
  // 已经完成
  active(todos) {
    return todos.filter((todo) => {
      return !todo.completed
    })
  },
  completed(todos) {
    return todos.filter((todo) => {
      return todo.completed
    })
  }
}
/* eslint-disable no-new */
let APP = new Vue({
  el: '.todoapp',
  data: {
    title: 'todomvc',
    newTodo: '',
    //页面上所有的内容 数据属性设置为两项 一个是内容contents 一个状态completed
    todos: [{
      content: 'vue很灵活',
      completed: false
    }],
    editedTodo: 'null',
    hashName: 'all'
  },
  //定义一个计算属性 对原有的数据动态的改变
  computed: {
    remain() {
      return filters.active(this.todos).length
    },
    isAll: {
      get() {
        //逻辑 是 当等于0的时候 判定全选
        return this.remain === 0
      },
      set(value) {
        //逻辑是 全部选中才会电量
        this.todos.forEach((todo) => {
          todo.completed = value
        });
      }
    },
    filteredTOdos() {
      return filters[this.hashName](this.todos)
    }
  },

  methods: {
    //增加内容
    addTodo(e) {
      if (!this.newTodo) {return}
      this.todos.push({
        content: this.newTodo,
        completed: false

      })
      //推进去之后还原input框
      this.newTodo = ''
    },
    //删除
    removeTodo(index) {
      //(index,1) 从某个(index)元素开始删除几个(1个)元素
      this.todos.splice(index, 1)
    },
    //双击编辑事件
    editTodo(todo) {
      //缓存一个值 按下esc 会使用这个缓存的值
      this.editedCache = todo.content
      this.editedTodo = todo
    },
    doneEdit(todo, index) {
      //   如果编辑完成 失去焦点自动还原保存 编辑状态取消
      this.editedTodo = null
      //   如过为空 就删除当前
      if (!todo.content) {
        this.removeTodo(index)
      }
    },
    cancleEdit(todo) {
      this.editedTodo = null
      //   缓存一个值 按下esc 会使用这个缓存的值
      todo.content = this.editedCache
    },
    //小按钮 清除  已经完成的东西
    Clear() {
      this.todos = filters.active(this.todos)
    }
  },
  directives: {
    focus(el, value) {
      if (value) {
        el.focus()
      }
    }
  }

})

function hashChange() {
  //获取hash
  let hashName = location.hash.replace(/#\/?/, '')//选择链接后面的数字进行正则验证
  if (filters[hashName]) {
    APP.hashName = hashName //过滤器过滤一下  当前的内容 是的话 就把对样的焦点过去
  } else {
    location.hash = ''
    APP.hashName = 'all'
  }
}

//全局 监听一下 hash
window.addEventListener('hashchange', hashChange)
