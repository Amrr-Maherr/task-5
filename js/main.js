console.log("test"); // اختبار أولي للتأكد من عمل الكود بشكل صحيح

// الحصول على زر الإضافة
let button = document.getElementById("add"); // تعريف الزر المسؤول عن إضافة المهام

// الحصول على الحقل النصي للإدخال
let input = document.getElementById("input"); // تعريف الحقل النصي الذي يتم إدخال المهمة فيه

// الحصول على قائمة المهام
let list = document.querySelector(".todoList"); // تحديد قائمة المهام بناءً على الكلاس
console.log(list); // التأكد من أن القائمة موجودة في DOM

// تعريف مصفوفة فارغة لتخزين المهام من localStorage
let taskArr = JSON.parse(localStorage.getItem("task")) || []; // استعادة المهام من localStorage أو تعريف مصفوفة جديدة

// دالة لإنشاء المهام الجديدة
function create() {
  // تخزين قيمة الإدخال
  let taskValue = input.value;
  if (taskValue == "") {
    // تحقق من الإدخال الفارغ
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter your task",
    });
  } else {
    // إضافة المهمة إلى المصفوفة ككائن مع id وقيمة النص
    taskArr = [...taskArr, { task: taskValue, id: taskArr.length + 1 }];
    // حفظ المصفوفة في localStorage بعد تحويلها إلى نص
    localStorage.setItem("task", JSON.stringify(taskArr));
    // عرض رسالة نجاح
    Swal.fire({
      title: "Good job!",
      text: "The task has been added successfully",
      icon: "success",
    });
    // إعادة تعيين قيمة الحقل النصي إلى فارغ
    input.value = "";
    // قراءة المهام لعرض التحديثات فورًا
    read(); // هذا جزء جديد، إضافة استدعاء للدالة `read` هنا لتحديث القائمة مباشرة.
  }
}

// تشغيل دالة الإنشاء عند الضغط على الزر
button.onclick = () => {
  create(); // استدعاء دالة الإنشاء عند الضغط على الزر
};

// دالة لقراءة المهام وعرضها في القائمة
function read() {
  // استعادة المهام من localStorage
  let taskStore = JSON.parse(localStorage.getItem("task"));

  // التحقق من وجود مهام
  if (taskStore) {
    let taskHtml = ""; // تعريف متغير لتخزين عناصر القائمة HTML
    taskStore.forEach((item) => {
      taskHtml += `
        <li class="task" id="task-${item.id}">
          ${item.id} - ${item.task}
          <!-- إضافة أيقونة التعديل -->
          <button class="edit-btn" onclick="UpDate(${item.id})">
            <i class="fas fa-edit"></i> Edit
          </button>
          <!-- إضافة أيقونة المسح -->
          <button class="delete-btn" onclick="deletee(${item.id})">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
          <!-- إضافة أيقونة حالة التمام -->
          <button class="complete-btn" onclick="Complete()">
            <i class="fas fa-check-circle"></i> Complete
          </button>
        </li>
      `; // توليد عناصر HTML لكل مهمة مع الأيقونات
    });
    list.innerHTML = taskHtml; // عرض عناصر HTML في القائمة
  } else {
    list.innerHTML = "<li>No tasks available</li>"; // Display a message if no tasks are found
  }
}

// استدعاء دالة القراءة عند تحميل الصفحة لعرض المهام المحفوظة
read();

// دالة لحذف المهام
function deletee(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // حذف المهمة من المصفوفة
      taskArr = taskArr.filter((item) => item.id !== id);

      // تحديث المهام في localStorage
      localStorage.setItem("task", JSON.stringify(taskArr));

      // عرض رسالة النجاح
      Swal.fire({
        title: "Deleted!",
        text: "Your task has been deleted.",
        icon: "success",
      });

      // إعادة عرض المهام
      read();
    }
  });
}

// دالة لتحديث المهام
function UpDate(id) {
  // إيجاد المهمة بناءً على الـ id
  let taskToEdit = taskArr.find((item) => item.id === id);

  // عرض نافذة منبثقة لتعديل النص
  let newTask = prompt("Edit your task:", taskToEdit.task);

  // التحقق من أن النص الجديد غير فارغ
  if (newTask !== null && newTask.trim() !== "") {
    // تحديث المهمة بالنص الجديد
    taskToEdit.task = newTask.trim();

    // تحديث المهام في localStorage
    localStorage.setItem("task", JSON.stringify(taskArr));

    // عرض رسالة النجاح
    Swal.fire({
      title: "Updated!",
      text: "Your task has been updated.",
      icon: "success",
    });

    // إعادة عرض المهام مع التحديث
    read();
  } else {
    // إذا لم يدخل المستخدم نصًا جديدًا
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Task cannot be empty.",
    });
  }
}

let task = document.querySelectorAll(".task");

function Complete() {
  task.forEach((item) => {
    item.classList.toggle("completed");
    Swal.fire({
      title: "Task Completed!",
      text: "Congratulations, you have completed this task.",
      icon: "success",
    });
  });
}

