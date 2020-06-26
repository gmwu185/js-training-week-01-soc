"use strict";

/** 第一週主線作業說明：
 ** https://hackmd.io/@hexschool/HJDbvkFqU/%2FF2N_naHkTFeJE0DDeI_OgA
 */

/* 資料
-------------------------------------------------- */
var todoData = [// {
  //   id: 1,
  //   title: '這是預設的第一個待辨項目',
  //   completed: false,
  // }
];
var todoStaredListLocalStoragePath = 'todoStaredList';
/* End of 資料
-------------------------------------------------- */

/* 取得 DOM 元素
-------------------------------------------------- */

var EL_addTodo = document.getElementById('addTodo');
var EL_todoList = document.getElementById('todoList');
var EL_newTodo = document.getElementById('newTodo');
var EL_taskCount = document.getElementById('taskCount');
var EL_clearTask = document.getElementById('clearTask');
var clearCheckModal = new bootstrap.Modal(document.getElementById('clearCheckModal'), {
  keyboard: true
});
var noStringModal = new bootstrap.Modal(document.getElementById('noStringModal'), {
  keyboard: true
});
/* End of 取得 DOM 元素
-------------------------------------------------- */

/* 資料處理
-------------------------------------------------- */

var pushTadoNewData = function pushTadoNewData() {
  /** .push() 新增資料到陣列內最後一筆 */
  // todoData.push({
  //   id: Math.floor( Date.now() ),
  //   title: EL_newTodo.value,
  //   completed: false,
  // });

  /** 將原本陣列新增到最後一筆改用 .unshift() 加最前一筆 */
  todoData.unshift({
    id: Math.floor(Date.now()),
    title: EL_newTodo.value,
    completed: false
  });
};

var getLocalStorageData = function getLocalStorageData() {
  return JSON.parse(localStorage.getItem(todoStaredListLocalStoragePath));
};

var saveLocalStorageData = function saveLocalStorageData(data) {
  return localStorage.setItem(todoStaredListLocalStoragePath, JSON.stringify(data));
};
/* End of 資料處理
-------------------------------------------------- */

/* 輸出運算
-------------------------------------------------- */


var render = function render(renderTodoData) {
  var renderStr = '';
  renderTodoData.forEach(function (item) {
    renderStr += "\n      <li class=\"list-group-item rounded-pill shadow mx-3 mb-3\">\n        <div class=\"d-flex pt-1\">\n          <div class=\"form-check\">\n            <input type=\"checkbox\" class=\"form-check-input c-form__check\" ".concat(item.completed ? 'checked' : '', " data-action=\"complete\" data-id=\"").concat(item.id, "\">\n            <label class=\"form-check-label c-form__label ").concat(item.completed ? 'js-completed' : '', "\" data-action=\"complete\" data-id=\"").concat(item.id, "\"> ").concat(item.title, "</label>\n          </div>\n          <a class='ml-auto c-form__closeBtn' href=\"#\" aria-label=\"Close\">\n            <span class='material-icons c-form__closeBtn__icon' aria-hidden=\"true\" data-action=\"remove\" data-id=\"").concat(item.id, "\">remove_circle_outline</span>\n          </a>\n        </div>\n      </li>\n    "); // <button type="button" class="close ml-auto" aria-label="Close"> 
    //   <span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
    // </button>
  });
  EL_todoList.innerHTML = renderStr;
  EL_taskCount.textContent = renderTodoData.length;
};
/* End of 輸出運算
-------------------------------------------------- */

/* 初始化執行
-------------------------------------------------- */
// console.log('getLocalStorageData()', getLocalStorageData());


if (getLocalStorageData() !== null) {
  // 如果存於 LocalStorage 的 todo data 資料長度不為 0 ，直接將資料賦予到 todoData [] 並輸出畫面
  todoData = getLocalStorageData();
  render(todoData);
} else {
  // 直接將 todoData [] 處理輸出畫面
  render(todoData);
}
/* End of 初始化執行
-------------------------------------------------- */

/* 元素綁定
-------------------------------------------------- */

/*----------  新加資料並清空 input value 字串  ----------*/

/** 寫法一 */
// EL_addTodo.addEventListener('click', () => {
//   if (EL_newTodo.value.trim() !== '') {
//     pushTadoNewData();
//     render(todoData);
//     EL_newTodo.value = '';
//   }
// });

/** 寫法二 */


EL_addTodo.addEventListener('click', function () {
  EL_newTodo.value.trim() !== '' ? (pushTadoNewData(), saveLocalStorageData(todoData), render(todoData), EL_newTodo.value = '') : noStringModal.toggle();
});
/** 直接在 input 按下 enter 觸發相關執行內容 */

EL_newTodo.addEventListener('keydown', function (e) {
  // if ( e.keyCode === 13 ){
  //   EL_newTodo.value.trim() !== '' ? (
  //     pushTadoNewData(), 
  //     render(todoData), 
  //     EL_newTodo.value = ''
  //   )
  //     :""
  // }
  e.keyCode === 13 ? EL_newTodo.value.trim() !== '' ? (pushTadoNewData(), saveLocalStorageData(todoData), render(todoData), EL_newTodo.value = '') : noStringModal.toggle() : "";
}, false);
/*----------  /新加資料並清空 input value 字串  ----------*/

/*----------  清空所有 todo 陣列資料  ----------*/

EL_clearTask.addEventListener('click', function (e) {
  e.preventDefault();
  todoData = [];
  saveLocalStorageData(todoData);
  render(todoData);
});
/*----------  /清空所有 todo 陣列資料  ----------*/

/*----------  點按刪除按鈕對應資料索引刪除資料  ----------*/

/** 寫法一 */
// EL_todoList.addEventListener('click', (e) => {
//   let newIndex = 0;
//   if (e.target.dataset.action == 'remove') {
//     todoData.forEach(function (item, key) {
//       if (e.target.dataset.id == item.id) {
//         newIndex = key;
//       }
//     })
//     todoData.splice(newIndex, 1);
//     render(todoData);
//   }
// });

/** 寫法二 */

EL_todoList.addEventListener('click', function (e) {
  var newIndex = 0;
  return e.target.dataset.action == 'remove' ? todoData.forEach(
  /** 寫法一 */
  // (item, key) => {
  //   // e.target.dataset.id == item.id ? newIndex = key : "" , 
  //   if (e.target.dataset.id == item.id ) {
  //     // console.log('item.id', item.id, 'newIndex', key)
  //     newIndex = key;
  //     todoData.splice(newIndex, 1);
  //     saveLocalStorageData( todoData );
  //     render( todoData );
  //   }
  // }

  /** 寫法二 */
  function (item, key) {
    return e.target.dataset.id == item.id ? (newIndex = key, todoData.splice(newIndex, 1), console.log('remove todoData', todoData), saveLocalStorageData(todoData), render(todoData)) : "";
  }) : "";
});
/*----------  /點按刪除按鈕對應資料索引刪除資料  ----------*/

/*----------  勾選完成後處理資料並更新畫面  ----------*/

/** 寫法 1 
 * 拆分將資料處理後的運算結果透過畫面處理函式更新畫面
*/
// EL_todoList.addEventListener('click', (e) => {
//   if (e.target.dataset.action == 'complete') {
//     todoData.forEach(function (item) {
//       if (e.target.dataset.id == item.id) {
//         if (item.completed) {
//           item.completed = false;
//         } else {
//           item.completed = true;
//         }
//       }
//     })
//     render(todoData);
//   }
// });

/** 寫法 2 
 * 透過 ',' 接 render(todoData) 函式
*/
// EL_todoList.addEventListener('click', (e) => {
//   if (e.target.dataset.action == 'complete') {
//     todoData.forEach((item) => {
//       e.target.dataset.id == item.id ? (item.completed ? item.completed = false : item.completed = true) : '';
//     }), render(todoData)
//   }
// });

/** 寫法 3 
 * 透過 () 讓函式 return 三元運算子成為一個運算項目，並透過單行處理完相關內容，可讀性差。
*/
// EL_todoList.addEventListener('click', (e) => {
//   e.target.dataset.action == 'complete' ? ( todoData.forEach((item) => e.target.dataset.id == item.id ? (item.completed ? item.completed = false : item.completed = true) : ''), render(todoData) ) : ""
// });

/** 寫法 4 
 * 三元運算子處理三層的結果，透過斷行與 () 增加可讀性，但還是不直觀不過比較簡裋。
*/

EL_todoList.addEventListener('click', function (e) {
  e.target.dataset.action == 'complete' ? (todoData.forEach(function (item) {
    return e.target.dataset.id == item.id ? item.completed ? item.completed = false : item.completed = true : '';
  }), saveLocalStorageData(todoData), render(todoData)) : "";
});
/*----------  /勾選完成後處理資料並更新畫面  ----------*/

/* End of 元素綁定
-------------------------------------------------- */
//# sourceMappingURL=all.js.map
